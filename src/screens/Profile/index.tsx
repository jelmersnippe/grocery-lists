import React, {FunctionComponent, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text';
import {Props} from './props';
import styles from './styles';
import Button from '../../components/Button';
import {setUser} from '../../reducers/user/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {useTranslation} from 'react-i18next';
import {updateFirestoreUser} from '../../firestore/userActions';
import theme from '../../config/theme';
import {Picker} from '@react-native-picker/picker';
import {LANGUAGES} from '../../reducers/settings/types';
import {setLanguage} from '../../reducers/settings/actions';
import {Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile: FunctionComponent<Props> = ({navigation}) => {
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
            <Header
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} color={theme.colors.white} size={26} />
                    </TouchableOpacity>
                }
                centerComponent={<Text style={theme.headerText}>{t('title')}</Text>}
                rightComponent={
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icon name={'settings'} color={theme.colors.white} size={26} />
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <Input
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
                <Picker
                    selectedValue={settings.language}
                    onValueChange={(itemValue) => dispatch(setLanguage(itemValue.toString()))}
                    mode={'dropdown'}
                    style={styles.input}
                >
                    {renderPickerItems()}
                </Picker>
            </View>
        </>
    );
};

export default Profile;
