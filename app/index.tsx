import { Heading } from "@/components/ui/heading";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";

const Card = ({ title, image }) => (
  <TouchableOpacity className="bg-gray-100 rounded-lg p-4 m-2 flex-1">
    <Image
      source={image}
      style={{ height: 100, width: "100%", resizeMode: "contain" }}
    />
    <Text className="text-center mt-2 text-lg font-semibold">{title}</Text>
  </TouchableOpacity>
);

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Box className="px-4">
        <Heading size="2xl" className="text-left mt-4">
          Welcome to Inclusive Education
        </Heading>
        <Text className="text-left p-4 text-lg text-gray-700">
          Learn Gujarati through Indian Sign Language
        </Text>
      </Box>

      <Box className=" px-4">
        <Box className="">
          <Card title="Alphabets" image={require("@/assets/images/icon.png")} />
          <Card title="Numbers" image={require("@/assets/images/icon.png")} />
        </Box>
        <Box className="">
          <Card title="Words" image={require("@/assets/images/icon.png")} />
          <Card title="Sentences" image={require("@/assets/images/icon.png")} />
        </Box>
        <Box className="">
          <Card title="Tables" image={require("@/assets/images/icon.png")} />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Index;
