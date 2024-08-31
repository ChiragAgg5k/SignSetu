import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

type LanguageContextType = {
    language: string;
    changeLanguage: (newLanguage: string) => Promise<void>;
    translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    changeLanguage: async () => { },
    translate: (key) => key,
});

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState<{ [key: string]: string }>({});

    const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
    const API_URL = 'https://translation.googleapis.com/language/translate/v2';

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('language');
            if (savedLanguage) {
                setLanguage(savedLanguage);
                if (savedLanguage !== 'en') {
                    await loadTranslations(savedLanguage);
                }
            }
        } catch (error) {
            console.error('Error loading language:', error);
        }
    };

    const changeLanguage = async (newLanguage: string) => {
        try {
            await AsyncStorage.setItem('language', newLanguage);
            setLanguage(newLanguage);
            if (newLanguage !== 'en') {
                await loadTranslations(newLanguage);
            } else {
                setTranslations({});
            }
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    const loadTranslations = async (targetLanguage: string) => {
        try {
            const response = await axios.post(
                `${API_URL}?key=${API_KEY}`,
                {
                    q: Object.keys(translations),
                    target: targetLanguage,
                }
            );

            const newTranslations: { [key: string]: string } = {};
            response.data.data.translations.forEach((translation: any, index: number) => {
                newTranslations[Object.keys(translations)[index]] = translation.translatedText;
            });

            setTranslations(newTranslations);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    };

    const translate = (key: string) => {
        return translations[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext, LanguageProvider };
