import {TextInput} from 'react-native';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import Button from '../Button';

const InputModal: FunctionComponent<Props> = ({onSubmit}) => {
    const inputRef = useRef<TextInput>(null);
    const [input, setInput] = useState('');

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, [inputRef]);

    return (
        <>
            <TextInput
                value={input}
                onChangeText={(value) => setInput(value)}
                style={styles.input}
                returnKeyType={'done'}
                onSubmitEditing={() => onSubmit(input)}
                placeholder={'New list'}
                ref={inputRef}
            />
            <Button
                text={'Create'}
                onPress={() => onSubmit(input)}
            />
        </>
    );
};

export default InputModal;
