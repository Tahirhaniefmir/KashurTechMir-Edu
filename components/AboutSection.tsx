import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const FEATURES = [
  {
    icon: "document-text-outline" as const,
    title: "Quality Notes",
    desc: "Well-structured notes for all subjects",
  },
  {
    icon: "archive-outline" as const,
    title: "Previous Year Papers",
    desc: "Free download of PYQ papers",
  },
  {
    icon: "bulb-outline" as const,
    title: "Project Guidance",
    desc: "End-to-end project assistance",
  },
  {
    icon: "flask-outline" as const,
    title: "Lab Training",
    desc: "Hands-on practical sessions",
  },
  {
    icon: "laptop-outline" as const,
    title: "Skill Courses",
    desc: "Industry-relevant technical courses",
  },
  {
    icon: "location-outline" as const,
    title: "J&K Focused",
    desc: "Tailored for J&K students",
  },
];

export default function AboutSection() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconWrap}>
          <Ionicons
            name="information-circle"
            size={22}
            color={Colors.brand.primary}
          />
        </View>
        <Text style={styles.sectionTag}>About Us</Text>
      </View>
      <Text style={styles.heading}>About Kashur System</Text>
      <Text style={styles.description}>
        Kashur System is an educational platform dedicated to helping students
        up to{" "}
        <Text style={styles.bold}>Class 12 (NCERT & CBSE)</Text> in Jammu &
        Kashmir. We provide quality notes, previous year papers{" "}
        <Text style={styles.bold}>(free of cost)</Text>, project guidance, lab
        training, and skill-based courses to help students succeed academically
        and practically.
      </Text>

      <View style={styles.grid}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} />
        ))}
      </View>
    </View>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name={icon} size={20} color={Colors.brand.primaryLight} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.brand.offWhite,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.brand.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTag: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.primaryLight,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  heading: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: Colors.brand.darkText,
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: Colors.brand.bodyText,
    lineHeight: 22,
    marginBottom: 20,
  },
  bold: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.brand.primary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    backgroundColor: Colors.brand.white,
    borderRadius: 14,
    padding: 16,
    width: "47%",
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
    shadowColor: Colors.brand.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.brand.accentLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.darkText,
  },
  cardDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: Colors.brand.midGray,
    lineHeight: 16,
  },
});
