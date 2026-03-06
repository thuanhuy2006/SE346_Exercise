import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// Dùng useRouter của chuẩn mới để chuyển trang
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter(); // Khai báo lệnh điều hướng

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Login</Text>

      <Text style={styles.label}>Email/Username</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} secureTextEntry={true} />

      <Text style={styles.forgotPassword}>Forgot password?</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      {/* Lệnh chuyển sang file register */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.linkText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 32,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 40,
    fontFamily: "monospace",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 48,
  },
  label: {
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#000",
    paddingHorizontal: 12,
    marginBottom: 16,
    fontFamily: "monospace",
  },
  forgotPassword: {
    fontFamily: "monospace",
    fontSize: 12,
    marginBottom: 48,
  },
  button: {
    borderWidth: 1.5,
    borderColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 18,
  },
  linkText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginTop: 48,
    textDecorationLine: "underline",
  },
});
