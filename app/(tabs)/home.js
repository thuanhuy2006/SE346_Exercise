import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createPost, getAllPosts } from "../database";

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
      if (email) setCurrentEmail(email);
      const dbPosts = await getAllPosts();
      setPosts(dbPosts);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePost = async () => {
    if (!title || !content) return;
    try {
      await createPost(
        title,
        content,
        currentEmail,
        new Date().toLocaleString(),
      );
      setTitle("");
      setContent("");
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        {item.authorAvatar ? (
          <Image source={{ uri: item.authorAvatar }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text>👤</Text>
          </View>
        )}
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>
            {item.authorName || "Anonymous"}
          </Text>
          <Text style={styles.authorEmail}>{item.authorEmail}</Text>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
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
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  authorInfo: { flex: 1 },
  authorName: { fontWeight: "bold", fontSize: 14 },
  authorEmail: { color: "gray", fontSize: 12 },
  timestamp: { color: "gray", fontSize: 10 },
  postTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  postContent: { fontSize: 14, color: "#444" },
});
