import { Heading } from "@/components/ui/heading";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
    return (
        <SafeAreaView className="md:flex flex-col items-center justify-center md:w-full h-full">

            <Heading size="2xl"
                className="text-left px-4"
            >
                Welcome to Inclusive Education
            </Heading>
            <Text
                className="text-left p-4 text-lg"
            >
                Learn Gujarati through Indian Sign Language
            </Text>
        </SafeAreaView>
    );
};

export default index;