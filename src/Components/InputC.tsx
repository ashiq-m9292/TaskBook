import React from 'react';
import { TextInput } from 'react-native-paper';

const InputC = ({ ref, label, placeholder, mode, value, onChangeText, onBlur, error, onPress, autoFocus, onSubmitEditing, multiline, inputStyle }: any) => {
    return (
        <TextInput
            ref={ref}
            mode={mode}
            label={label}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onPress={onPress}
            error={error}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            style={inputStyle}
        />
    );
}

export default InputC;
