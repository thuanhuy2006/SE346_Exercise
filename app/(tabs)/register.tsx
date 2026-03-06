import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Register</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} secureTextEntry={true} />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput style={styles.input} secureTextEntry={true} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>

      {/* Lệnh quay lại màn hình trước đó */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Already have an account? Login here</Text>
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
    marginBottom: 32,
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
  button: {
    borderWidth: 1.5,
    borderColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 16,
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
    marginTop: 32,
    textDecorationLine: "underline",
  },
});
