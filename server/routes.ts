import type { Express, Request, Response } from "express";
import { createServer, type Server } from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import {
  getUsers, saveUsers, getVisitors, addVisitor,
  hashPassword, verifyPassword, signToken, verifyToken,
  ADMIN_EMAIL, type User,
} from "./auth";

const adminClients = new Set<WebSocket>();

export function broadcastAdmin(data: object): void {
  const msg = JSON.stringify(data);
  adminClients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: "/ws/admin" });
  wss.on("connection", (ws) => {
    adminClients.add(ws);
    const visitors = getVisitors().slice().reverse().slice(0, 50);
    const users = getUsers().map((u) => ({
      id: u.id, name: u.name, email: u.email, createdAt: u.createdAt,
    }));
    ws.send(JSON.stringify({ type: "init", visitors, users }));
    ws.on("close", () => adminClients.delete(ws));
    ws.on("error", () => adminClients.delete(ws));
  });

  app.post("/api/auth/register", (req: Request, res: Response) => {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password)
      return res.status(400).json({ error: "Name, email and password are required." });
    if (password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()))
      return res.status(409).json({ error: "This email is already registered." });
    const user: User = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
    const token = signToken({ id: user.id, email: user.email, name: user.name });
    const entry = addVisitor({
      ip: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "",
      timestamp: new Date().toISOString(),
      path: "/register",
      userId: user.id,
      userName: user.name,
      type: "register",
    });
    broadcastAdmin({ type: "register", user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }, visitor: entry });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });

  app.post("/api/auth/login", (req: Request, res: Response) => {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required." });
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user || !verifyPassword(password, user.passwordHash))
      return res.status(401).json({ error: "Invalid email or password." });
    const token = signToken({ id: user.id, email: user.email, name: user.name });
    const entry = addVisitor({
      ip: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "",
      timestamp: new Date().toISOString(),
      path: "/login",
      userId: user.id,
      userName: user.name,
      type: "login",
    });
    broadcastAdmin({ type: "login", user: { id: user.id, name: user.name, email: user.email }, visitor: entry });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
    const payload = verifyToken(auth.slice(7));
    if (!payload) return res.status(401).json({ error: "Invalid or expired token." });
    const user = getUsers().find((u) => u.id === payload.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } });
  });

  app.post("/api/track/visit", (req: Request, res: Response) => {
    const { platform } = req.body || {};
    const entry = addVisitor({
      ip: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || platform || "app",
      timestamp: new Date().toISOString(),
      path: "/app-launch",
      type: "visit",
    });
    broadcastAdmin({ type: "visit", visitor: entry });
    res.json({ ok: true });
  });

  app.get("/api/admin/dashboard", (req: Request, res: Response) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
    const payload = verifyToken(auth.slice(7));
    if (!payload || payload.email !== ADMIN_EMAIL)
      return res.status(403).json({ error: "Admin access only." });
    const visitors = getVisitors().slice().reverse().slice(0, 100);
    const users = getUsers().map((u) => ({
      id: u.id, name: u.name, email: u.email, createdAt: u.createdAt,
    }));
    res.json({ visitors, users, totals: { visitors: getVisitors().length, users: users.length } });
  });

  return httpServer;
}
