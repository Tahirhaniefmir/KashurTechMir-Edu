import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const founderPhoto = require("@/assets/images/founder.jpg");

interface Props {
  onExploreNotes: () => void;
}

export default function HeroSection({ onExploreNotes }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const photoScaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(photoScaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.85],
  });

  return (
    <LinearGradient
      colors={["#061539", "#0A2463", "#1034A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Background decorations */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorCircle3} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Platform badge */}
        <View style={styles.badgeRow}>
          <Ionicons name="school" size={13} color={Colors.brand.accentLight} />
          <Text style={styles.badge}>Educational Platform · J&K</Text>
        </View>

        {/* Founder photo + name card */}
        <View style={styles.founderCard}>
          <Animated.View
            style={[
              styles.photoWrapper,
              { transform: [{ scale: photoScaleAnim }] },
            ]}
          >
            {/* Glow ring */}
            <Animated.View
              style={[styles.glowRing, { opacity: glowOpacity }]}
            />
            {/* Outer ring */}
            <View style={styles.photoRingOuter}>
              <View style={styles.photoRingInner}>
                <Image
                  source={founderPhoto}
                  style={styles.founderPhoto}
                  resizeMode="cover"
                />
              </View>
            </View>
            {/* Verified badge */}
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={12} color="#fff" />
            </View>
          </Animated.View>

          <View style={styles.founderInfo}>
            <Text style={styles.founderName}>Tahir Hanief Mir</Text>
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

        {/* Heading */}
        <View style={styles.headingBlock}>
          <Text style={styles.heading}>KashurTechMir</Text>
          <Text style={styles.tagline}>
            Empowering Students from{" "}
            <Text style={styles.taglineAccent}>Theory to Practical</Text>
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Intro text */}
        <Text style={styles.intro}>
          I am here to help students from theory to practical learning — providing
          quality education, notes, previous year papers, project assistance, and
          practical training to students across{" "}
          <Text style={styles.nameHighlight}>Jammu & Kashmir</Text>.
        </Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatBadge icon="book" label="Notes" value="Free" />
          <StatBadge icon="document-text" label="Papers" value="PYQ" />
          <StatBadge icon="flask" label="Lab" value="Live" />
          <StatBadge icon="school" label="Courses" value="Skill" />
        </View>

        {/* CTA button */}
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
      <Ionicons name={icon} size={16} color={Colors.brand.accentLight} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 48,
    overflow: "hidden",
  },
  decorCircle1: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(62,146,204,0.08)",
  },
  decorCircle2: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  decorCircle3: {
    position: "absolute",
    top: 120,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(30,77,183,0.15)",
  },
  content: {
    gap: 18,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: Colors.brand.accentLight,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  founderCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  photoWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  glowRing: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.brand.accent,
    zIndex: 0,
  },
  photoRingOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2.5,
    borderColor: "#5BC4FA",
    padding: 3,
    zIndex: 1,
  },
  photoRingInner: {
    flex: 1,
    borderRadius: 40,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.brand.primary,
  },
  founderPhoto: {
    width: "100%",
    height: "100%",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#27AE60",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.brand.primary,
    zIndex: 2,
  },
  founderInfo: {
    flex: 1,
    gap: 4,
  },
  founderName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
    color: Colors.brand.white,
    lineHeight: 22,
  },
  founderRoleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#5BC4FA",
  },
  founderRole: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: Colors.brand.accentLight,
  },
  founderTagRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 2,
  },
  founderTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(62,146,204,0.2)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  founderTagText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: Colors.brand.accentLight,
  },
  headingBlock: {
    gap: 4,
  },
  heading: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 32,
    color: Colors.brand.white,
    lineHeight: 40,
  },
  tagline: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 24,
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
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    lineHeight: 21,
  },
  nameHighlight: {
    fontFamily: "Poppins_600SemiBold",
    color: "#5BC4FA",
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
  },
  statBadge: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    gap: 3,
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: Colors.brand.white,
  },
  statLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 9,
    color: "rgba(255,255,255,0.6)",
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
