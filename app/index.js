import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { apiLogin } from "./api"; // Nhúng API

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password)
      return Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin!");

    try {
      // Gọi API Đăng nhập
      await apiLogin(email, password);

      // Nếu không bị văng lỗi (catch), nghĩa là đăng nhập thành công
      await AsyncStorage.setItem("currentUser", email); // Lưu phiên đăng nhập cục bộ
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Lỗi", error.message || "Không thể đăng nhập");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.linksContainer}>
        <Text style={styles.linkText}>Forgot password?</Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.linkTextBold}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... (Giữ nguyên styles cũ của bạn)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#000", padding: 10, borderRadius: 4 },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  linkText: { fontSize: 12, color: "gray" },
  linkTextBold: { fontSize: 12, fontWeight: "bold" },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
