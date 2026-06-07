import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
  Animated,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const ET_VIDEO_ID = "nuA1qdjO2jY";
const ET_VIDEO_URL = "https://youtu.be/nuA1qdjO2jY";
const ET_THUMBNAIL = `https://img.youtube.com/vi/${ET_VIDEO_ID}/hqdefault.jpg`;

const MATLAB_PLAYLIST = "https://youtube.com/playlist?list=PLZV7tleirGTLyUAgkXI3mQo1fAnKy_aPc";

const COURSES = [
  {
    icon: "code-slash-outline" as const,
    title: "Programming Courses",
    desc: "Python, C, C++, Java & Web Development fundamentals for beginners to intermediate learners.",
    duration: "3-6 Months",
    level: "Beginner - Intermediate",
    badge: "Popular",
    badgeColor: "#27AE60",
    demoUrl: null as string | null,
  },
  {
    icon: "bar-chart-outline" as const,
    title: "MATLAB Course",
    desc: "Scientific computing, data analysis, simulation & engineering problem solving with MATLAB.",
    duration: "2 Months",
    level: "Intermediate",
    badge: "Technical",
    badgeColor: Colors.brand.accent,
    demoUrl: MATLAB_PLAYLIST,
  },
  {
    icon: "desktop-outline" as const,
    title: "Basic Computer Course",
    desc: "MS Office, Internet basics, typing, file management & essential computer skills.",
    duration: "1 Month",
    level: "Beginner",
    badge: "Starter",
    badgeColor: "#F2994A",
    demoUrl: null as string | null,
  },
  {
    icon: "hardware-chip-outline" as const,
    title: "Other Technical Courses",
    desc: "Arduino, Raspberry Pi, networking basics, graphic design & more skill-based courses.",
    duration: "Varies",
    level: "All Levels",
    badge: "New",
    badgeColor: "#EB5757",
    demoUrl: null as string | null,
  },
];

