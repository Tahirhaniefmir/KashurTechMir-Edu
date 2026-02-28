import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const { width } = Dimensions.get("window");

interface Props {
  onExploreNotes: () => void;
}

export default function HeroSection({ onExploreNotes }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.brand.primary, "#1034A6", Colors.brand.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.badgeRow}>
          <Ionicons name="school" size={14} color={Colors.brand.accentLight} />
          <Text style={styles.badge}>Educational Platform · J&K</Text>
        </View>

        <Text style={styles.heading}>KashurTechMir</Text>
        <Text style={styles.tagline}>
          Empowering Students from{"\n"}
          <Text style={styles.taglineAccent}>Theory to Practical</Text>
        </Text>

        <View style={styles.divider} />

        <Text style={styles.intro}>
          Hi, I am{" "}
          <Text style={styles.nameHighlight}>Tahir Hanief Mir</Text>, founder
          of KashurTechMir. I am here to help students from theory to practical
          learning. My goal is to provide quality education, notes, previous
          year papers, project assistance, and practical training to students
          across{" "}
          <Text style={styles.nameHighlight}>Jammu & Kashmir</Text>.
        </Text>

        <View style={styles.statsRow}>
          <StatBadge icon="book" label="Notes" value="Free" />
          <StatBadge icon="document-text" label="Papers" value="PYQ" />
          <StatBadge icon="laptop" label="Training" value="Lab" />
          <StatBadge icon="school" label="Courses" value="Skill" />
        </View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Pressable
            onPress={onExploreNotes}
            style={({ pressed }) => [
              styles.ctaBtn,
              pressed && styles.ctaBtnPressed,
            ]}
          >
            <Ionicons name="search" size={18} color={Colors.brand.primary} />
            <Text style={styles.ctaText}>Explore Notes</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={Colors.brand.primary}
            />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
}

function StatBadge({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statBadge}>
      <Ionicons name={icon} size={18} color={Colors.brand.accentLight} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 52,
    overflow: "hidden",
  },
  decorCircle1: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  decorCircle2: {
    position: "absolute",
    bottom: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  content: {
    gap: 16,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: Colors.brand.accentLight,
    letterSpacing: 0.5,
  },
  heading: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 36,
    color: Colors.brand.white,
    lineHeight: 44,
  },
  tagline: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 26,
  },
  taglineAccent: {
    color: "#5BC4FA",
  },
  divider: {
    height: 2,
    width: 48,
    backgroundColor: Colors.brand.accent,
    borderRadius: 2,
  },
  intro: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
  },
  nameHighlight: {
    fontFamily: "Poppins_600SemiBold",
    color: "#5BC4FA",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  statBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
    minWidth: 68,
    flex: 1,
  },
  statValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: Colors.brand.white,
  },
  statLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.brand.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  ctaBtnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  ctaText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.brand.primary,
    flex: 1,
    textAlign: "center",
  },
});
