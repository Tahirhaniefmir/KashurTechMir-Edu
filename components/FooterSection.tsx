import React from "react";
import { View, Text, StyleSheet, Pressable, Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const QUICK_LINKS = [
  "Notes",
  "Previous Year Papers",
  "Project Help",
  "Lab Training",
  "Courses",
  "Contact",
];

export default function FooterSection() {
  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Ionicons name="school" size={20} color={Colors.brand.white} />
          </View>
          <Text style={styles.brandName}>KashurTechMir</Text>
        </View>
        <Text style={styles.tagline}>Empowering Students from Theory to Practical</Text>
        <Text style={styles.founder}>Founded by Tahir Hanief Mir</Text>
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
        <View style={styles.contactItem}>
          <Ionicons name="call" size={14} color={Colors.brand.accent} />
          <Text style={styles.contactText}>9797853293</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={14} color={Colors.brand.accent} />
          <Text style={styles.contactText}>tahirhaniefmir@gmail.com</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="location" size={14} color={Colors.brand.accent} />
          <Text style={styles.contactText}>Jammu & Kashmir, India</Text>
        </View>
      </View>

      <View style={styles.socialRow}>
        <Pressable
          style={({ pressed }) => [styles.socialBtn, pressed && styles.pressed]}
          onPress={() => Linking.openURL("https://youtube.com")}
        >
          <Ionicons name="logo-youtube" size={20} color="#FF0000" />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.socialBtn, pressed && styles.pressed]}
          onPress={() => Linking.openURL("https://facebook.com")}
        >
          <Ionicons name="logo-facebook" size={20} color="#1877F2" />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.socialBtn, pressed && styles.pressed]}
          onPress={() => Linking.openURL("https://whatsapp.com")}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
        </Pressable>
      </View>

      <View style={styles.divider} />

      <Text style={styles.copyright}>
        © 2026 KashurTechMir. All rights reserved.{"\n"}
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
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.brand.primaryLight,
    alignItems: "center",
    justifyContent: "center",
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
    gap: 8,
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
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
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
