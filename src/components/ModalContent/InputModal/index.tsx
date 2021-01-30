import {TextInput} from 'react-native';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Props} from './props';
import styles from './styles';
import CustomButton from '../../Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../config/theme';
import {Button} from 'react-native-elements';
import {useTranslation} from 'react-i18next';

const InputModal: FunctionComponent<Props> = ({defaultValue, buttonLabel, placeholder, onSubmit, deleteAction}) => {
    const inputRef = useRef<TextInput>(null);
    const [input, setInput] = useState(defaultValue ?? '');
    const {t} = useTranslation('lists');

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, [inputRef]);

    return (
        <>
            {
                deleteAction &&
                <Button
                    title={t('common:delete')}
                    onPress={() => deleteAction()}
                    icon={<Icon name={'delete'} color={theme.colors.red} size={24}/>}
                    type={'outline'}
                    iconRight={true}
                    containerStyle={styles.deleteButtonContainer}
                    buttonStyle={styles.deleteButtonButton}
                    titleStyle={styles.deleteButtonTitle}
                />
            }
            <TextInput
                value={input}
                onChangeText={(value) => setInput(value)}
                style={styles.input}
                returnKeyType={'done'}
                onSubmitEditing={() => onSubmit(input)}
                placeholder={placeholder ?? ''}
                ref={inputRef}
            />
            <CustomButton
                text={buttonLabel}
                onPress={() => onSubmit(input)}
            />
        </>
    );
};

export default InputModal;
