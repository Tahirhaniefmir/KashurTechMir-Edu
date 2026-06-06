import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { getApiUrl } from "@/lib/query-client";

const CLASSES = [6, 7, 8, 9, 10, 11, 12];

type BoardType = "NCERT" | "CBSE";

const CLASS12_PHYSICS_PDFS = [
  {
    id: "semiconductors",
    title: "Power Semiconductor Devices",
    chapter: "Chapter 1",
    pages: "~50 pages",
    path: "/assets/pdfs/semiconductors-class12-physics.pdf",
  },
];

export default function ClassesSection() {
  const [activeBoard, setActiveBoard] = useState<BoardType>("NCERT");
  const [expandedClass, setExpandedClass] = useState<number | null>(null);

  const handleDownload = (cls: number, type: string) => {
    Alert.alert(
      "Coming Soon",
      `${type} for Class ${cls} (${activeBoard}) will be available soon! Stay tuned.`,
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
        Select your board and class to access notes and previous year papers.
      </Text>

      <View style={styles.boardToggle}>
        {(["NCERT", "CBSE"] as BoardType[]).map((board) => (
          <Pressable
            key={board}
            onPress={() => {
              setActiveBoard(board);
              setExpandedClass(null);
            }}
            style={({ pressed }) => [
              styles.boardBtn,
              activeBoard === board && styles.boardBtnActive,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name={board === "NCERT" ? "book-outline" : "library-outline"}
              size={16}
              color={
                activeBoard === board
                  ? Colors.brand.white
                  : Colors.brand.primaryLight
              }
            />
            <Text
              style={[
                styles.boardBtnText,
                activeBoard === board && styles.boardBtnTextActive,
              ]}
            >
              {board === "NCERT" ? "NCERT Board" : "CBSE Board (J&K)"}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.classList}>
        {CLASSES.map((cls) => (
          <ClassCard
            key={cls}
            cls={cls}
            board={activeBoard}
            isExpanded={expandedClass === cls}
            onToggle={() =>
              setExpandedClass(expandedClass === cls ? null : cls)
            }
            onDownload={handleDownload}
          />
        ))}
      </View>
    </View>
  );
}

function ClassCard({
  cls,
  board,
  isExpanded,
  onToggle,
  onDownload,
}: {
  cls: number;
  board: BoardType;
  isExpanded: boolean;
  onToggle: () => void;
  onDownload: (cls: number, type: string) => void;
}) {
  const getSubjects = (cls: number) => {
    if (cls <= 8)
      return ["Mathematics", "Science", "English", "Social Science", "Hindi"];
    if (cls <= 10)
      return [
        "Mathematics",
        "Science",
        "English",
        "Social Science",
        "Hindi",
        "Computer",
      ];
    return ["Mathematics", "Physics", "Chemistry", "Biology", "English", "CS"];
  };

  const openPdf = (path: string) => {
    try {
      const base = getApiUrl();
      const url = new URL(path, base).toString();
      Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Could not open the PDF. Please try again.");
    }
  };

  const has12PhysicsPdfs = cls === 12;

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
            {board} · {getSubjects(cls).length} Subjects
            {has12PhysicsPdfs ? " · 1 PDF" : ""}
          </Text>
        </View>
        {has12PhysicsPdfs && (
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
          {/* Subjects */}
          <View style={styles.subjectsRow}>
            {getSubjects(cls).map((sub) => (
              <View
                key={sub}
                style={[
                  styles.subjectChip,
                  sub === "Physics" && has12PhysicsPdfs && styles.subjectChipHighlight,
                ]}
              >
                <Text
                  style={[
                    styles.subjectChipText,
                    sub === "Physics" && has12PhysicsPdfs && styles.subjectChipTextHighlight,
                  ]}
                >
                  {sub}
                </Text>
              </View>
            ))}
          </View>

          {/* Class 12 Physics PDFs */}
          {has12PhysicsPdfs && (
            <View style={styles.pdfSection}>
              <View style={styles.pdfSectionHeader}>
                <Ionicons name="book" size={14} color={Colors.brand.primaryLight} />
                <Text style={styles.pdfSectionTitle}>Physics Notes (Available)</Text>
              </View>
              {CLASS12_PHYSICS_PDFS.map((pdf) => (
                <Pressable
                  key={pdf.id}
                  onPress={() => openPdf(pdf.path)}
                  style={({ pressed }) => [
                    styles.pdfCard,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.pdfIconWrap}>
                    <Ionicons name="document-text" size={22} color="#EB4335" />
                  </View>
                  <View style={styles.pdfMeta}>
                    <Text style={styles.pdfTitle}>{pdf.title}</Text>
                    <Text style={styles.pdfSub}>
                      {pdf.chapter} · {pdf.pages}
                    </Text>
                  </View>
                  <View style={styles.pdfDownloadBtn}>
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
              style={({ pressed }) => [
                styles.actionBtn,
                styles.notesBtn,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="document-text-outline"
                size={16}
                color={Colors.brand.primaryLight}
              />
              <Text style={styles.notesBtnText}>View Notes</Text>
            </Pressable>
            <Pressable
              onPress={() => onDownload(cls, "Previous Year Papers")}
              style={({ pressed }) => [
                styles.actionBtn,
                styles.paperBtn,
                pressed && styles.pressed,
              ]}
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
  boardToggle: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  boardBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.brand.primaryLight,
    backgroundColor: Colors.brand.white,
  },
  boardBtnActive: {
    backgroundColor: Colors.brand.primary,
    borderColor: Colors.brand.primary,
  },
  boardBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.primaryLight,
  },
  boardBtnTextActive: {
    color: Colors.brand.white,
  },
  classList: {
    gap: 10,
  },
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
  classHeaderExpanded: {
    backgroundColor: Colors.brand.accentLight,
  },
  classNumBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  classNum: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: Colors.brand.white,
  },
  classInfo: {
    flex: 1,
  },
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
    paddingTop: 12,
    backgroundColor: Colors.brand.offWhite,
    gap: 12,
  },
  subjectsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  subjectChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: Colors.brand.accentLight,
  },
  subjectChipHighlight: {
    backgroundColor: Colors.brand.primary,
  },
  subjectChipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: Colors.brand.primaryLight,
  },
  subjectChipTextHighlight: {
    color: Colors.brand.white,
  },

  /* PDF section */
  pdfSection: {
    gap: 8,
  },
  pdfSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pdfSectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.primaryLight,
  },
  pdfCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.brand.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
  },
  pdfIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(235,67,53,0.08)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pdfMeta: {
    flex: 1,
  },
  pdfTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: Colors.brand.darkText,
    lineHeight: 18,
  },
  pdfSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: Colors.brand.midGray,
    marginTop: 2,
  },
  pdfDownloadBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* Action buttons */
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
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
  paperBtn: {
    backgroundColor: Colors.brand.primary,
  },
  paperBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: Colors.brand.white,
  },
  pressed: {
    opacity: 0.75,
  },
});
