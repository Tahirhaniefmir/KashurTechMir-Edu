import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Animated,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const VIDEO_ID = "I69f68yXet0";
const VIDEO_URL = "https://youtube.com/shorts/I69f68yXet0?si=d1PFUvUha9_d003E";
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;
const CHANNEL_URL = "https://youtube.com/@kashur.system";

export default function LabVideoCard() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.18,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleWatch = () => Linking.openURL(VIDEO_URL);
  const handleChannel = () => Linking.openURL(CHANNEL_URL);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Ionicons name="videocam" size={15} color="#FF0000" />
          <Text style={styles.sectionLabel}>Featured Video</Text>
        </View>
        <View style={styles.shortsBadge}>
          <Ionicons name="phone-portrait-outline" size={11} color={Colors.brand.accentLight} />
          <Text style={styles.shortsBadgeText}>Shorts</Text>
        </View>
      </View>

      {/* Main card */}
      <Pressable
        onPress={handleWatch}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        {/* Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: THUMBNAIL_URL }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />

          {/* Dark overlay for readability */}
          <View style={styles.overlay} />

          {/* YouTube Shorts badge top-left */}
          <View style={styles.ytBadge}>
            <Ionicons name="logo-youtube" size={14} color="#FF0000" />
            <Text style={styles.ytBadgeText}>YouTube Shorts</Text>
          </View>

          {/* Pulsing play button center */}
          <View style={styles.playContainer}>
            <Animated.View
              style={[styles.playGlow, { transform: [{ scale: pulseAnim }] }]}
            />
            <View style={styles.playRing}>
              <View style={styles.playBtn}>
                <Ionicons
                  name="play"
                  size={30}
                  color={Colors.brand.white}
                  style={{ marginLeft: 5 }}
                />
              </View>
            </View>
          </View>

          {/* Title overlay bottom */}
          <View style={styles.titleOverlay}>
            <Text style={styles.overlayTitle}>Explore Lab with Experts</Text>
            <Text style={styles.overlayMeta}>Tap to watch on YouTube</Text>
          </View>
        </View>

        {/* Info bar */}
        <View style={styles.infoBar}>
          <View style={styles.channelAvatar}>
            <Ionicons name="school" size={16} color={Colors.brand.white} />
          </View>
          <View style={styles.videoMeta}>
            <Text style={styles.videoTitle}>Explore Lab with Experts</Text>
            <Text style={styles.channelName}>
              KashurTechMir · Lab Demo
            </Text>
          </View>
          <Pressable
            onPress={handleWatch}
            style={({ pressed }) => [
              styles.watchBtn,
              pressed && { opacity: 0.8 },
            ]}
          >
            <Ionicons name="logo-youtube" size={14} color={Colors.brand.white} />
            <Text style={styles.watchBtnText}>Watch</Text>
          </Pressable>
        </View>
      </Pressable>

      {/* Subscribe strip */}
      <Pressable
        onPress={handleChannel}
        style={({ pressed }) => [
          styles.subscribeStrip,
          pressed && { opacity: 0.75 },
        ]}
      >
        <View style={styles.subscribeLeft}>
          <Ionicons name="logo-youtube" size={18} color="#FF0000" />
          <Text style={styles.subscribeText}>
            Subscribe to{" "}
            <Text style={styles.subscribeBold}>@kashurtechmir</Text> for more
          </Text>
        </View>
        <View style={styles.subscribeArrow}>
          <Ionicons
            name="arrow-forward"
            size={14}
            color={Colors.brand.accentLight}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 10,
    backgroundColor: "#061539",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.white,
    letterSpacing: 0.5,
  },
  shortsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  shortsBadgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: Colors.brand.accentLight,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  thumbnailContainer: {
    height: 210,
    backgroundColor: "#0A2463",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(6,21,57,0.38)",
  },
  ytBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.65)",
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
    zIndex: 1,
  },
  playGlow: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(30, 100, 220, 0.3)",
  },
  playRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  playBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(6,21,57,0.75)",
    gap: 2,
  },
  overlayTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 13,
    color: Colors.brand.white,
  },
  overlayMeta: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "rgba(255,255,255,0.65)",
  },
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0D1B3E",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  channelAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    marginTop: 1,
  },
  watchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FF0000",
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  watchBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: Colors.brand.white,
  },
  subscribeStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },
  subscribeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  subscribeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
    flex: 1,
  },
  subscribeBold: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.brand.accentLight,
  },
  subscribeArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
});
