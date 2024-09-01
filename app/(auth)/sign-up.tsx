import { Button, ButtonText } from "@/components/ui/button";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from "@/components/ui/checkbox";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
    CheckIcon,
    EyeIcon,
    EyeOffIcon
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const signUpSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
    password: z
        .string()
        .min(6, "Must be at least 8 characters in length")
        .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
        .regex(new RegExp(".*[a-z].*"), "One lowercase character")
        .regex(new RegExp(".*\\d.*"), "One number")
        .regex(
            new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
            "One special character"
        ),
    confirmpassword: z
        .string()
        .min(6, "Must be at least 8 characters in length")
        .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
        .regex(new RegExp(".*[a-z].*"), "One lowercase character")
        .regex(new RegExp(".*\\d.*"), "One number")
        .regex(
            new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
            "One special character"
        ),
    rememberme: z.boolean().optional(),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

const Index = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignUpSchemaType>();
    const toast = useToast();

    const onSubmit = (data: SignUpSchemaType) => {
        if (data.password === data.confirmpassword) {
            toast.show({
                placement: "bottom right",
                render: ({ id }) => {
                    return (
                        <Toast nativeID={id} variant="solid" action="success">
                            <ToastTitle>Success</ToastTitle>
                        </Toast>
                    );
                },
            });
            reset();
        } else {
            toast.show({
                placement: "bottom right",
                render: ({ id }) => {
                    return (
                        <Toast nativeID={id} variant="solid" action="error">
                            <ToastTitle>Passwords do not match</ToastTitle>
                        </Toast>
                    );
                },
            });
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };
    const handleConfirmPwState = () => {
        setShowConfirmPassword((showState) => {
            return !showState;
        });
    };
    const handleKeyPress = () => {
        Keyboard.dismiss();
        handleSubmit(onSubmit)();
    };
    const router = useRouter();
    return (
        <SafeAreaView
            style={
                {
                    padding: 20,
                }
            }
        >
            <VStack className="max-w-[440px] w-full" space="md">
                <VStack className="md:items-center" space="md">
                    <VStack>
                        <Heading className="md:text-center" size="3xl">
                            Sign up
                        </Heading>
                        <Text>Sign up and start using gluestack</Text>
                    </VStack>
                </VStack>
                <VStack className="w-full">
                    <VStack space="xl" className="w-full">
                        <FormControl isInvalid={!!errors.email}>
                            <FormControlLabel>
                                <FormControlLabelText>Email</FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                name="email"
                                defaultValue=""
                                control={control}
                                rules={{
                                    validate: async (value) => {
                                        try {
                                            await signUpSchema.parseAsync({ email: value });
                                            return true;
                                        } catch (error: any) {
                                            return error.message;
                                        }
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input>
                                        <InputField
                                            className="text-sm"
                                            placeholder="Email"
                                            type="text"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            onSubmitEditing={handleKeyPress}
                                            returnKeyType="done"
                                        />
                                    </Input>
                                )}
                            />
                            <FormControlError>
                                <FormControlErrorIcon size="md" as={AlertTriangle} />
                                <FormControlErrorText>
                                    {errors?.email?.message}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <FormControlLabel>
                                <FormControlLabelText>Password</FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                defaultValue=""
                                name="password"
                                control={control}
                                rules={{
                                    validate: async (value) => {
                                        try {
                                            await signUpSchema.parseAsync({
                                                password: value,
                                            });
                                            return true;
                                        } catch (error: any) {
                                            return error.message;
                                        }
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input>
                                        <InputField
                                            className="text-sm"
                                            placeholder="Password"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            onSubmitEditing={handleKeyPress}
                                            returnKeyType="done"
                                            type={showPassword ? "text" : "password"}
                                        />
                                        <InputSlot onPress={handleState} className="pr-3">
                                            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                                        </InputSlot>
                                    </Input>
                                )}
                            />
                            <FormControlError>
                                <FormControlErrorIcon size="sm" as={AlertTriangle} />
                                <FormControlErrorText>
                                    {errors?.password?.message}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl isInvalid={!!errors.confirmpassword}>
                            <FormControlLabel>
                                <FormControlLabelText>Confirm Password</FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                defaultValue=""
                                name="confirmpassword"
                                control={control}
                                rules={{
                                    validate: async (value) => {
                                        try {
                                            await signUpSchema.parseAsync({
                                                password: value,
                                            });
                                            return true;
                                        } catch (error: any) {
                                            return error.message;
                                        }
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input>
                                        <InputField
                                            placeholder="Confirm Password"
                                            className="text-sm"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            onSubmitEditing={handleKeyPress}
                                            returnKeyType="done"
                                            type={showConfirmPassword ? "text" : "password"}
                                        />

                                        <InputSlot onPress={handleConfirmPwState} className="pr-3">
                                            <InputIcon
                                                as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                                            />
                                        </InputSlot>
                                    </Input>
                                )}
                            />
                            <FormControlError>
                                <FormControlErrorIcon size="sm" as={AlertTriangle} />
                                <FormControlErrorText>
                                    {errors?.confirmpassword?.message}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <Controller
                            name="rememberme"
                            defaultValue={false}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Checkbox
                                    size="sm"
                                    value="Remember me"
                                    isChecked={value}
                                    onChange={onChange}
                                    aria-label="Remember me"
                                >
                                    <CheckboxIndicator>
                                        <CheckboxIcon as={CheckIcon} />
                                    </CheckboxIndicator>
                                    <CheckboxLabel>
                                        I accept the Terms of Use & Privacy Policy
                                    </CheckboxLabel>
                                </Checkbox>
                            )}
                        />
                    </VStack>

                    <VStack className="w-full my-7" space="lg">
                        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
                            <ButtonText className="font-medium">Sign up</ButtonText>
                        </Button>
                        <Button
                            variant="outline"
                            action="secondary"
                            className="w-full gap-1"
                            onPress={() => { }}
                        >
                            <ButtonText className="font-medium">
                                Continue with Google
                            </ButtonText>
                        </Button>
                    </VStack>
                    <HStack className="self-center">
                        <Text size="md">Already have an account?</Text>
                        <LinkText
                            className="font-medium text-primary-700 ml-1 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
                            size="md"
                        >
                            Login
                        </LinkText>
                    </HStack>
                </VStack>
            </VStack>
        </SafeAreaView>
    );
};

export default Index;
