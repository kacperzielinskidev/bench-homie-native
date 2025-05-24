import { Image } from "expo-image";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { isAndroid } from "@/utils/device";

export default function HomeScreen() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFromApi = async () => {
    try {
      setError(null);
      const apiUrl = isAndroid()
        ? "http://192.168.0.139:5000/v1/plans"
        : "http://localhost:3001/";

      const response = await fetch(apiUrl);
      const data = await response.text();
      console.log("data", data);
      setApiResponse(data);
    } catch (err) {
      setError(
        "Failed to connect to API. Make sure your API is running and check console for details.",
      );
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      {/* API Test Section */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Test API Connection</ThemedText>
        <TouchableOpacity style={styles.button} onPress={fetchFromApi}>
          <ThemedText style={styles.buttonText}>Call Plans Endpoint</ThemedText>
        </TouchableOpacity>

        {apiResponse && (
          <ThemedView style={styles.responseContainer}>
            <ThemedText type="subtitle">API Response:</ThemedText>
            <ThemedText>{apiResponse}</ThemedText>
          </ThemedView>
        )}

        {error && (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    backgroundColor: "#0099cc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  responseContainer: {
    backgroundColor: "#e6f7ff",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  errorText: {
    color: "#d32f2f",
  },
});
