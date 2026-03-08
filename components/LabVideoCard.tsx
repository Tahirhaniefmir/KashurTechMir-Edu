import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

export default function LabVideoCard() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleWatch = () => {
    Linking.openURL("https://youtube.com/@kashurtechmir");
  };

  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
      <Text style={styles.sectionLabel}>Featured Video</Text>

      <Pressable
        onPress={handleWatch}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        {/* Video thumbnail background */}
        <LinearGradient
          colors={["#0A2463", "#1034A6", "#0E3A8C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.thumbnail}
        >
          {/* Circuit-pattern decoration */}
          <View style={styles.circuitDot1} />
          <View style={styles.circuitDot2} />
          <View style={styles.circuitLine1} />
          <View style={styles.circuitLine2} />
          <View style={styles.circuitLine3} />

          {/* YouTube badge */}
          <View style={styles.ytBadge}>
            <Ionicons name="logo-youtube" size={14} color="#FF0000" />
            <Text style={styles.ytBadgeText}>YouTube</Text>
          </View>

          {/* Play button */}
          <View style={styles.playContainer}>
            <Animated.View
              style={[
                styles.playGlow,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <View style={styles.playBtn}>
              <Ionicons name="play" size={28} color={Colors.brand.white} style={{ marginLeft: 4 }} />
            </View>
          </View>

          {/* Duration chip */}
          <View style={styles.durationChip}>
            <Ionicons name="flask" size={11} color={Colors.brand.accentLight} />
            <Text style={styles.durationText}>Lab Session</Text>
          </View>
        </LinearGradient>

        {/* Video info */}
        <View style={styles.infoRow}>
          <View style={styles.channelAvatar}>
            <Ionicons name="school" size={16} color={Colors.brand.white} />
          </View>
          <View style={styles.videoMeta}>
            <Text style={styles.videoTitle}>Explore Lab with Experts</Text>
            <Text style={styles.channelName}>KashurTechMir · Practical Training</Text>
          </View>
          <Pressable
            onPress={handleWatch}
            style={({ pressed }) => [styles.watchBtn, pressed && { opacity: 0.8 }]}
          >
            <Ionicons name="open-outline" size={14} color={Colors.brand.white} />
            <Text style={styles.watchText}>Watch</Text>
          </Pressable>
        </View>
      </Pressable>

      {/* Subscribe row */}
      <Pressable
        onPress={handleWatch}
        style={({ pressed }) => [styles.subscribeRow, pressed && { opacity: 0.8 }]}
      >
        <Ionicons name="logo-youtube" size={18} color="#FF0000" />
        <Text style={styles.subscribeText}>
          Subscribe to <Text style={styles.subscribeBold}>@kashurtechmir</Text> for more videos
        </Text>
        <Ionicons name="chevron-forward" size={14} color={Colors.brand.midGray} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 8,
    gap: 10,
    backgroundColor: "#061539",
  },
  sectionLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: Colors.brand.accentLight,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  thumbnail: {
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circuitDot1: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(62,146,204,0.4)",
  },
  circuitDot2: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(91,196,250,0.3)",
  },
  circuitLine1: {
    position: "absolute",
    top: 24,
    left: 28,
    width: 60,
    height: 1,
    backgroundColor: "rgba(62,146,204,0.3)",
  },
  circuitLine2: {
    position: "absolute",
    bottom: 33,
    right: 36,
    width: 50,
    height: 1,
    backgroundColor: "rgba(91,196,250,0.25)",
  },
  circuitLine3: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  ytBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  ytBadgeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: Colors.brand.white,
  },
  playContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  playGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(62,146,204,0.25)",
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  durationChip: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  durationText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: Colors.brand.accentLight,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0D1B3E",
    padding: 14,
  },
  channelAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.brand.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  videoMeta: {
    flex: 1,
  },
  videoTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.white,
    lineHeight: 18,
  },
  channelName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: Colors.brand.midGray,
    marginTop: 2,
  },
  watchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.brand.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  watchText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: Colors.brand.white,
  },
  subscribeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  subscribeText: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
    lineHeight: 17,
  },
  subscribeBold: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.brand.accentLight,
  },
});
