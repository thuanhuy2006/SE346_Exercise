import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "./database";

export default function Layout() {
  useEffect(() => {
    initDB().catch(console.error);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="setup-profile" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
