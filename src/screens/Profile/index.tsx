import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/Text';
import {Props} from './props';
import styles from './styles';
import CustomTextInput from '../../components/CustomTextInput';
import Button from '../../components/Button';
import {setUser} from '../../reducers/user/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {useTranslation} from 'react-i18next';
import {updateFirestoreUser} from '../../firestore/userActions';
import theme from '../../config/theme';

const Profile: FunctionComponent<Props> = ({}) => {
    const dispatch = useDispatch();
    const user = useSelector((rootState: RootState) => rootState.user);
    const [nameInput, setNameInput] = useState(user.name);
    const {t} = useTranslation('profile');

    const updateProfile = async () => {
        if (!user?.uid) {
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

    return (
        <View style={styles.container}>
            <Text style={theme.pageTitle}>{t('title')}</Text>
            <CustomTextInput
                label={t('displayName')}
                containerStyle={styles.input}
                value={nameInput}
                onChangeText={setNameInput}
                placeholder={t('displayName')}
                onSubmitEditing={() => updateProfile()}
                returnKeyType={'go'}
                // ref={passwordRef}
                autoCapitalize={'words'}
            />
            <Button
                onPress={() => updateProfile()}
                text={t('updateProfile')}
                containerStyle={styles.input}
            />
        </View>
    );
};

export default Profile;
