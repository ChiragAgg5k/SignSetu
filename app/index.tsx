import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CardContainer = ({ title, image, navigateTo }: { title: string, image: any, navigateTo: any }) => {

    return (
        <TouchableOpacity
            onPress={() => router.push(navigateTo)}
            style={styles.cardTouchable}
        >
            <Card style={styles.card}>
                <Image
                    source={image}
                    style={styles.cardImage}
                />
                <Heading size="md" style={styles.cardTitle}>
                    {title}
                </Heading>
            </Card>
        </TouchableOpacity>
    );
}

const Index = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Box style={styles.headerBox}>
                <Heading size="2xl" style={styles.mainHeading}>
                    Welcome to Gujarati Sign Language
                </Heading>
                <Text style={styles.subHeading}>
                    Learn Gujarati through Indian Sign Language
                </Text>
            </Box>

            <Heading size="md" style={styles.sectionHeading}>Alphabets & Numbers</Heading>
            <View style={styles.row}>
                <CardContainer
                    title="Alphabets"
                    image={require("@/assets/images/signs/alphabets.png")}
                    navigateTo="alphabets"
                />
                <CardContainer
                    title="Numbers"
                    image={require("@/assets/images/signs/numbers.png")}
                    navigateTo="numbers"
                />
            </View>

            <Heading size="md" style={styles.sectionHeading}>Words & Calculation</Heading>
            <View style={styles.row}>
                <CardContainer
                    title="Words"
                    image={require("@/assets/images/signs/words.png")}
                    navigateTo="WordsScreen"
                />
                <CardContainer
                    title="Calculation"
                    image={require("@/assets/images/signs/calculation.png")}
                    navigateTo="CalculationScreen"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: -20,
    },
    headerBox: {
        marginBottom: 24,
    },
    mainHeading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '600',
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cardTouchable: {
        flex: 1,
        marginHorizontal: 4,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
});

export default Index;