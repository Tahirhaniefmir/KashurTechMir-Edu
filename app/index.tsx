import React, { useRef, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import LabVideoCard from "@/components/LabVideoCard";
import AboutSection from "@/components/AboutSection";
import ClassesSection from "@/components/ClassesSection";
import ProjectSection from "@/components/ProjectSection";
import LabSection from "@/components/LabSection";
import CoursesSection from "@/components/CoursesSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Colors from "@/constants/colors";

type SectionKey =
  | "home"
  | "about"
  | "classes"
  | "projects"
  | "lab"
  | "courses"
  | "contact";

const SECTIONS: SectionKey[] = [
  "home",
  "about",
  "classes",
  "projects",
  "lab",
  "courses",
  "contact",
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("home");
  const sectionOffsets = useRef<Record<SectionKey, number>>({
    home: 0,
    about: 0,
    classes: 0,
    projects: 0,
    lab: 0,
    courses: 0,
    contact: 0,
  });

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      let current: SectionKey = "home";
      for (const section of SECTIONS) {
        if (y >= sectionOffsets.current[section] - 100) {
          current = section;
        }
      }
      setActiveSection(current);
    },
    []
  );

  const navigateToSection = useCallback((section: string) => {
    const key = section as SectionKey;
    setActiveSection(key);
    scrollRef.current?.scrollTo({
      y: sectionOffsets.current[key],
      animated: true,
    });
  }, []);

  const registerOffset = (section: SectionKey, y: number) => {
    sectionOffsets.current[section] = y;
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar style="light" />

      <NavBar
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "web" ? 34 : insets.bottom,
        }}
      >
        <View
          onLayout={(e) =>
            registerOffset("home", e.nativeEvent.layout.y)
          }
        >
          <HeroSection onExploreNotes={() => navigateToSection("classes")} />
          <LabVideoCard />
        </View>

        <View
          onLayout={(e) =>
            registerOffset("about", e.nativeEvent.layout.y)
          }
        >
          <AboutSection />
        </View>

        <View
          onLayout={(e) =>
            registerOffset("classes", e.nativeEvent.layout.y)
          }
        >
          <ClassesSection />
        </View>

        <View
          onLayout={(e) =>
            registerOffset("projects", e.nativeEvent.layout.y)
          }
        >
          <ProjectSection />
        </View>

        <View
          onLayout={(e) =>
            registerOffset("lab", e.nativeEvent.layout.y)
          }
        >
          <LabSection />
        </View>

        <View
          onLayout={(e) =>
            registerOffset("courses", e.nativeEvent.layout.y)
          }
        >
          <CoursesSection />
        </View>

        <View
          onLayout={(e) =>
            registerOffset("contact", e.nativeEvent.layout.y)
          }
        >
          <ContactSection />
        </View>

        <FooterSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.brand.offWhite,
  },
});
