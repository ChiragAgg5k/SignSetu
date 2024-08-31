import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import React, { useState } from "react";

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
import {
    CheckIcon,
    EyeIcon,
    EyeOffIcon
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const USERS = [
    {
        email: "gabrial@gmail.com",
        password: "Gabrial@123",
    },
    {
        email: "tom@gmail.com",
        password: "Tom@123",
    },
    {
        email: "thomas@gmail.com",
        password: "Thomas@1234",
    },
];

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(1, "Password is required"),
    rememberme: z.boolean().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const Index = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginSchemaType>();
    const toast = useToast();
    const [validated, setValidated] = useState({
        emailValid: true,
        passwordValid: true,
    });

    const onSubmit = (data: LoginSchemaType) => {
        const user = USERS.find((element) => element.email === data.email);
        if (user) {
            if (user.password !== data.password)
                setValidated({ emailValid: true, passwordValid: false });
            else {
                setValidated({ emailValid: true, passwordValid: true });
                toast.show({
                    placement: "bottom right",
                    render: ({ id }) => {
                        return (
                            <Toast nativeID={id} variant="solid" action="success">
                                <ToastTitle>Logged in successfully!</ToastTitle>
                            </Toast>
                        );
                    },
                });
                reset();
            }
        } else {
            setValidated({ emailValid: false, passwordValid: true });
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleState = () => {
        setShowPassword((showState) => {
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
                        <Heading className="md:text-center mb-2" size="3xl">
                            Sign in
                        </Heading>
                        <Text>Login to start using gluestack</Text>
                    </VStack>
                </VStack>
                <VStack className="w-full">
                    <VStack space="xl" className="w-full">
                        <FormControl
                            isInvalid={!!errors?.email || !validated.emailValid}
                            className="w-full"
                        >
                            <FormControlLabel>
                                <FormControlLabelText>Email</FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                defaultValue=""
                                name="email"
                                control={control}
                                rules={{
                                    validate: async (value) => {
                                        try {
                                            await loginSchema.parseAsync({ email: value });
                                            return true;
                                        } catch (error: any) {
                                            return error.message;
                                        }
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input>
                                        <InputField
                                            placeholder="Enter email"
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
                                <FormControlErrorIcon as={AlertTriangle} />
                                <FormControlErrorText>
                                    {errors?.email?.message ||
                                        (!validated.emailValid && "Email ID not found")}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        {/* Label Message */}
                        <FormControl
                            isInvalid={!!errors.password || !validated.passwordValid}
                            className="w-full"
                        >
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
                                            await loginSchema.parseAsync({ password: value });
                                            return true;
                                        } catch (error: any) {
                                            return error.message;
                                        }
                                    },
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input>
                                        <InputField
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            onSubmitEditing={handleKeyPress}
                                            returnKeyType="done"
                                        />
                                        <InputSlot onPress={handleState} className="pr-3">
                                            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                                        </InputSlot>
                                    </Input>
                                )}
                            />
                            <FormControlError>
                                <FormControlErrorIcon as={AlertTriangle} />
                                <FormControlErrorText>
                                    {errors?.password?.message ||
                                        (!validated.passwordValid && "Password was incorrect")}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <HStack className="w-full justify-between ">
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
                                        <CheckboxLabel>Remember me</CheckboxLabel>
                                    </Checkbox>
                                )}
                            />
                            <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                                Forgot Password?
                            </LinkText>
                        </HStack>
                    </VStack>
                    <VStack className="w-full my-7 " space="lg">
                        <Button className="w-full" onPress={handleSubmit(onSubmit)}>
                            <ButtonText className="font-medium">Log in</ButtonText>
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
                            {/* <ButtonIcon as={GoogleIcon} /> */}
                        </Button>
                    </VStack>
                    <HStack className="self-center ">
                        <Text size="md">Don't have an account?</Text>
                        <LinkText
                            className="font-medium text-primary-700 ml-1 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
                            size="md"
                        >
                            Sign up
                        </LinkText>
                    </HStack>
                </VStack>
            </VStack>
        </SafeAreaView >
    );
};

export default Index;