import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { screenHeight } from '../../helper/utils';
import _ from '../styles';

export default forwardRef(
    /**
     *
     * @param {Object} props
     * @param {String} [props.placeholder]
     * @param {Function} [props.onShow]
     * @param {Function} [props.onClose]
     * @param {{}} [props.style]
     * @param {Array} [props.supportedOrientations]
     * @param {Boolean} [props.disableScrollView = false]
     */
    (
        {
            placeholder,
            onShow = () => {},
            onClose = () => {},
            supportedOrientations = ['portrait', 'landscape'],
            children,
            disableScrollView = false,
            style,
        },
        ref,
    ) => {
        const [visible, setVisible] = useState(false);
        const [contentHeight, setContentHeight] = useState(0);

        const maxHeight = screenHeight * 0.85;
        const translateY = useSharedValue(maxHeight);

        useImperativeHandle(ref, () => ({
            show,
            close,
        }));

        useEffect(() => {
            try {
                if (visible) {
                    translateY.value = withSpring(0, {damping: 20, mass: 0.5}, (finished) => {
                        if (finished) {
                            runOnJS(setVisible)(true);
                        }
                    });
                } else {
                    onClose();
                }
            } catch (error) {
                console.log('modal failed ', error);
            }
        }, [visible]);

        const show = () => {
            setVisible(true);
            onShow();
        };

        const close = () => {
            translateY.value = withSpring(maxHeight, {damping: 20, mass: 0.5}, (finished) => {
                if (finished) {
                    runOnJS(setVisible)(false);
                }
            });
        };

        const swipeVideoHandler = useAnimatedGestureHandler({
            onStart: (event, ctx) => {
                ctx.startY = translateY.value;
            },
            onActive: (event, ctx) => {
                if (ctx.startY + event.translationY >= 0) {
                    translateY.value = ctx.startY + event.translationY;
                }
            },
            onEnd: (event, ctx) => {
                console.log({content: contentHeight / 2, contentHeight});
                if (ctx.startY + event.translationY >= 100) {
                    translateY.value = withSpring(maxHeight, {damping: 20, mass: 0.5}, (finished) => {
                        if (finished) {
                            runOnJS(setVisible)(false);
                        }
                    });
                } else {
                    translateY.value = withSpring(0, {damping: 20, mass: 0.5});
                }
            },
        });

        return (
            <Modal visible={visible} animationType="none" statusBarTranslucent transparent onRequestClose={close}>
                <TouchableWithoutFeedback onPress={close}>
                    <View style={[_.flex, _.bgColor('#00000050')]} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[
                        _.absoluteBottom,
                        _.absoluteFullWidth,
                        _.bgColor('white'),
                        _.pb_4,
                        {maxHeight, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden'},
                        useAnimatedStyle(() => {
                            return {transform: [{translateY: translateY.value}]};
                        }),
                    ]}
                    onLayout={({
                        nativeEvent: {
                            layout: {height},
                        },
                    }) => {
                        if (height > contentHeight) {
                            setContentHeight(height);
                        }
                    }}>
                    <PanGestureHandler onGestureEvent={swipeVideoHandler}>
                        <Animated.View style={[_.width('100%'), {minHeight: 40}]}>
                            <View style={[_.width(50), _.height(4), _.radius(10), _.selfCenter, _.mv_1, _.bgColor('greyDark')]} />
                        </Animated.View>
                    </PanGestureHandler>
                    {!disableScrollView ? <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView> : <View>{children}</View>}
                    <SafeAreaView />
                </Animated.View>
            </Modal>
        );
    },
);
