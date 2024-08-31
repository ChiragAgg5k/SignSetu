import { Button, ButtonText } from "@/components/ui/button";
import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const LanguageToggle = () => {
    const { language, changeLanguage } = useContext(LanguageContext);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'gu' : 'en';
        changeLanguage(newLanguage);
    };

    return (

        <Button
            size='sm'
            variant='solid'
            action='primary'
            onPress={toggleLanguage}
        >
            <ButtonText>
                {language === 'en' ? 'Switch to Gujarati' : 'Switch to English'}
            </ButtonText>
        </Button>
    );
};

export default LanguageToggle;