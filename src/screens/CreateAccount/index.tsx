import React, {FunctionComponent, useRef, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {setUser} from '../../reducers/user/actions';
import {useTranslation} from 'react-i18next';
import CustomTextInput from '../../components/CustomTextInput';
import {createFirestoreUser} from '../../firestore/userActions';
import theme from '../../config/theme';

const CreateAccount: FunctionComponent<Props> = ({navigation}) => {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const [nameInput, setNameInput] = useState('');
    const [nameError, setNameError] = useState('');

    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');

    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [error, setError] = useState('');
    const {t} = useTranslation('auth');
    const dispatch = useDispatch();

    const createAccount = async (email: string, password: string) => {
        let newDisplayNameError = '';
        let newEmailError = '';
        let newPasswordError = '';

        const validEmail = emailInput.match('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$');
        const validPassword = passwordInput.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
        const validDisplayName = !!nameInput;

        if (validEmail && validPassword && validDisplayName) {
            try {
                const result = await auth().createUserWithEmailAndPassword(email, password);
                await createFirestoreUser(result.user.uid, {name: nameInput});
                dispatch(setUser({uid: result.user.uid, name: nameInput}));
            } catch (e) {
                setError(e.code);
            }
        } else {
            if (!validEmail) {
                newEmailError = 'Invalid email';
            }
            if (!validPassword) {
                newPasswordError = 'Invalid password. Make sure it contains atleast:\n - one uppercase letter\n - one lower case letter\n - one number\n - one character in: @$!%*?&';
            }
            if (!validDisplayName) {
                newDisplayNameError = 'Invalid display name';
            }
        }

        setNameError(newDisplayNameError);
        setEmailError(newEmailError);
        setPasswordError(newPasswordError);
    };

    return (
        <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.input}>
                <CustomTextInput
                    label={t('displayName')}
                    value={nameInput}
                    onChangeText={setNameInput}
                    placeholder={t('displayName')}
                    onSubmitEditing={() => emailRef.current?.focus()}
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    keyboardType={'default'}
                    autoCapitalize={'words'}
                />
                {!!nameError && <Text style={styles.error}>{nameError}</Text>}
            </View>
            <View style={styles.input}>
                <CustomTextInput
                    label={t('email')}
                    value={emailInput}
                    onChangeText={setEmailInput}
                    placeholder={t('email')}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    ref={emailRef}
                />
                {!!emailError && <Text style={styles.error}>{emailError}</Text>}
            </View>
            <View style={styles.input}>
                <CustomTextInput
                    label={t('password')}
                    value={passwordInput}
                    onChangeText={setPasswordInput}
                    secureTextEntry={true}
                    placeholder={t('password')}
                    onSubmitEditing={() => createAccount(emailInput, passwordInput)}
                    returnKeyType={'go'}
                    keyboardType={'default'}
                    autoCapitalize={'none'}
                    ref={passwordRef}
                />
                {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}
            </View>
            {!!error && <Text style={styles.error}>{error}</Text>}
            <Button
                onPress={() => createAccount(emailInput, passwordInput)}
                text={t('createAccount')}
                containerStyle={styles.input}
            />
            <TouchableOpacity
                style={theme.buttons.tertiary.container}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={theme.buttons.tertiary.text}>{t('toLogin')}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreateAccount;
