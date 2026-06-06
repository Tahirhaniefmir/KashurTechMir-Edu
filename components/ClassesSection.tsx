import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { getApiUrl } from "@/lib/query-client";

type BoardType = "NCERT" | "CBSE" | "COMPETITIVE" | "ISLAMIC";

const CLASSES = [6, 7, 8, 9, 10, 11, 12];

const CLASS6_SCIENCE_PDFS = [
  { ch: 1,  title: "Food — Where Does It Come From?",       path: "/assets/pdfs/class6-science-ch01-food-where-does-it-come-from.pdf" },
  { ch: 2,  title: "Components of Food",                    path: "/assets/pdfs/class6-science-ch02-components-of-food.pdf" },
  { ch: 3,  title: "Fibre to Fabric",                       path: "/assets/pdfs/class6-science-ch03-fibre-to-fabric.pdf" },
  { ch: 4,  title: "Sorting Materials into Groups",         path: "/assets/pdfs/class6-science-ch04-sorting-materials-into-groups.pdf" },
  { ch: 5,  title: "Separation of Substances",              path: "/assets/pdfs/class6-science-ch05-separation-of-substances.pdf" },
  { ch: 6,  title: "Changes Around Us",                     path: "/assets/pdfs/class6-science-ch06-changes-around-us.pdf" },
  { ch: 7,  title: "Getting to Know Plants",                path: "/assets/pdfs/class6-science-ch07-getting-to-know-plants.pdf" },
  { ch: 8,  title: "Body Movements",                        path: "/assets/pdfs/class6-science-ch08-body-movements.pdf" },
  { ch: 9,  title: "The Living Organisms and Their Surroundings", path: "/assets/pdfs/class6-science-ch09-living-organisms-and-surroundings.pdf" },
  { ch: 10, title: "Motion and Measurement of Distances",   path: "/assets/pdfs/class6-science-ch10-motion-and-measurement-of-distances.pdf" },
  { ch: 11, title: "Light, Shadows and Reflections",        path: "/assets/pdfs/class6-science-ch11-light-shadows-reflections.pdf" },
  { ch: 12, title: "Electricity and Circuits",              path: "/assets/pdfs/class6-science-ch12-electricity-and-circuits.pdf" },
  { ch: 13, title: "Fun with Magnets",                      path: "/assets/pdfs/class6-science-ch13-fun-with-magnets.pdf" },
  { ch: 14, title: "Water",                                 path: "/assets/pdfs/class6-science-ch14-water.pdf" },
  { ch: 15, title: "Air Around Us",                         path: "/assets/pdfs/class6-science-ch15-air-around-us.pdf" },
  { ch: 16, title: "Garbage in, Garbage out",               path: "/assets/pdfs/class6-science-ch16-garbage-in-garbage-out.pdf" },
];

const CLASS12_PHYSICS_PDFS = [
  { id: "semiconductors", title: "Power Semiconductor Devices", chapter: "Chapter 1", pages: "~50 pages", path: "/assets/pdfs/semiconductors-class12-physics.pdf" },
];

const COMPETITIVE_SECTIONS = [
  { id: "quant",    title: "Quantitative Aptitude",   icon: "calculator-outline" as const,  desc: "Number systems, arithmetic, algebra, geometry & data interpretation" },
  { id: "verbal",   title: "Verbal Ability",           icon: "chatbubble-outline" as const,   desc: "Reading comprehension, vocabulary, synonyms & antonyms" },
  { id: "reason",   title: "Reasoning",                icon: "git-network-outline" as const,  desc: "Logical, analytical, verbal & non-verbal reasoning" },
  { id: "computer", title: "Computer Fundamentals",   icon: "desktop-outline" as const,      desc: "Hardware, software, OS, networking & MS Office basics" },
  { id: "english",  title: "English",                  icon: "language-outline" as const,     desc: "Grammar, comprehension, essay writing & vocabulary" },
];

const ISLAMIC_PDFS = [
  { id: "mulakhas", title: "Al Mulakhas Al Fiqhi", subtitle: "Summarised Islamic Fiqh", comingSoon: false, path: null },
];

