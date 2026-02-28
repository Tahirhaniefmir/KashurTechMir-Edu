import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const LAB_FEATURES = [
  { icon: "desktop-outline" as const, label: "Computer Lab" },
  { icon: "code-slash-outline" as const, label: "Programming" },
  { icon: "hardware-chip-outline" as const, label: "Electronics" },
  { icon: "wifi-outline" as const, label: "Networking" },
  { icon: "bar-chart-outline" as const, label: "MATLAB" },
  { icon: "cube-outline" as const, label: "3D Design" },
];

export default function LabSection() {
  const handleJoin = () => {
    Alert.alert(
      "Join Lab Training",
      "Contact us to register for practical lab training sessions.\n\nPhone: 9797853293\nEmail: tahirhaniefmir@gmail.com",
      [{ text: "Got it!" }]
    );
  };

  return (
    <LinearGradient
      colors={[Colors.brand.primary, "#0E3A8C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.decorDot1} />
      <View style={styles.decorDot2} />

      <View style={styles.sectionHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="flask" size={22} color={Colors.brand.primary} />
        </View>
        <Text style={styles.sectionTag}>Hands-On</Text>
      </View>

      <Text style={styles.heading}>Practical Lab Training</Text>
      <Text style={styles.description}>
        Hands-on practical training sessions for students to strengthen
        real-world skills and technical knowledge. Learn by doing, not just
        reading.
      </Text>

      <View style={styles.featuresGrid}>
        {LAB_FEATURES.map((f, i) => (
          <View key={i} style={styles.featureItem}>
            <Ionicons name={f.icon} size={22} color={Colors.brand.accentLight} />
            <Text style={styles.featureLabel}>{f.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.highlightBox}>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color="#5BC4FA"
          style={{ marginTop: 2 }}
        />
        <Text style={styles.highlightText}>
          Sessions conducted in a fully equipped lab environment with expert
          mentorship from{" "}
          <Text style={styles.nameHighlight}>Tahir Hanief Mir</Text>.
        </Text>
      </View>

      <Pressable
        onPress={handleJoin}
        style={({ pressed }) => [styles.ctaBtn, pressed && styles.pressed]}
      >
        <Ionicons
          name="enter-outline"
          size={18}
          color={Colors.brand.primary}
        />
        <Text style={styles.ctaText}>Join Lab Training</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    overflow: "hidden",
  },
  decorDot1: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  decorDot2: {
    position: "absolute",
    bottom: -20,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.brand.white,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTag: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.accentLight,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: Colors.brand.white,
    marginBottom: 10,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: "47%",
  },
  featureLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: Colors.brand.white,
  },
  highlightBox: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  highlightText: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
  nameHighlight: {
    fontFamily: "Poppins_600SemiBold",
    color: "#5BC4FA",
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.brand.white,
    borderRadius: 14,
    paddingVertical: 16,
  },
  ctaText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.brand.primary,
  },
  pressed: {
    opacity: 0.88,
  },
});
