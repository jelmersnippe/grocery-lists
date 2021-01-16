import {TextInput, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const QtyInput: FunctionComponent<Props> = ({onChangeValue}) => {
    const [qty, setQty] = useState('0');

    const decrementQty = () => {
        const updatedQty = Number(qty) - 1;
        if (isNaN(updatedQty) || updatedQty < 0) {
            return;
        } else {
            setQty(updatedQty.toString());
            onChangeValue(updatedQty);
        }
    };

    const incrementQty = () => {
        const updatedQty = Number(qty) + 1;
        if (isNaN(updatedQty) || updatedQty < 0) {
            return;
        } else {
            setQty(updatedQty.toString());
            onChangeValue(updatedQty);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => decrementQty()}
                disabled={isNaN(Number(qty)) || Number(qty) <= 0}
            >
                <Icon name={'remove'} size={32} color={'black'}/>
            </TouchableOpacity>
            <TextInput
                keyboardType={'numeric'}
                placeholder={'Qty'}
                style={styles.input}
                value={qty}
                onChangeText={(value) => {
                    setQty(value);
                    const updatedQty = Number(value);
                    if (!isNaN(updatedQty)) {
                        onChangeValue(updatedQty);
                    }
                }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => incrementQty()}
                disabled={isNaN(Number(qty))}
            >
                <Icon name={'add'} size={32} color={'black'}/>
            </TouchableOpacity>
        </View>
    );
};

export default QtyInput;
