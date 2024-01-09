import { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

const SkeletonExpense = ({ children, visible }: any) => {

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
    
                <View
                        style={{
                            backgroundColor: '#C3C3C3',
                            marginRight: 11.5,
                            height: 45,
                            width: '100%',
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
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    cards: {
        marginTop: 5,
        backgroundColor: '#C3C3C3',
        height: 40,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 28,
    }
});

export default SkeletonExpense;