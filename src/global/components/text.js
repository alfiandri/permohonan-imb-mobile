import React from 'react';
import {Text} from 'react-native';
import {COLORS, FONTS} from '../styles';
import {useIsFocused} from '@react-navigation/core';

export default ({font, weight, size, color = 'black', align, children, style}) => {
    const isFocus = useIsFocused();

    const textStyle = [
        {
            fontFamily: FONTS[font]
                ? FONTS[font][weight]
                    ? FONTS[font][weight]
                    : FONTS[font]?.medium
                : FONTS.primary[weight]
                ? FONTS.primary[weight]
                : FONTS.primary?.medium,
            fontSize: typeof size === 'string' || typeof size === 'number' ? parseInt(size, 10) : 16,
            color: COLORS[color] ?? color,
            textAlign: align,
        },
        style,
    ];

    return (
        isFocus && (
            <>
                <Text style={[textStyle, style]}>{children}</Text>
            </>
        )
    );
};
