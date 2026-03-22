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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    // 1. Kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (!email || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập email và mật khẩu!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // 2. Kiểm tra xem email này đã từng được đăng ký chưa
      const existingUser = await AsyncStorage.getItem(`profile_${email}`);
      if (existingUser !== null) {
        Alert.alert(
          "Lỗi",
          "Email này đã được sử dụng. Vui lòng dùng email khác!",
        );
        return;
      }

      // 3. Nếu chưa có, tiến hành tạo tài khoản mới
      const newUserProfile = {
        name: name,
        email: email,
        password: password, // Lưu ý: Trong thực tế không nên lưu mật khẩu dạng rõ thế này, nhưng để làm bài tập thì OK
        address: "",
        avatarUrl: "",
        description: "",
      };

      // Lưu vào AsyncStorage
      await AsyncStorage.setItem(
        `profile_${email}`,
        JSON.stringify(newUserProfile),
      );

      // Thông báo thành công và quay lại trang đăng nhập
      Alert.alert("Thành công", "Tạo tài khoản thành công!", [
        { text: "Đăng nhập ngay", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tạo tài khoản.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

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

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Gắn hàm handleRegister vào nút Create */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create</Text>
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
  button: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
    width: "50%",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
