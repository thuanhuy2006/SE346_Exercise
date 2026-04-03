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
import { getUserByEmail } from "./database"; // <-- Import SQLite

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) return Alert.alert("Thông báo", "Vui lòng nhập email!");
    try {
      const user = await getUserByEmail(email); // <-- Tra cứu từ SQLite
      if (user) {
        if (user.password !== password)
          return Alert.alert("Lỗi", "Mật khẩu không chính xác!");

        await AsyncStorage.setItem("currentUser", email); // Lưu phiên
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Lỗi", "Tài khoản không tồn tại!");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng nhập.");
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
