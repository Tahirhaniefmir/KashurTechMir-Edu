import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";

const founderPhoto = require("@/assets/images/founder.jpg");

interface Props {
  onExploreNotes: () => void;
}

export default function HeroSection({ onExploreNotes }: Props) {
  const { user, isLoading, login, register, logout } = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const photoScaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.spring(photoScaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 1600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.85] });

  const openModal = (m: "login" | "register") => {
    setMode(m);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password);
      }
      setModalVisible(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={["#061539", "#0A2463", "#1034A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorCircle3} />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.badgeRow}>
          <Ionicons name="school" size={13} color={Colors.brand.accentLight} />
          <Text style={styles.badge}>Educational Platform · J&K</Text>
        </View>

        <View style={styles.founderCard}>
          <Animated.View style={[styles.photoWrapper, { transform: [{ scale: photoScaleAnim }] }]}>
            <Animated.View style={[styles.glowRing, { opacity: glowOpacity }]} />
            <View style={styles.photoRingOuter}>
              <View style={styles.photoRingInner}>
                <Image source={founderPhoto} style={styles.founderPhoto} resizeMode="cover" />
              </View>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={12} color="#fff" />
            </View>
          </Animated.View>

          <View style={styles.founderInfo}>
            <Text style={styles.founderName}>Tahir Hanief Mir</Text>
            <Text style={styles.founderUniversity}>(Osmania University Hyderabad)</Text>
            <View style={styles.founderRoleRow}>
              <View style={styles.roleDot} />
              <Text style={styles.founderRole}>Founder & Educator</Text>
            </View>
            <View style={styles.founderTagRow}>
              <View style={styles.founderTag}>
                <Ionicons name="location-outline" size={11} color={Colors.brand.accent} />
                <Text style={styles.founderTagText}>Jammu & Kashmir</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.headingBlock}>
          <Text style={styles.heading}>Kashur System</Text>
          <Text style={styles.tagline}>
            Empowering Students from{" "}
            <Text style={styles.taglineAccent}>Theory to Practical</Text>
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.intro}>
          I am here to help students from theory to practical learning — providing
          quality education, notes, previous year papers, project assistance, and
          practical training to students across{" "}
          <Text style={styles.nameHighlight}>Jammu & Kashmir</Text>.
        </Text>

        <View style={styles.statsRow}>
          <StatBadge icon="book" label="Notes" value="Free" />
          <StatBadge icon="document-text" label="Papers" value="PYQ" />
          <StatBadge icon="flask" label="Lab" value="Live" />
          <StatBadge icon="school" label="Courses" value="Skill" />
        </View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Pressable
            onPress={onExploreNotes}
            style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
          >
            <Ionicons name="search" size={18} color={Colors.brand.primary} />
            <Text style={styles.ctaText}>Explore Notes</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.brand.primary} />
          </Pressable>
        </Animated.View>

        {/* ── Student Login ── */}
        {!isLoading && !user && (
          <View style={styles.authRow}>
            <Pressable
              onPress={() => openModal("login")}
              style={({ pressed }) => [styles.loginBtn, pressed && styles.pressed]}
            >
              <Ionicons name="person-circle-outline" size={17} color="rgba(255,255,255,0.85)" />
              <Text style={styles.loginBtnText}>Student Login</Text>
            </Pressable>
            <Pressable
              onPress={() => openModal("register")}
              style={({ pressed }) => [styles.registerBtn, pressed && styles.pressed]}
            >
              <Text style={styles.registerBtnText}>Register Free</Text>
            </Pressable>
          </View>
        )}

        {/* ── Logged-in user chip ── */}
        {!isLoading && user && (
          <View style={styles.userChip}>
            <View style={styles.userChipLeft}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.userWelcome}>Welcome back 👋</Text>
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={16} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>

      {/* ── Auth Modal ── */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </Text>
                <Text style={styles.modalSub}>
                  {mode === "login"
                    ? "Sign in to access your notes"
                    : "Join thousands of students in J&K"}
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color={Colors.brand.midGray} />
              </Pressable>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              {mode === "register" && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor={Colors.brand.midGray}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.brand.midGray}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder={mode === "register" ? "At least 6 characters" : "Enter your password"}
                  placeholderTextColor={Colors.brand.midGray}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {error !== "" && (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle-outline" size={15} color="#EB5757" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <Pressable
                onPress={handleSubmit}
                disabled={submitting}
                style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons
                      name={mode === "login" ? "log-in-outline" : "person-add-outline"}
                      size={18}
                      color="#fff"
                    />
                    <Text style={styles.submitBtnText}>
                      {mode === "login" ? "Sign In" : "Create Account"}
                    </Text>
                  </>
                )}
              </Pressable>

              <Pressable
                onPress={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                }}
                style={styles.switchRow}
              >
                <Text style={styles.switchText}>
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <Text style={styles.switchLink}>
                    {mode === "login" ? "Register Free" : "Sign In"}
                  </Text>
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}

