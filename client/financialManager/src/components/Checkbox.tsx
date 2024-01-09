import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface opData {
    text: string,
    id: never
}

const CheckBox = ({ options=[], onChange }: any) => {
    const [selected, setSelected] = useState([]);

    function toggle(id: never) {
        let index = selected.findIndex((i) => i === id);
        let arraySelecteds = [...selected];
        if (index !== -1) {
            arraySelecteds.splice(index, 1);
        } else {
            arraySelecteds.push(id);
        }

        setSelected(arraySelecteds);
    }

    useEffect(() => onChange(selected), [selected]);
    return <View>
        {options.map((op: opData, index: any) => (
            <View style={styles.optionContainer} key={index}>
                <TouchableOpacity style={styles.touchable} onPress={() => toggle(op?.id)}>
                    {
                        selected.findIndex(i=> i === op.id) !== -1 ? <Icon name="check-bold" color={'#090937'} size={15} /> : null
                    }
                </TouchableOpacity>
                <Text style={styles.optext}>{op?.text}</Text>
            </View>
        ))}
    </View>
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    touchable: {
        height: 22,
        width: 22,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#090937',
        borderWidth: 2
    },
    optext: {
        marginLeft: 12,
        color: 'black',
        fontSize: 16,
    }
});

export default CheckBox;