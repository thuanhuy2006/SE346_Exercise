import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function ProfileScreen() {
  const params = useLocalSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(params.email || "");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");

  // 1. Hàm này tự động chạy khi màn hình Profile được mở ra
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userEmail = params.email || email;
        if (!userEmail) return; // Nếu không có email thì không tải gì cả

        // Tìm dữ liệu đã lưu với chìa khóa là email của người dùng
        const storedProfile = await AsyncStorage.getItem(
          `profile_${userEmail}`,
        );

        if (storedProfile !== null) {
          // Nếu có dữ liệu cũ, tiến hành giải mã JSON và điền vào các ô
          const parsedData = JSON.parse(storedProfile);
          setName(parsedData.name || "");
          setEmail(parsedData.email || userEmail);
          setAddress(parsedData.address || "");
          setAvatarUrl(parsedData.avatarUrl || "");
          setDescription(parsedData.description || "");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu: ", error);
      }
    };

    loadProfileData();
  }, [params.email]); // Chạy lại hàm này nếu params.email thay đổi

  // 2. Hàm xử lý khi ấn nút Save
  const handleSave = async () => {
    try {
      if (!email) {
        Alert.alert("Lỗi", "Cần có email để lưu thông tin!");
        return;
      }

      // Gom tất cả thông tin lại thành 1 đối tượng
      const profileData = {
        name,
        email,
        address,
        avatarUrl,
        description,
      };

      // Biến đối tượng thành chuỗi JSON và lưu vào AsyncStorage
      await AsyncStorage.setItem(
        `profile_${email}`,
        JSON.stringify(profileData),
      );

      // Hiển thị thông báo cho người dùng biết đã lưu thành công
      Alert.alert("Thành công", "Đã lưu thông tin hồ sơ của bạn!");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu: ", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu thông tin.");
    }
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
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* 3. Gắn hàm handleSave vào sự kiện onPress của nút Save */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: "#fff" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 40,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, marginBottom: 5, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#000", padding: 10, borderRadius: 4 },
  textArea: { height: 80, textAlignVertical: "top" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
