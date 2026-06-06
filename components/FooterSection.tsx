import React from "react";
import { View, Text, StyleSheet, Pressable, Linking, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const logoImg = require("@/assets/images/logo.png");

const QUICK_LINKS = [
  "Notes",
  "Previous Year Papers",
  "Project Help",
  "Lab Training",
  "Courses",
  "Contact",
];

const SOCIALS = [
  {
    icon: "logo-youtube" as const,
    color: "#FF0000",
    url: "https://youtube.com/@kashurtechmir",
    label: "YouTube",
  },
  {
    icon: "logo-facebook" as const,
    color: "#1877F2",
    url: "https://www.facebook.com/share/17uTPusyFv/",
    label: "Facebook",
  },
  {
    icon: "logo-instagram" as const,
    color: "#E1306C",
    url: "https://www.instagram.com/tahir_hanief_mir?igsh=YTg0ajU2cHFpZjI3",
    label: "Instagram",
  },
  {
    icon: "logo-whatsapp" as const,
    color: "#25D366",
    url: "https://wa.me/919797853293",
    label: "WhatsApp",
  },
];

export default function FooterSection() {
  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoRow}>
          <Image source={logoImg} style={styles.logoImg} resizeMode="contain" />
          <Text style={styles.brandName}>Kashur System</Text>
        </View>
        <Text style={styles.tagline}>Empowering Students from Theory to Practical</Text>
        <Text style={styles.founder}>Founded by Tahir Hanief Mir · Osmania University Hyderabad</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.linksSection}>
        <Text style={styles.linksTitle}>Quick Links</Text>
        <View style={styles.linksGrid}>
          {QUICK_LINKS.map((link) => (
            <View key={link} style={styles.linkItem}>
              <Ionicons
                name="chevron-forward"
                size={12}
                color={Colors.brand.accent}
              />
              <Text style={styles.linkText}>{link}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.contactFooter}>
        <Pressable
          style={styles.contactItem}
          onPress={() => Linking.openURL("tel:9797853293")}
        >
          <Ionicons name="call" size={14} color={Colors.brand.accent} />
          <Text style={styles.contactText}>9797853293</Text>
        </Pressable>
        <Pressable
          style={styles.contactItem}
          onPress={() => Linking.openURL("mailto:tahirhaniefmir@gmail.com")}
        >
          <Ionicons name="mail" size={14} color={Colors.brand.accent} />
          <Text style={styles.contactText}>tahirhaniefmir@gmail.com</Text>
        </Pressable>
        <View style={styles.contactItem}>
          <Ionicons name="location" size={14} color={Colors.brand.accent} />
          <Text style={styles.contactText}>Jammu & Kashmir, India</Text>
        </View>
      </View>

      <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>Follow Us</Text>
        <View style={styles.socialRow}>
          {SOCIALS.map((s) => (
            <Pressable
              key={s.label}
              style={({ pressed }) => [
                styles.socialBtn,
                { borderColor: s.color + "40" },
                pressed && styles.pressed,
              ]}
              onPress={() => Linking.openURL(s.url)}
            >
              <Ionicons name={s.icon} size={22} color={s.color} />
              <Text style={[styles.socialLabel, { color: s.color }]}>{s.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.copyright}>
        © 2026 Kashur System. All rights reserved.{"\n"}
        Designed with care for J&K Students.
      </Text>

      {Platform.OS === "web" && <View style={{ height: 34 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brand.darkText,
    padding: 24,
    gap: 20,
  },
  brandSection: {
    gap: 8,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  brandName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: Colors.brand.white,
  },
  tagline: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: Colors.brand.accentLight,
    lineHeight: 20,
  },
  founder: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  linksSection: {
    gap: 12,
  },
  linksTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: Colors.brand.white,
  },
  linksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: "47%",
  },
  linkText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
  },
  contactFooter: {
    gap: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: Colors.brand.midGray,
  },
  socialSection: {
    gap: 12,
  },
  socialTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: Colors.brand.white,
  },
  socialRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
  },
  socialLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  copyright: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: Colors.brand.midGray,
    textAlign: "center",
    lineHeight: 18,
  },
});
