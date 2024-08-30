import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CardContainer = ({ title, image }: { title: string, image: any }) => {
    return <Card
        size="md" variant="outline" className="flex-1 mx-2 bg-white">
        <Image
            source={image}
            className="w-full h-40"
        />
        <Heading size="md" className="mb-1 text-center mt-4 ">
            {title}
        </Heading>
    </Card>
}

const Index = () => {
    return (
        <SafeAreaView style={{
            paddingTop: -35,
            paddingLeft: 15,
            paddingRight: 15,
        }}>
            <Box className="mb-6">
                <Heading size="2xl" className="text-left mt-4 mb-2">
                    Welcome to Inclusive Education
                </Heading>
                <Text
                    className="text-left font-semibold text-lg text-gray-700">
                    Learn Gujarati through Indian Sign Language
                </Text>
            </Box>


            <Heading size="md" className="text-left mb-2">Alphabets & Numbers</Heading>
            <View
                className="flex flex-row justify-between"
            >
                <CardContainer title="Alphabets" image={require("@/assets/images/signs/alphabets.png")} />
                <CardContainer title="Numbers" image={require("@/assets/images/signs/numbers.png")} />
            </View>

            <Heading size="md" className="text-left mt-6 mb-2">Words & Calculation</Heading>
            <View
                className="flex flex-row justify-between"
            >
                <CardContainer title="Words" image={require("@/assets/images/signs/words.png")} />
                <CardContainer title="Calculation" image={require("@/assets/images/signs/calculation.png")} />
            </View>

        </SafeAreaView>
    );
};

export default Index;
