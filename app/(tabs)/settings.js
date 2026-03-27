import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const handleLogout = async () => {
    // Xóa cờ đánh dấu user đang đăng nhập hiện tại
    await AsyncStorage.removeItem("currentUser");
    router.replace("/");
  };

  const handleResetData = async () => {
    Alert.alert(
      "Cảnh báo",
      "Hành động này sẽ xóa toàn bộ dữ liệu tài khoản và bài đăng. Bạn có chắc chắn?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa toàn bộ",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            router.replace("/");
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: "#fff",
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
