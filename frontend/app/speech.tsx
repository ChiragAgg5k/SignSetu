import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const [translation, setTranslation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<{
        character: string;
        image: string; // base64
    }[]>([]);

    async function handleConvert() {
        setIsLoading(true);
        try {
            const response = await fetch("https://tti.rachitkhurana.tech/display", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: translation }),
            });

            if (response.ok) {
                // try {
                //     const blob = await response.blob();
                //     const reader = new FileReader();
                //     reader.onload = () => {
                //         const base64data = reader.result as string;
                //         if (typeof base64data === 'string') {
                //             setGifBase64(base64data);
                //             console.log("Gif base64:", base64data);
                //         }
                //         setIsLoading(false);
                //     };
                //     reader.readAsDataURL(blob);
                // } catch (error) {
                const data = await response.json();
                const images = data.images;
                setImages(images);

                setIsLoading(false);
                // }
            } else {
                console.log("Error in response:", response.status);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error:", error);
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flex: 0, marginBottom: 20 }}
            >
                <View
                    style={{
                        paddingHorizontal: 15,
                        paddingTop: 20,
                    }}
                >
                    <Textarea size="md" isReadOnly={false} isInvalid={false} isDisabled={false} className="w-full" style={{
                        marginBottom: 20,
                        position: "relative",
                    }}>
                        <TextareaInput
                            value={translation}
                            onChangeText={setTranslation}
                            placeholder="Please enter your text here..."
                        />
                        {/* <Icon
                        style={{
                            position: "absolute",
                            right: 20,
                            top: 40,
                        }}
                        size="xl"
                        as={PlayIcon} /> */}
                    </Textarea>

                    <Button onPress={handleConvert} disabled={isLoading}>
                        <ButtonText>
                            {isLoading ? "Converting..." : "Convert to Sign Language"}
                        </ButtonText>
                    </Button>

                    <Box
                        style={{
                            marginTop: 20,
                        }}
                        className="flex flex-col items-start justify-start w-full"
                    >
                        <Text className="text-left">
                            Translation:
                        </Text>
                        {/* {gifBase64 && (
                        <Image
                            source={{ uri: gifBase64 }}
                            style={{ width: '100%', height: 200, marginTop: 10 }}
                            resizeMode="contain"
                        />
                    )} */}
                        {
                            images.map((image) => (
                                <Image
                                    key={image.character}
                                    source={{ uri: `data:image/gif;base64,${image.image}` }}
                                    style={{ width: '100%', height: 200, marginTop: 10 }}
                                    resizeMode="contain"
                                />
                            ))
                        }
                    </Box>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Index;