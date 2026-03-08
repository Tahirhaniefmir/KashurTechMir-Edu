import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

const CONTACT_ITEMS = [
  {
    icon: "call-outline" as const,
    label: "Phone",
    value: "9797853293",
    action: () => Linking.openURL("tel:9797853293"),
    color: "#27AE60",
  },
  {
    icon: "mail-outline" as const,
    label: "Email",
    value: "tahirhaniefmir@gmail.com",
    action: () => Linking.openURL("mailto:tahirhaniefmir@gmail.com"),
    color: "#EB4335",
  },
  {
    icon: "logo-youtube" as const,
    label: "YouTube",
    value: "@kashurtechmir",
    action: () => Linking.openURL("https://youtube.com/@kashurtechmir"),
    color: "#FF0000",
  },
  {
    icon: "logo-facebook" as const,
    label: "Facebook",
    value: "KashurTechMir Page",
    action: () => Linking.openURL("https://www.facebook.com/share/17uTPusyFv/"),
    color: "#1877F2",
  },
  {
    icon: "logo-instagram" as const,
    label: "Instagram",
    value: "@tahir_hanief_mir",
    action: () =>
      Linking.openURL(
        "https://www.instagram.com/tahir_hanief_mir?igsh=YTg0ajU2cHFpZjI3"
      ),
    color: "#E1306C",
  },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert("Missing Fields", "Please fill in all fields before submitting.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setName("");
      setEmail("");
      setMessage("");
      Alert.alert(
        "Message Sent!",
        "Thank you for reaching out. We will get back to you soon.",
        [{ text: "Great!" }]
      );
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="call" size={22} color={Colors.brand.primary} />
        </View>
        <Text style={styles.sectionTag}>Get In Touch</Text>
      </View>
      <Text style={styles.heading}>Contact Me</Text>
      <Text style={styles.subText}>
        Have questions or want to enroll? Reach out anytime — I am here to
        help.
      </Text>

      <View style={styles.contactList}>
        {CONTACT_ITEMS.map((item, i) => (
          <Pressable
            key={i}
            onPress={item.action}
            style={({ pressed }) => [
              styles.contactCard,
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[styles.contactIconWrap, { backgroundColor: item.color + "20" }]}
            >
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{item.label}</Text>
              <Text style={styles.contactValue}>{item.value}</Text>
            </View>
            <Ionicons
              name="open-outline"
              size={16}
              color={Colors.brand.midGray}
            />
          </Pressable>
        ))}
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Send a Message</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Name</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="person-outline" size={16} color={Colors.brand.midGray} />
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={Colors.brand.midGray}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={16} color={Colors.brand.midGray} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.brand.midGray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message</Text>
          <View style={[styles.inputWrap, styles.textAreaWrap]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your message here..."
              placeholderTextColor={Colors.brand.midGray}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={submitting}
          style={({ pressed }) => [
            styles.submitBtn,
            pressed && styles.pressed,
            submitting && styles.submitting,
          ]}
        >
          {submitting ? (
            <>
              <Ionicons name="hourglass-outline" size={18} color={Colors.brand.white} />
              <Text style={styles.submitText}>Sending...</Text>
            </>
          ) : (
            <>
              <Ionicons name="paper-plane-outline" size={18} color={Colors.brand.white} />
              <Text style={styles.submitText}>Submit Message</Text>
            </>
          )}
        </Pressable>
      </View>
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
  contactList: {
    gap: 10,
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.brand.offWhite,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
  },
  contactIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: Colors.brand.midGray,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: Colors.brand.darkText,
    marginTop: 2,
  },
  formCard: {
    backgroundColor: Colors.brand.offWhite,
    borderRadius: 16,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.brand.cardBorder,
  },
  formTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: Colors.brand.darkText,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: Colors.brand.bodyText,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.brand.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    borderWidth: 1.5,
    borderColor: Colors.brand.cardBorder,
  },
  textAreaWrap: {
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: Colors.brand.darkText,
  },
  textArea: {
    height: 90,
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.brand.primary,
    borderRadius: 12,
    paddingVertical: 15,
  },
  submitText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: Colors.brand.white,
  },
  submitting: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.82,
  },
});
