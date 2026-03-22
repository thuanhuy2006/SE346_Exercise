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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Thông báo", "Vui lòng nhập email!");
      return;
    }

    try {
      // 1. Tìm xem email này có trong hệ thống (AsyncStorage) không
      const storedUser = await AsyncStorage.getItem(`profile_${email}`);

      if (storedUser !== null) {
        // Tài khoản có tồn tại
        const userData = JSON.parse(storedUser);

        // 2. Kiểm tra xem mật khẩu có khớp không
        if (userData.password && userData.password !== password) {
          Alert.alert("Lỗi", "Mật khẩu không chính xác!");
          return;
        }

        // 3. Đúng email & mật khẩu -> Chuyển sang trang Profile
        router.push({ pathname: "/profile", params: { email: email } });
      } else {
        // Tài khoản không tồn tại, hiện thông báo gợi ý tạo tài khoản
        Alert.alert(
          "Tài khoản không tồn tại",
          "Email này chưa được đăng ký. Bạn có muốn tạo tài khoản mới không?",
          [
            { text: "Hủy", style: "cancel" },
            { text: "Đăng ký ngay", onPress: () => router.push("/register") },
          ],
        );
      }
    } catch (error) {
      console.error(error);
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

      {/* Gắn hàm handleLogin vào nút Sign in */}
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
