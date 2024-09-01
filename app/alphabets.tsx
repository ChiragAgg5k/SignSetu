import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Index = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [prediction, setPrediction] = useState('');
    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        if (permission?.granted) {
            startProcessing();
        }
    }, [permission]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission}>
                    <ButtonText>
                        Grant Permission
                    </ButtonText>
                </Button>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function captureFrame() {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.5,
                    base64: true,
                });

                if (!photo) {
                    return null;
                }

                return photo.base64;
            } catch (error) {
                console.log(error);
            }
        }
        return null;
    }

    async function sendFrameForPrediction(base64Image: string) {
        try {
            const response = await fetch("https://sih.rachitkhurana.tech/predict", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: base64Image })
            });

            const result = await response.json();
            return result.result || "No hand detected";
        } catch (error) {
            console.error("Error sending frame for prediction:", error);
            return "Error processing image";
        }
    }

    async function processFrame() {
        let base64Image = await captureFrame();
        base64Image = base64Image?.replace("data:image/png;base64,", '');
        if (base64Image) {
            const result = await sendFrameForPrediction(base64Image);

            if (result.toLowerCase().includes("error")) {
                return;
            }

            setPrediction(result);
        }
    }

    async function startProcessing() {
        while (true) {
            const timeStamp = new Date().getTime();
            processFrame();
            await new Promise(resolve => setTimeout(resolve, 500));
            const timeTaken = new Date().getTime() - timeStamp;
            console.log("Frame time:", timeTaken);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} animateShutter={false}>
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} onPress={toggleCameraFacing}>
                        <ButtonText>Flip Camera</ButtonText>
                    </Button>
                </View>
            </CameraView>
            <Box
                className='flex flex-row pt-8 items-center justify-center'
            >
                <Text
                    className='text-xl pr-2'
                >
                    Alphabet Recognized:
                </Text>
                <Text
                    className='text-xl font-bold'
                >
                    {prediction}
                </Text>
            </Box>
        </SafeAreaView>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: -25,
        padding: 20,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
