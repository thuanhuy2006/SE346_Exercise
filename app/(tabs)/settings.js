import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const handleLogout = async () => {
    // Chỉ xóa phiên đăng nhập cục bộ
    await AsyncStorage.removeItem("currentUser");
    router.replace("/");
  };

  const handleResetData = () => {
    // Vì dùng API, ta không thể tự ý xóa toàn bộ database của Server được
    Alert.alert(
      "Không hỗ trợ",
      "Dữ liệu hiện đang được quản lý trên Server. Bạn không thể reset toàn bộ dữ liệu từ ứng dụng.",
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt hệ thống</Text>

      <TouchableOpacity
        style={[styles.button, styles.logoutBtn]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Đăng xuất tài khoản</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.resetBtn]}
        onPress={handleResetData}
      >
        <Text style={styles.buttonText}>Reset toàn bộ dữ liệu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutBtn: { backgroundColor: "#4285F4" },
  resetBtn: { backgroundColor: "#ea4335" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
