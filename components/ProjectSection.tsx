import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const STEPS = [
  { num: "01", title: "Idea Selection", desc: "Choose the right project topic" },
  { num: "02", title: "Planning", desc: "Structure your project roadmap" },
  { num: "03", title: "Implementation", desc: "Build with expert guidance" },
  { num: "04", title: "Final Review", desc: "Polish and submit confidently" },
];

export default function ProjectSection() {
  const handleRequest = () => {
    Alert.alert(
      "Project Assistance",
      "Please contact us via phone or email to request project help.\n\nPhone: 9797853293\nEmail: tahirhaniefmir@gmail.com",
      [{ text: "Got it!" }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="construct" size={22} color={Colors.brand.primary} />
        </View>
        <Text style={styles.sectionTag}>Assistance</Text>
      </View>
      <Text style={styles.heading}>Project Assistance</Text>
      <Text style={styles.description}>
        Get expert guidance for your school and college projects. From idea
        selection to final implementation, I will help you complete your
        projects successfully.
      </Text>

      <View style={styles.stepsContainer}>
        {STEPS.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNumWrap}>
              <Text style={styles.stepNum}>{step.num}</Text>
            </View>
            {i < STEPS.length - 1 && <View style={styles.stepLine} />}
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        onPress={handleRequest}
        style={({ pressed }) => [styles.ctaBtn, pressed && styles.pressed]}
      >
        <LinearGradient
          colors={[Colors.brand.primaryLight, Colors.brand.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaGradient}
        >
          <Ionicons name="send-outline" size={18} color={Colors.brand.white} />
          <Text style={styles.ctaText}>Request Help</Text>
        </LinearGradient>
      </Pressable>
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
    marginBottom: 10,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: Colors.brand.bodyText,
    lineHeight: 22,
    marginBottom: 20,
  },
  stepsContainer: {
    backgroundColor: Colors.brand.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingBottom: 16,
  },
  stepNumWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.brand.accentLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepNum: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: Colors.brand.primaryLight,
  },
  stepLine: {
    position: "absolute",
    left: 19,
    top: 40,
    width: 2,
    height: 20,
    backgroundColor: Colors.brand.cardBorder,
  },
  stepContent: {
    flex: 1,
    paddingTop: 6,
  },
  stepTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: Colors.brand.darkText,
  },
  stepDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
    marginTop: 2,
  },
  ctaBtn: {
    borderRadius: 14,
    overflow: "hidden",
  },
  ctaGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  ctaText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.brand.white,
  },
  pressed: {
    opacity: 0.88,
  },
});