export default function CoursesSection() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 850,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 850,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleEnroll = (title: string) => {
    Alert.alert(
      "Enroll Now",
      `To enroll in "${title}", contact us:\n\nPhone: 9797853293\nEmail: tahirhaniefmir@gmail.com`,
      [{ text: "Got it!" }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="school" size={22} color={Colors.brand.primary} />
        </View>
        <Text style={styles.sectionTag}>Learn & Grow</Text>
      </View>
      <Text style={styles.heading}>Courses</Text>
      <Text style={styles.subText}>
        Skill-based courses designed to help students grow technically and
        professionally.
      </Text>

      {/* ── Featured Video ── */}
      <Animated.View style={[styles.videoWrapper, { opacity: fadeAnim }]}>
        <View style={styles.videoLabelRow}>
          <Ionicons name="play-circle" size={16} color="#FF0000" />
          <Text style={styles.videoLabel}>Featured Lecture</Text>
          <View style={styles.etBadge}>
            <Text style={styles.etBadgeText}>🌐 Emerging Tech</Text>
          </View>
        </View>

        <Pressable
          onPress={() => Linking.openURL(ET_VIDEO_URL)}
          style={({ pressed }) => [
            styles.videoCard,
            pressed && styles.videoCardPressed,
          ]}
        >
          {/* Thumbnail */}
          <View style={styles.thumbContainer}>
            <Image
              source={{ uri: ET_THUMBNAIL }}
              style={styles.thumbImage}
              resizeMode="cover"
            />
            <View style={styles.thumbOverlay} />

            {/* YouTube badge */}
            <View style={styles.ytBadge}>
              <Ionicons name="logo-youtube" size={13} color="#FF0000" />
              <Text style={styles.ytBadgeText}>YouTube</Text>
            </View>

            {/* Pulsing play button */}
            <View style={styles.playCentre}>
              <Animated.View
                style={[styles.playGlow, { transform: [{ scale: pulseAnim }] }]}
              />
              <View style={styles.playRing}>
                <Ionicons
                  name="play"
                  size={26}
                  color={Colors.brand.white}
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>

            {/* Title overlay */}
            <View style={styles.titleOverlay}>
              <Text style={styles.overlayTitle}>
                Introduction to Emerging Technologies
              </Text>
              <Text style={styles.overlayMeta}>Tap to watch on YouTube</Text>
            </View>
          </View>

          {/* Info bar */}
          <View style={styles.infoBar}>
            <View style={styles.infoAvatar}>
              <Ionicons name="globe-outline" size={16} color={Colors.brand.white} />
            </View>
            <View style={styles.infoMeta}>
              <Text style={styles.infoTitle}>Emerging Technologies</Text>
              <Text style={styles.infoSub}>Kashur System · Full Lecture</Text>
            </View>
            <View style={styles.watchBtn}>
              <Ionicons name="logo-youtube" size={14} color={Colors.brand.white} />
              <Text style={styles.watchText}>Watch</Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>

      {/* ── Course Cards ── */}
      <View style={styles.coursesList}>
        {COURSES.map((course, i) => (
          <CourseCard
            key={i}
            course={course}
            onEnroll={() => handleEnroll(course.title)}
          />
        ))}
      </View>
    </View>
  );
}

function CourseCard({
  course,
  onEnroll,
}: {
  course: (typeof COURSES)[number];
  onEnroll: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.iconContainer}>
          <Ionicons name={course.icon} size={24} color={Colors.brand.primaryLight} />
        </View>
        <View style={[styles.badge, { backgroundColor: course.badgeColor }]}>
          <Text style={styles.badgeText}>{course.badge}</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{course.title}</Text>
      <Text style={styles.cardDesc}>{course.desc}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={12} color={Colors.brand.midGray} />
          <Text style={styles.metaText}>{course.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="trending-up-outline" size={12} color={Colors.brand.midGray} />
          <Text style={styles.metaText}>{course.level}</Text>
        </View>
      </View>

      {course.demoUrl && (
        <Pressable
          onPress={() => Linking.openURL(course.demoUrl!)}
          style={({ pressed }) => [styles.demoBtn, pressed && styles.pressed]}
        >
          <Ionicons name="logo-youtube" size={15} color="#FF0000" />
          <Text style={styles.demoBtnText}>Demo Lectures Playlist</Text>
          <Ionicons name="open-outline" size={13} color={Colors.brand.primaryLight} />
        </Pressable>
      )}

      <Pressable
        onPress={onEnroll}
        style={({ pressed }) => [
          styles.enrollBtn,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="add-circle-outline" size={16} color={Colors.brand.white} />
        <Text style={styles.enrollText}>Enroll Now</Text>
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
    marginBottom: 6,
  },
  subText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: Colors.brand.bodyText,
    marginBottom: 18,
    lineHeight: 20,
  },

  /* ── Featured Video ── */
  videoWrapper: {
    marginBottom: 20,
    gap: 10,
  },
  videoLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  videoLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.darkText,
    flex: 1,
  },
  etBadge: {
    backgroundColor: Colors.brand.accentLight,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  etBadgeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: Colors.brand.primaryLight,
  },
  videoCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
    backgroundColor: Colors.brand.white,
  },
  videoCardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  thumbContainer: {
    height: 200,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.brand.primary,
  },
  thumbImage: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    width: "100%",
    height: "100%",
  },
  thumbOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(6,21,57,0.35)",
  },
  ytBadge: {
    position: "absolute",
    top: 12, left: 12,
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
  playCentre: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  playGlow: {
    position: "absolute",
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(30,100,220,0.28)",
  },
  playRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleOverlay: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(6,21,57,0.75)",
    gap: 2,
  },
  overlayTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 13,
    color: Colors.brand.white,
    lineHeight: 19,
  },
  overlayMeta: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
  },
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.brand.primary,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  infoAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brand.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoMeta: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.white,
    lineHeight: 18,
  },
  infoSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    marginTop: 1,
  },
  watchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FF0000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  watchText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: Colors.brand.white,
  },

  /* ── Course Cards ── */
  coursesList: {
    gap: 14,
  },
  card: {
    backgroundColor: Colors.brand.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
    gap: 10,
    shadowColor: Colors.brand.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.brand.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: Colors.brand.white,
  },
  cardTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.brand.darkText,
    lineHeight: 22,
  },
  cardDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: Colors.brand.bodyText,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    gap: 14,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: Colors.brand.midGray,
  },
  enrollBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.brand.primary,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 2,
  },
  enrollText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: Colors.brand.white,
  },
  pressed: {
    opacity: 0.82,
  },
  demoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  demoBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.darkText,
    flex: 1,
  },
});
