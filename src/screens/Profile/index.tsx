import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import Button from '../../components/Button';
import Text from '../../components/Text';
import {setUser} from '../../reducers/user/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {useTranslation} from 'react-i18next';
import {updateFirestoreUser} from '../../firestore/userActions';
import {Picker} from '@react-native-picker/picker';
import {LANGUAGES} from '../../reducers/settings/types';
import {setLanguage} from '../../reducers/settings/actions';
import CustomHeader from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';

const Profile: FunctionComponent<Props> = ({}) => {
    const dispatch = useDispatch();
    const user = useSelector((rootState: RootState) => rootState.user);
    const settings = useSelector((rootState: RootState) => rootState.settings);
    const [nameInput, setNameInput] = useState(user.name);
    const {t} = useTranslation('profile');

    const updateProfile = async () => {
        if (!user?.uid || nameInput === '') {
            return;
        }

        try {
            await updateFirestoreUser(user.uid, {name: nameInput});
            dispatch(setUser({
                name: nameInput
            }));
        } catch (e) {
            console.log('error updating user', e);
        }
    };

    const renderPickerItems = () => {
        return LANGUAGES.map((language) => {
            return (
                <Picker.Item key={language.key} label={language.label} value={language.key}/>
            );
        });
    };

    return (
        <>
            <CustomHeader title={t('title')} showBackButton={true}/>
            <View style={styles.container}>
                <View style={styles.input}>
                    <Text>{t('language')}</Text>
                    <Picker
                        selectedValue={settings.language}
                        onValueChange={(itemValue) => dispatch(setLanguage(itemValue.toString()))}
                        mode={'dropdown'}
                    >
                        {renderPickerItems()}
                    </Picker>
                </View>
                <CustomTextInput
                    label={t('displayName')}
                    containerStyle={styles.input}
                    value={nameInput}
                    onChangeText={setNameInput}
                    placeholder={t('displayName')}
                    onSubmitEditing={() => updateProfile()}
                    returnKeyType={'go'}
                    autoCapitalize={'words'}
                />
                <Button
                    onPress={() => updateProfile()}
                    text={t('updateProfile')}
                    containerStyle={styles.input}
                />
            </View>
        </>
    );
};

export default Profile;
