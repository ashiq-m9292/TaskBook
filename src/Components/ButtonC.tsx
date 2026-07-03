import React from 'react';
import { Button } from 'react-native-paper';

const ButtonC = ({ title, mode, buttonStyle, rippleColor, textColor, loading, disabled, icon, onPress, lableStyle }: any) => {
    return (
        <Button
            mode={mode}
            style={buttonStyle}
            rippleColor={rippleColor}
            textColor={textColor}
            loading={loading}
            disabled={disabled}
            icon={icon}
            onPress={onPress}
            labelStyle={lableStyle}
        >
            {title}
        </Button>
    );
}

export default ButtonC;
