import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

interface NavBarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: "home-outline" as const },
  { key: "about", label: "About", icon: "information-circle-outline" as const },
  { key: "classes", label: "Classes", icon: "book-outline" as const },
  { key: "projects", label: "Projects", icon: "construct-outline" as const },
  { key: "lab", label: "Lab Training", icon: "flask-outline" as const },
  { key: "courses", label: "Courses", icon: "school-outline" as const },
  { key: "contact", label: "Contact", icon: "call-outline" as const },
];

export default function NavBar({ activeSection, onNavigate }: NavBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: Platform.OS === "web" ? 67 : insets.top,
        },
      ]}
    >
      <View style={styles.brandRow}>
        <View style={styles.logoCircle}>
          <Ionicons name="school" size={20} color={Colors.brand.white} />
        </View>
        <Text style={styles.brandName}>KashurTechMir</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navItems}
      >
        {NAV_ITEMS.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => onNavigate(item.key)}
            style={({ pressed }) => [
              styles.navItem,
              activeSection === item.key && styles.navItemActive,
              pressed && styles.navItemPressed,
            ]}
          >
            <Ionicons
              name={item.icon}
              size={14}
              color={
                activeSection === item.key
                  ? Colors.brand.white
                  : Colors.brand.accentLight
              }
            />
            <Text
              style={[
                styles.navLabel,
                activeSection === item.key && styles.navLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.brand.primary,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 100,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brand.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: Colors.brand.white,
    letterSpacing: 0.5,
  },
  navItems: {
    paddingHorizontal: 12,
    gap: 6,
    flexDirection: "row",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  navItemActive: {
    backgroundColor: Colors.brand.primaryLight,
  },
  navItemPressed: {
    opacity: 0.75,
  },
  navLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: Colors.brand.accentLight,
  },
  navLabelActive: {
    color: Colors.brand.white,
  },
});