function StatBadge({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.statBadge}>
      <Ionicons name={icon} size={16} color={Colors.brand.accentLight} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 36, paddingBottom: 48, overflow: "hidden" },
  decorCircle1: { position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: "rgba(62,146,204,0.08)" },
  decorCircle2: { position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.04)" },
  decorCircle3: { position: "absolute", top: 120, right: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: "rgba(30,77,183,0.15)" },
  content: { gap: 18 },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  badge: { fontFamily: "Poppins_500Medium", fontSize: 11, color: Colors.brand.accentLight, letterSpacing: 0.8, textTransform: "uppercase" },
  founderCard: { flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  photoWrapper: { position: "relative", alignItems: "center", justifyContent: "center" },
  glowRing: { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.brand.accent, zIndex: 0 },
  photoRingOuter: { width: 90, height: 90, borderRadius: 45, borderWidth: 2.5, borderColor: "#5BC4FA", padding: 3, zIndex: 1 },
  photoRingInner: { flex: 1, borderRadius: 40, overflow: "hidden", borderWidth: 2, borderColor: Colors.brand.primary },
  founderPhoto: { width: "100%", height: "100%" },
  verifiedBadge: { position: "absolute", bottom: 2, right: 2, width: 22, height: 22, borderRadius: 11, backgroundColor: "#27AE60", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: Colors.brand.primary, zIndex: 2 },
  founderInfo: { flex: 1, gap: 4 },
  founderName: { fontFamily: "Poppins_700Bold", fontSize: 17, color: Colors.brand.white, lineHeight: 22 },
  founderUniversity: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "#5BC4FA", lineHeight: 15, marginTop: -2 },
  founderRoleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  roleDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#5BC4FA" },
  founderRole: { fontFamily: "Poppins_500Medium", fontSize: 12, color: Colors.brand.accentLight },
  founderTagRow: { flexDirection: "row", gap: 6, marginTop: 2 },
  founderTag: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(62,146,204,0.2)", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  founderTagText: { fontFamily: "Poppins_500Medium", fontSize: 10, color: Colors.brand.accentLight },
  headingBlock: { gap: 4 },
  heading: { fontFamily: "Poppins_800ExtraBold", fontSize: 32, color: Colors.brand.white, lineHeight: 40 },
  tagline: { fontFamily: "Poppins_600SemiBold", fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 24 },
  taglineAccent: { color: "#5BC4FA" },
  divider: { height: 2, width: 48, backgroundColor: Colors.brand.accent, borderRadius: 2 },
  intro: { fontFamily: "Poppins_400Regular", fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 21 },
  nameHighlight: { fontFamily: "Poppins_600SemiBold", color: "#5BC4FA" },
  statsRow: { flexDirection: "row", gap: 8 },
  statBadge: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", gap: 3, flex: 1, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  statValue: { fontFamily: "Poppins_700Bold", fontSize: 12, color: Colors.brand.white },
  statLabel: { fontFamily: "Poppins_400Regular", fontSize: 9, color: "rgba(255,255,255,0.6)" },
  ctaBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: Colors.brand.white, borderRadius: 14, paddingVertical: 16, paddingHorizontal: 28 },
  ctaBtnPressed: { opacity: 0.88, transform: [{ scale: 0.97 }] },
  ctaText: { fontFamily: "Poppins_700Bold", fontSize: 16, color: Colors.brand.primary, flex: 1, textAlign: "center" },
  pressed: { opacity: 0.82 },

  /* Auth row */
  authRow: { flexDirection: "row", gap: 10, marginTop: 2 },
  loginBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.3)", borderRadius: 12, paddingVertical: 12 },
  loginBtnText: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "rgba(255,255,255,0.85)" },
  registerBtn: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#27AE60", borderRadius: 12, paddingVertical: 12 },
  registerBtnText: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "#fff" },

  /* User chip */
  userChip: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 14, padding: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  userChipLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  userAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#27AE60", alignItems: "center", justifyContent: "center" },
  userAvatarText: { fontFamily: "Poppins_700Bold", fontSize: 16, color: "#fff" },
  userWelcome: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(255,255,255,0.6)" },
  userName: { fontFamily: "Poppins_700Bold", fontSize: 14, color: "#fff" },
  logoutBtn: { padding: 6 },

  /* Modal */
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.55)" },
  modalSheet: { backgroundColor: Colors.brand.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: "85%" },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.brand.cardBorder, alignSelf: "center", marginBottom: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  modalTitle: { fontFamily: "Poppins_700Bold", fontSize: 22, color: Colors.brand.darkText },
  modalSub: { fontFamily: "Poppins_400Regular", fontSize: 13, color: Colors.brand.midGray, marginTop: 2 },
  closeBtn: { padding: 4 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: Colors.brand.darkText, marginBottom: 7 },
  input: { borderWidth: 1.5, borderColor: Colors.brand.cardBorder, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontFamily: "Poppins_400Regular", fontSize: 14, color: Colors.brand.darkText, backgroundColor: Colors.brand.offWhite },
  errorBox: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FFF0F0", borderRadius: 10, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: "#FFDADA" },
  errorText: { fontFamily: "Poppins_400Regular", fontSize: 12, color: "#EB5757", flex: 1 },
  submitBtn: { backgroundColor: Colors.brand.primary, borderRadius: 14, paddingVertical: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 },
  submitBtnText: { fontFamily: "Poppins_700Bold", fontSize: 15, color: "#fff" },
  switchRow: { alignItems: "center", paddingVertical: 4 },
  switchText: { fontFamily: "Poppins_400Regular", fontSize: 13, color: Colors.brand.midGray },
  switchLink: { fontFamily: "Poppins_700Bold", color: Colors.brand.primary },
});
