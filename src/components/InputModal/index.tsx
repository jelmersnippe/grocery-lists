import {TextInput} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import Button from '../Button';

const InputModal: FunctionComponent<Props> = ({onSubmit}) => {
    const [input, setInput] = useState('');

    return (
        <>
            <TextInput
                value={input}
                onChangeText={(value) => setInput(value)}
                style={styles.input}
                returnKeyType={'done'}
                onSubmitEditing={() => onSubmit(input)}
                placeholder={'New list'}
                autoFocus={true}
            />
            <Button
                text={'Create'}
                onPress={() => onSubmit(input)}
            />
        </>
    );
};

export default InputModal;
