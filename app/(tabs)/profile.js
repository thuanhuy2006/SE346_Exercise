import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState(""); // Cần giữ để không bị mất khi save đè

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const currentEmail = await AsyncStorage.getItem("currentUser");
        if (currentEmail) {
          const data = await AsyncStorage.getItem(`profile_${currentEmail}`);
          if (data) {
            const parsed = JSON.parse(data);
            setName(parsed.name || "");
            setEmail(parsed.email || "");
            setAddress(parsed.address || "");
            setAvatarUrl(parsed.avatarUrl || "");
            setDescription(parsed.description || "");
            setPassword(parsed.password);
          }
        }
      };
      loadData();
    }, []),
  );

  const handleSave = async () => {
    try {
      const profileData = {
        name,
        email,
        password,
        address,
        avatarUrl,
        description,
      };
      await AsyncStorage.setItem(
        `profile_${email}`,
        JSON.stringify(profileData),
      );
      Alert.alert("Thành công", "Đã cập nhật hồ sơ!");
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{name ? `${name}!` : "Profile!"}</Text>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 20 }}>🖼️</Text>
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
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
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          value={avatarUrl}
          onChangeText={setAvatarUrl}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
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
    marginTop: 20,
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
  },
  avatarImage: { width: 60, height: 60, borderRadius: 8 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  saveButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
