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
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { useRouter } from "expo-router";
import { Image } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
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
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
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
                <Button onPress={() => router.push("/sign-in")}>
                  <ButtonText>
                    Sign In
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
            <Stack.Screen name="(auth)"
              options={{
                headerShown: false
              }}
            />
          </Stack>
        </ThemeProvider></GluestackUIProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}