import React, {FunctionComponent, useState} from 'react';
import styles from './styles';
import QtyInput from '../../QtyInput';
import {TextInput, View} from 'react-native';
import Button from '../../Button';
import {useTranslation} from 'react-i18next';
import {Props} from './props';

const AddItemModal: FunctionComponent<Props> = ({addAction}) => {
    const [inputQty, setInputQty] = useState(0);
    const [inputName, setInputName] = useState('');

    const {t} = useTranslation('lists');

    const addItem = () => {
        if (inputQty > 0 && inputName !== '') {
            addAction(inputName, inputQty);
            setInputName('');
        }
    };

    return (
        <>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <TextInput
                    placeholder={t('itemName')}
                    style={styles.addItemInput}
                    value={inputName}
                    onChangeText={(value) => setInputName(value)}
                    onSubmitEditing={() => addItem()}
                    blurOnSubmit={false}
                />
                <QtyInput onChangeValue={(value) => setInputQty(value)}/>
            </View>
            <Button
                text={t('common:add')}
                onPress={() => addItem()}
            />
        </>
    );
};

export default AddItemModal;
