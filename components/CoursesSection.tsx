import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const COURSES = [
  {
    icon: "code-slash-outline" as const,
    title: "Programming Courses",
    desc: "Python, C, C++, Java & Web Development fundamentals for beginners to intermediate learners.",
    duration: "3-6 Months",
    level: "Beginner - Intermediate",
    badge: "Popular",
    badgeColor: "#27AE60",
  },
  {
    icon: "bar-chart-outline" as const,
    title: "MATLAB Course",
    desc: "Scientific computing, data analysis, simulation & engineering problem solving with MATLAB.",
    duration: "2 Months",
    level: "Intermediate",
    badge: "Technical",
    badgeColor: Colors.brand.accent,
  },
  {
    icon: "desktop-outline" as const,
    title: "Basic Computer Course",
    desc: "MS Office, Internet basics, typing, file management & essential computer skills.",
    duration: "1 Month",
    level: "Beginner",
    badge: "Starter",
    badgeColor: "#F2994A",
  },
  {
    icon: "hardware-chip-outline" as const,
    title: "Other Technical Courses",
    desc: "Arduino, Raspberry Pi, networking basics, graphic design & more skill-based courses.",
    duration: "Varies",
    level: "All Levels",
    badge: "New",
    badgeColor: "#EB5757",
  },
];

export default function CoursesSection() {
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
});
