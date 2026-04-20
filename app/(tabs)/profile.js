import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { apiGetProfile } from "../api";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const currentEmail = await AsyncStorage.getItem("currentUser");
        if (currentEmail) {
          try {
            // Lấy thông tin từ Server
            const userData = await apiGetProfile(currentEmail);
            setName(userData.name || "");
            setEmail(userData.email || currentEmail);
            setDescription(userData.description || "");
          } catch (error) {
            console.log("Chưa có profile API");
          }
        }
      };
      loadData();
    }, []),
  );

  const handleSave = () => {
    // Tài liệu API chưa cung cấp Endpoint để UPDATE profile
    Alert.alert(
      "Tính năng chưa hỗ trợ",
      "API chưa có Endpoint để cập nhật Profile.",
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{name ? `${name}!` : "Profile!"}</Text>
        <View style={styles.avatarPlaceholder}>
          <Text style={{ fontSize: 20 }}>🖼️</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} editable={false} />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#f0f0f0" }]}
          value={email}
          editable={false}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          editable={false}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 40,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatarImage: { width: 60, height: 60, borderRadius: 8 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, color: "#555", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  saveButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
