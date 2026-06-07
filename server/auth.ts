import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

const DATA_DIR = path.resolve(process.cwd(), "server/data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const VISITORS_FILE = path.join(DATA_DIR, "visitors.json");

const JWT_SECRET = process.env.SESSION_SECRET || "kashur-system-2025";
export const ADMIN_EMAIL = "tahirhaniefmir@gmail.com";

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
if (!fs.existsSync(VISITORS_FILE)) fs.writeFileSync(VISITORS_FILE, "[]");

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface VisitorLog {
  id: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  path: string;
  userId?: string;
  userName?: string;
  type: "visit" | "login" | "register";
}

export function getUsers(): User[] {
  try { return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8")); }
  catch { return []; }
}

export function saveUsers(users: User[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function getVisitors(): VisitorLog[] {
  try {
    const raw: VisitorLog[] = JSON.parse(fs.readFileSync(VISITORS_FILE, "utf-8"));
    return raw.slice(-1000);
  } catch { return []; }
}

export function addVisitor(v: Omit<VisitorLog, "id">): VisitorLog {
  const entry: VisitorLog = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 5),
    ...v,
  };
  const all = getVisitors();
  all.push(entry);
  fs.writeFileSync(VISITORS_FILE, JSON.stringify(all.slice(-1000), null, 2));
  return entry;
}

export function hashPassword(pw: string): string {
  return bcrypt.hashSync(pw, 10);
}

export function verifyPassword(pw: string, hash: string): boolean {
  return bcrypt.compareSync(pw, hash);
}

export function signToken(payload: { id: string; email: string; name: string }): string {
  return (jwt as any).sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { id: string; email: string; name: string } | null {
  try { return (jwt as any).verify(token, JWT_SECRET) as any; }
  catch { return null; }
}
