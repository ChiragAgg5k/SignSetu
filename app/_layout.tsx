import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Button, ButtonText } from "@/components/ui/button";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode={(colorScheme ?? "light") as "light" | "dark"}><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{
          title: "Sign-Setu",
          headerLeft: () => (
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 40, height: 40, marginRight: 5 }}
            />
          ),
          headerRight: () => (
            <Button>
              <ButtonText>
                Switch To Gujarati
              </ButtonText>
            </Button>
          )
        }} />
        <Stack.Screen name="alphabets" options={{
          title: "Alphabets"
        }} />
        <Stack.Screen name="numbers" options={{
          title: "Numbers"
        }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider></GluestackUIProvider>
  );
}