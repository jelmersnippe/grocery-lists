import {TextInput} from 'react-native';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import Button from '../../Button';

const InputModal: FunctionComponent<Props> = ({defaultValue, buttonLabel, placeholder, onSubmit}) => {
    const inputRef = useRef<TextInput>(null);
    const [input, setInput] = useState(defaultValue ?? '');

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
                placeholder={placeholder ?? ''}
                ref={inputRef}
            />
            <Button
                text={buttonLabel}
                onPress={() => onSubmit(input)}
            />
        </>
    );
};

export default InputModal;