const BOARD_TABS: { key: BoardType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "NCERT",       label: "NCERT",             icon: "book-outline" },
  { key: "CBSE",        label: "CBSE (J&K)",        icon: "library-outline" },
  { key: "COMPETITIVE", label: "Competitive Exam",  icon: "trophy-outline" },
  { key: "ISLAMIC",     label: "Islamic Notes",     icon: "moon-outline" },
];

function openPdf(path: string) {
  try {
    const base = getApiUrl();
    const url = new URL(path, base).toString();
    Linking.openURL(url);
  } catch {
    Alert.alert("Error", "Could not open the PDF. Please try again.");
  }
}

export default function ClassesSection() {
  const [activeBoard, setActiveBoard] = useState<BoardType>("NCERT");
  const [expandedClass, setExpandedClass] = useState<number | null>(null);
  const [expandedCompetitive, setExpandedCompetitive] = useState<string | null>(null);

  const handleDownload = (cls: number, type: string) => {
    Alert.alert(
      "Coming Soon",
      `${type} for Class ${cls} (${activeBoard}) will be available soon!`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="book" size={22} color={Colors.brand.primary} />
        </View>
        <Text style={styles.sectionTag}>Study Material</Text>
      </View>
      <Text style={styles.heading}>Classes</Text>
      <Text style={styles.subText}>
        Browse NCERT/CBSE class notes, competitive exam resources, and Islamic studies.
      </Text>

      {/* Board Tabs — horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabContainer}
      >
        {BOARD_TABS.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => {
              setActiveBoard(tab.key);
              setExpandedClass(null);
              setExpandedCompetitive(null);
            }}
            style={({ pressed }) => [
              styles.tabBtn,
              activeBoard === tab.key && styles.tabBtnActive,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name={tab.icon}
              size={15}
              color={activeBoard === tab.key ? Colors.brand.white : Colors.brand.primaryLight}
            />
            <Text style={[styles.tabLabel, activeBoard === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* NCERT / CBSE: class cards */}
      {(activeBoard === "NCERT" || activeBoard === "CBSE") && (
        <View style={styles.classList}>
          {CLASSES.map((cls) => (
            <ClassCard
              key={cls}
              cls={cls}
              board={activeBoard}
              isExpanded={expandedClass === cls}
              onToggle={() => setExpandedClass(expandedClass === cls ? null : cls)}
              onDownload={handleDownload}
            />
          ))}
        </View>
      )}

      {/* Competitive Exam Notes */}
      {activeBoard === "COMPETITIVE" && (
        <CompetitiveSection
          expandedId={expandedCompetitive}
          onToggle={(id) => setExpandedCompetitive(expandedCompetitive === id ? null : id)}
        />
      )}

      {/* Islamic Notes */}
      {activeBoard === "ISLAMIC" && <IslamicSection />}
    </View>
  );
}

/* ─── Class Card (NCERT / CBSE) ─── */

function ClassCard({
  cls, board, isExpanded, onToggle, onDownload,
}: {
  cls: number; board: BoardType; isExpanded: boolean;
  onToggle: () => void; onDownload: (cls: number, type: string) => void;
}) {
  const [scienceExpanded, setScienceExpanded] = useState(false);

  const getSubjects = (c: number) => {
    if (c <= 8)  return ["Mathematics", "Science", "English", "Social Science", "Hindi"];
    if (c <= 10) return ["Mathematics", "Science", "English", "Social Science", "Hindi", "Computer"];
    return ["Mathematics", "Physics", "Chemistry", "Biology", "English", "CS"];
  };

  const subjects = getSubjects(cls);
  const has6Science  = cls === 6;
  const has12Physics = cls === 12;

  return (
    <View style={styles.classCard}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [
          styles.classHeader,
          isExpanded && styles.classHeaderExpanded,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.classNumBadge}>
          <Text style={styles.classNum}>{cls}</Text>
        </View>
        <View style={styles.classInfo}>
          <Text style={styles.className}>Class {cls}</Text>
          <Text style={styles.classBoard}>
            {board} · {subjects.length} Subjects
            {has6Science ? " · 15 PDFs" : has12Physics ? " · 1 PDF" : ""}
          </Text>
        </View>
        {(has6Science || has12Physics) && (
          <View style={styles.pdfAvailBadge}>
            <Ionicons name="document" size={10} color="#27AE60" />
            <Text style={styles.pdfAvailText}>PDF</Text>
          </View>
        )}
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.brand.primaryLight}
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.classBody}>
          {/* Subject chips */}
          <View style={styles.subjectsRow}>
            {subjects.map((sub) => {
              const highlight =
                (sub === "Science" && has6Science) || (sub === "Physics" && has12Physics);
              return (
                <View key={sub} style={[styles.subjectChip, highlight && styles.subjectChipHL]}>
                  <Text style={[styles.subjectChipText, highlight && styles.subjectChipTextHL]}>
                    {sub}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Class 6 Science PDFs */}
          {has6Science && (
            <View style={styles.pdfSection}>
              <Pressable
                onPress={() => setScienceExpanded((v) => !v)}
                style={({ pressed }) => [styles.pdfSectionToggle, pressed && styles.pressed]}
              >
                <View style={styles.pdfSectionLeft}>
                  <Ionicons name="flask-outline" size={15} color={Colors.brand.primaryLight} />
                  <Text style={styles.pdfSectionTitle}>Science Notes — All Chapters</Text>
                </View>
                <View style={styles.pdfCountBadge}>
                  <Text style={styles.pdfCountText}>15 PDFs</Text>
                </View>
                <Ionicons
                  name={scienceExpanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={Colors.brand.primaryLight}
                />
              </Pressable>

              {scienceExpanded && (
                <View style={styles.pdfList}>
                  {CLASS6_SCIENCE_PDFS.map((pdf) => (
                    <Pressable
                      key={pdf.ch}
                      onPress={() => {
                        if (pdf.path) openPdf(pdf.path);
                        else Alert.alert("Coming Soon", "Chapter 10 PDF will be added soon.");
                      }}
                      style={({ pressed }) => [
                        styles.pdfCard,
                        !pdf.path && styles.pdfCardDisabled,
                        pressed && styles.pressed,
                      ]}
                    >
                      <View style={[styles.pdfChBadge, !pdf.path && styles.pdfChBadgeGray]}>
                        <Text style={styles.pdfChText}>Ch {pdf.ch}</Text>
                      </View>
                      <Text style={[styles.pdfTitle, !pdf.path && styles.pdfTitleGray]} numberOfLines={2}>
                        {pdf.title}
                      </Text>
                      {pdf.path ? (
                        <View style={styles.pdfDlBtn}>
                          <Ionicons name="download" size={14} color={Colors.brand.white} />
                        </View>
                      ) : (
                        <View style={styles.pdfSoonBadge}>
                          <Text style={styles.pdfSoonText}>Soon</Text>
                        </View>
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Class 12 Physics PDFs */}
          {has12Physics && (
            <View style={styles.pdfSection}>
              <View style={styles.pdfSectionHeader}>
                <Ionicons name="book-outline" size={14} color={Colors.brand.primaryLight} />
                <Text style={styles.pdfSectionTitle}>Physics Notes (Available)</Text>
              </View>
              {CLASS12_PHYSICS_PDFS.map((pdf) => (
                <Pressable
                  key={pdf.id}
                  onPress={() => openPdf(pdf.path)}
                  style={({ pressed }) => [styles.pdfCardFull, pressed && styles.pressed]}
                >
                  <View style={styles.pdfIconWrap}>
                    <Ionicons name="document-text" size={22} color="#EB4335" />
                  </View>
                  <View style={styles.pdfMeta}>
                    <Text style={styles.pdfFullTitle}>{pdf.title}</Text>
                    <Text style={styles.pdfFullSub}>{pdf.chapter} · {pdf.pages}</Text>
                  </View>
                  <View style={styles.pdfDlBtnLg}>
                    <Ionicons name="download" size={16} color={Colors.brand.white} />
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <Pressable
              onPress={() => onDownload(cls, "Notes")}
              style={({ pressed }) => [styles.actionBtn, styles.notesBtn, pressed && styles.pressed]}
            >
              <Ionicons name="document-text-outline" size={16} color={Colors.brand.primaryLight} />
              <Text style={styles.notesBtnText}>View Notes</Text>
            </Pressable>
            <Pressable
              onPress={() => onDownload(cls, "Previous Year Papers")}
              style={({ pressed }) => [styles.actionBtn, styles.paperBtn, pressed && styles.pressed]}
            >
              <Ionicons name="download-outline" size={16} color="#fff" />
              <Text style={styles.paperBtnText}>Free Download PYQ</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

/* ─── Competitive Exam Notes ─── */

function CompetitiveSection({
  expandedId, onToggle,
}: { expandedId: string | null; onToggle: (id: string) => void }) {
  return (
    <View style={styles.competitiveWrap}>
      <View style={styles.competitiveBanner}>
        <Ionicons name="trophy" size={28} color={Colors.brand.primary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.competitiveBannerTitle}>Competitive Exam Notes</Text>
          <Text style={styles.competitiveBannerSub}>
            Comprehensive notes for government & entrance exams
          </Text>
        </View>
      </View>

      <View style={styles.classList}>
        {COMPETITIVE_SECTIONS.map((sec) => (
          <View key={sec.id} style={styles.classCard}>
            <Pressable
              onPress={() => onToggle(sec.id)}
              style={({ pressed }) => [
                styles.classHeader,
                expandedId === sec.id && styles.classHeaderExpanded,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.classNumBadge, { borderRadius: 12 }]}>
                <Ionicons name={sec.icon} size={20} color={Colors.brand.white} />
              </View>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{sec.title}</Text>
                <Text style={styles.classBoard}>{sec.desc}</Text>
              </View>
              <Ionicons
                name={expandedId === sec.id ? "chevron-up" : "chevron-down"}
                size={20}
                color={Colors.brand.primaryLight}
              />
            </Pressable>

            {expandedId === sec.id && (
              <View style={styles.classBody}>
                <View style={styles.comingSoonBox}>
                  <Ionicons name="time-outline" size={32} color={Colors.brand.primaryLight} />
                  <Text style={styles.comingSoonTitle}>Notes Coming Soon</Text>
                  <Text style={styles.comingSoonSub}>
                    {sec.title} notes are being prepared by our expert team. Check back soon!
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

/* ─── Islamic Notes ─── */

function IslamicSection() {
  return (
    <View style={styles.islamicWrap}>
      <View style={styles.islamicBanner}>
        <Ionicons name="moon" size={28} color={Colors.brand.primary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.islamicBannerTitle}>Islamic Notes</Text>
          <Text style={styles.islamicBannerSub}>
            Quality Islamic study material for students
          </Text>
        </View>
      </View>

      {ISLAMIC_PDFS.map((item) => (
        <View key={item.id} style={styles.islamicCard}>
          <View style={styles.islamicCardIcon}>
            <Ionicons name="moon" size={28} color={Colors.brand.primary} />
          </View>
          <View style={styles.islamicCardMeta}>
            <Text style={styles.islamicCardTitle}>{item.title}</Text>
            <Text style={styles.islamicCardSub}>{item.subtitle}</Text>
            <View style={styles.comingSoonPill}>
              <Ionicons name="time-outline" size={12} color={Colors.brand.primaryLight} />
              <Text style={styles.comingSoonPillText}>PDF Coming Soon</Text>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.islamicMoreNote}>
        <Ionicons name="information-circle-outline" size={16} color={Colors.brand.midGray} />
        <Text style={styles.islamicMoreText}>
          More Islamic study materials will be added. Contact us to suggest titles.
        </Text>
      </View>
    </View>
  );
}

/* ─── Styles ─── */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.brand.white,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  iconWrap: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.brand.accentLight,
    alignItems: "center", justifyContent: "center",
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
    marginBottom: 16,
    lineHeight: 20,
  },

  /* Tabs */
  tabScroll: { marginBottom: 16 },
  tabContainer: { gap: 8, paddingRight: 4 },
  tabBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.brand.primaryLight,
    backgroundColor: Colors.brand.white,
  },
  tabBtnActive: {
    backgroundColor: Colors.brand.primary,
    borderColor: Colors.brand.primary,
  },
  tabLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.primaryLight,
  },
  tabLabelActive: { color: Colors.brand.white },

  /* Class list */
  classList: { gap: 10 },
  classCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
    overflow: "hidden",
    backgroundColor: Colors.brand.white,
    shadowColor: Colors.brand.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  classHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
    backgroundColor: Colors.brand.white,
  },
  classHeaderExpanded: { backgroundColor: Colors.brand.accentLight },
  classNumBadge: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.brand.primary,
    alignItems: "center", justifyContent: "center",
  },
  classNum: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: Colors.brand.white,
  },
  classInfo: { flex: 1 },
  className: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: Colors.brand.darkText,
  },
  classBoard: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
  },
  pdfAvailBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(39,174,96,0.12)",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(39,174,96,0.25)",
  },
  pdfAvailText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 9,
    color: "#27AE60",
  },
  classBody: {
    padding: 14,
    paddingTop: 10,
    backgroundColor: Colors.brand.offWhite,
    gap: 10,
  },

  /* Subject chips */
  subjectsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  subjectChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: Colors.brand.accentLight,
  },
  subjectChipHL: { backgroundColor: Colors.brand.primary },
  subjectChipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: Colors.brand.primaryLight,
  },
  subjectChipTextHL: { color: Colors.brand.white },

  /* PDF sections */
  pdfSection: {
    backgroundColor: Colors.brand.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
    overflow: "hidden",
  },
  pdfSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 10,
  },
  pdfSectionToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
  },
  pdfSectionLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pdfSectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.primaryLight,
    flex: 1,
  },
  pdfCountBadge: {
    backgroundColor: Colors.brand.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
  },
  pdfCountText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: Colors.brand.white,
  },
  pdfList: { borderTopWidth: 1, borderTopColor: Colors.brand.cardBorder },

  /* Compact PDF row (Ch 1–16) */
  pdfCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.brand.cardBorder,
  },
  pdfCardDisabled: { opacity: 0.5 },
  pdfChBadge: {
    width: 40,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pdfChBadgeGray: { backgroundColor: Colors.brand.midGray },
  pdfChText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    color: Colors.brand.white,
  },
  pdfTitle: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: Colors.brand.darkText,
    lineHeight: 17,
  },
  pdfTitleGray: { color: Colors.brand.midGray },
  pdfDlBtn: {
    width: 30, height: 30,
    borderRadius: 8,
    backgroundColor: Colors.brand.primary,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  pdfSoonBadge: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.brand.midGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pdfSoonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: Colors.brand.midGray,
  },

  /* Full PDF card (Class 12 physics) */
  pdfCardFull: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
  },
  pdfIconWrap: {
    width: 44, height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(235,67,53,0.08)",
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  pdfMeta: { flex: 1 },
  pdfFullTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.darkText,
    lineHeight: 18,
  },
  pdfFullSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: Colors.brand.midGray,
    marginTop: 2,
  },
  pdfDlBtnLg: {
    width: 36, height: 36,
    borderRadius: 10,
    backgroundColor: Colors.brand.primary,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },

  /* Action row */
  actionRow: { flexDirection: "row", gap: 10 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  notesBtn: {
    backgroundColor: Colors.brand.white,
    borderWidth: 1.5,
    borderColor: Colors.brand.primaryLight,
  },
  notesBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.primaryLight,
  },
  paperBtn: { backgroundColor: Colors.brand.primary },
  paperBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.white,
  },

  /* Competitive */
  competitiveWrap: { gap: 12 },
  competitiveBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.brand.accentLight,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
  },
  competitiveBannerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: Colors.brand.primary,
  },
  competitiveBannerSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.bodyText,
    marginTop: 2,
  },

  /* Coming soon */
  comingSoonBox: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  comingSoonTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: Colors.brand.primaryLight,
  },
  comingSoonSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
    textAlign: "center",
    lineHeight: 18,
  },

  /* Islamic */
  islamicWrap: { gap: 12 },
  islamicBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F0EAF8",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D4C5EA",
  },
  islamicBannerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: "#4A1D8A",
  },
  islamicBannerSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#7A5DAA",
    marginTop: 2,
  },
  islamicCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.brand.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
    shadowColor: Colors.brand.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  islamicCardIcon: {
    width: 52, height: 52,
    borderRadius: 14,
    backgroundColor: "#F0EAF8",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  islamicCardMeta: { flex: 1, gap: 3 },
  islamicCardTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: Colors.brand.darkText,
  },
  islamicCardSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
  },
  comingSoonPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: Colors.brand.accentLight,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  comingSoonPillText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: Colors.brand.primaryLight,
  },
  islamicMoreNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: Colors.brand.offWhite,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
  },
  islamicMoreText: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: Colors.brand.midGray,
    lineHeight: 18,
  },

  pressed: { opacity: 0.75 },
});
