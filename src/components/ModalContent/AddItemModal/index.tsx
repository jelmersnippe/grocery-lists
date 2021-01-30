import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './styles';
import QtyInput from '../../QtyInput';
import {TextInput, View} from 'react-native';
import Button from '../../Button';
import Text from '../../Text';
import {useTranslation} from 'react-i18next';
import {Props} from './props';
import theme from '../../../config/theme';

const AddItemModal: FunctionComponent<Props> = ({addAction}) => {
    const [inputQty, setInputQty] = useState(0);
    const [qtyError, setQtyError] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputError, setInputError] = useState(false);
    const [added, setAdded] = useState({name: '', qty: 0});

    const {t} = useTranslation('lists');

    useEffect(() => {
        if (added) {
            const unsubcribe = setTimeout(() => {
                setAdded({name: '', qty: 0});
            }, 2000);

            return () => clearTimeout(unsubcribe);
        }

        return;
    }, [added]);

    const addItem = () => {
        if (inputQty <= 0) {
            setQtyError(true);
        }

        if (inputName === '') {
            setInputError(true);
        }

        if (inputQty > 0 && inputName !== '') {
            addAction(inputName, inputQty);
            setAdded({name: inputName, qty: inputQty});
            setInputName('');
        }
    };

    return (
        <>
            {
                (!!added.name && !!added.qty) &&
                <View style={styles.addedContainer}>
                    <Text style={{color: theme.colors.white}}>{t('successfullyAdded', {item: added.name, qty: added.qty})}</Text>
                </View>
            }
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={t('itemName')}
                    style={[styles.addItemInput, inputError && {borderColor: theme.colors.red}]}
                    value={inputName}
                    onChangeText={(value) => {
                        setInputError(false);
                        setInputName(value);
                    }}
                    onSubmitEditing={() => addItem()}
                    blurOnSubmit={false}
                />
                <QtyInput
                    borderColor={qtyError ? theme.colors.red : theme.colors.black}
                    onChangeValue={(value) => {
                        setQtyError(false);
                        setInputQty(value);
                    }}
                />
            </View>
            {(qtyError || inputError) && <Text style={styles.errorText}>{t('emptyFields')}</Text>}
            <Button
                text={t('common:add')}
                onPress={() => addItem()}
            />
        </>
    );
};

export default AddItemModal;
