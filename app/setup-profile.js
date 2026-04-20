import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { apiGetProfile } from "./api"; // Đổi import database thành api

export default function SetupProfileScreen() {
  const { email } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (email) {
        try {
          const user = await apiGetProfile(email);
          if (user) {
            setName(user.name || "");
            setDescription(user.description || "");
          }
        } catch (error) {
          console.log("Không lấy được dữ liệu từ API:", error);
        }
      }
    };
    loadData();
  }, [email]);

  const handleSave = () => {
    // Không có API update, chỉ chuyển người dùng về trang Đăng nhập
    Alert.alert("Hoàn tất", "Trở về trang Đăng nhập", [
      { text: "OK", onPress: () => router.replace("/") },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.title}>Hồ sơ của bạn</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#f0f0f0" }]}
          value={name}
          editable={false}
        />
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
          style={[styles.input, { height: 80, backgroundColor: "#f0f0f0" }]}
          value={description}
          editable={false}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Về trang Đăng nhập</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 40 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#000", padding: 10, borderRadius: 4 },
  button: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
