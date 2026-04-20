import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { apiCreatePost, apiDeletePost, apiGetAllPosts } from "../api";

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      const email = await AsyncStorage.getItem("currentUser");
      setCurrentEmail(email);

      // Gọi API lấy bài viết
      const dbPosts = await apiGetAllPosts();
      setPosts(dbPosts);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePost = async () => {
    if (!title || !content) return;
    try {
      // API yêu cầu trường description (tương đương với content của bạn)
      await apiCreatePost(title, content, currentEmail);
      setTitle("");
      setContent("");
      loadData(); // Tải lại danh sách
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đăng bài");
    }
  };

  const handleDelete = async (postId) => {
    try {
      await apiDeletePost(postId);
      loadData();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xóa");
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          {/* API có trả về creator_email */}
          <Text style={styles.authorEmail}>{item.creator_email}</Text>
        </View>
        {/* Nút xóa bài (Chỉ hiện nếu đúng là bài của người đang đăng nhập) */}
        {currentEmail === item.creator_email && (
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={{ color: "red" }}>Xóa</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      {/* Trong API, nội dung bài viết nằm ở biến 'description' */}
      <Text style={styles.postContent}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.createPostCard}>
        <Text style={styles.cardTitle}>Create a new post</Text>
        <TextInput
          style={styles.input}
          placeholder="Post title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What do you want to share?"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ... Giữ styles như cũ ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 15 },
  createPostCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  postButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  postButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  authorInfo: { flex: 1 },
  authorName: { fontWeight: "bold", fontSize: 14 },
  authorEmail: { color: "gray", fontSize: 12 },
  timestamp: { color: "gray", fontSize: 10 },
  postTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  postContent: { fontSize: 14, color: "#444" },
});
