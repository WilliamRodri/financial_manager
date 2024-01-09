import { useEffect, useLayoutEffect } from "react";
import { Animated } from "react-native";
import { StyleSheet, View } from "react-native";

const SkeletonFinancial = ({ children, visible }: any) => {

    const AnimatedValue = new Animated.Value(0);

    useEffect(() => {
        circleAnimated();
        return () => circleAnimated();
    }, []);

    const circleAnimated = () => {
        AnimatedValue.setValue(0)
        Animated.timing(
            AnimatedValue,
            {
                toValue: 1,
                duration: 350,
                useNativeDriver: false
            }
        ).start(() => {
            setTimeout(() => {
                circleAnimated();
            }, 1000);
        });
    }

    const translateX = AnimatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [-10, 350]
    });

    if (visible) {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        backgroundColor: '#C3C3C3',
                        marginRight: 11.5,
                        height: 35,
                        width: '80%',
                        borderRadius: 5,
                        overflow: 'hidden',
                        marginBottom: 28,
                    }}
                >
                    <Animated.View
                        style={{
                            width: '30%',
                            height: '100%',
                            opacity: 0.2,
                            backgroundColor: 'white',
                            transform: [ { translateX: translateX } ]
                        }}
                    ></Animated.View>
                </View>
    
                <View style={{ marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.boxContainers}>
                            <Animated.View
                            style={{
                                width: '35%',
                                height: '200%',
                                opacity: 0.2,
                                backgroundColor: 'white',
                                transform: [ { translateX: translateX } ]
                            }}
                        ></Animated.View>
                        </View>
                        <View style={styles.boxContainers}>
                        <Animated.View
                            style={{
                                width: '35%',
                                height: '200%',
                                opacity: 0.2,
                                backgroundColor: 'white',
                                transform: [ { translateX: translateX } ]
                            }}
                        ></Animated.View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.boxContainers}>
                        <Animated.View
                            style={{
                                width: '35%',
                                height: '200%',
                                opacity: 0.2,
                                backgroundColor: 'white',
                                transform: [ { translateX: translateX } ]
                            }}
                        ></Animated.View>
                        </View>
                        <View style={styles.boxContainers}>
                        <Animated.View
                            style={{
                                width: '35%',
                                height: '200%',
                                opacity: 0.2,
                                backgroundColor: 'white',
                                transform: [ { translateX: translateX } ]
                            }}
                        ></Animated.View>
                        </View>
                    </View>
                </View>
    
                <View
                    style={{
                        marginTop: 5,
                        backgroundColor: '#C3C3C3',
                        marginRight: 11.5,
                        height: 35,
                        width: '80%',
                        borderRadius: 5,
                        overflow: 'hidden',
                        marginBottom: 28,
                    }}
                >
                    <Animated.View
                        style={{
                            width: '35%',
                            height: '200%',
                            opacity: 0.2,
                            backgroundColor: 'white',
                            transform: [ { translateX: translateX } ]
                        }}
                    ></Animated.View>
                </View>
                
                <View
                    style={styles.cards}
                >
                    <Animated.View
                        style={{
                            width: '30%',
                            height: '100%',
                            opacity: 0.2,
                            backgroundColor: 'white',
                            transform: [ { translateX: translateX } ]
                        }}
                    ></Animated.View>
                </View>
    
                <View
                    style={styles.cards}
                >
                    <Animated.View
                        style={{
                            width: '30%',
                            height: '100%',
                            opacity: 0.2,
                            backgroundColor: 'white',
                            transform: [ { translateX: translateX } ]
                        }}
                    ></Animated.View>
                </View>
    
                <View
                    style={styles.cards}
                >
                    <Animated.View
                        style={{
                            width: '30%',
                            height: '100%',
                            opacity: 0.2,
                            backgroundColor: 'white',
                            transform: [ { translateX: translateX } ]
                        }}
                    ></Animated.View>
                </View>
            </View>
        );  
    }
    return (
        <>
            {children}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    boxContainers: {
        backgroundColor: '#C3C3C3',
        flex: 1,
        justifyContent: 'center',
        borderWidth: 0,
        width: 181,
        height: 104,
        borderRadius: 24,
        padding: 5,
        marginRight: 11.5,
        marginTop: 8.5,
        marginBottom: 8.5,
        overflow: 'hidden',
    },
    cards: {
        marginTop: 5,
        backgroundColor: '#C3C3C3',
        marginRight: 11.5,
        height: 35,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 28,
    }
});

export default SkeletonFinancial;