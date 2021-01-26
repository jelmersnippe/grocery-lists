import React, {FunctionComponent, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {setUser} from '../../reducers/user/actions';
import {useTranslation} from 'react-i18next';
import {createFirestoreUser} from '../../firestore/userActions';
import theme from '../../config/theme';
import {Input} from 'react-native-elements';

const CreateAccount: FunctionComponent<Props> = ({navigation}) => {
    const emailRef = useRef<Input>(null);
    const passwordRef = useRef<Input>(null);
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
            keyboardShouldPersistTaps={'handled'}
        >
            <View style={styles.input}>
                <Input
                    label={t('displayName')}
                    value={nameInput}
                    onChangeText={setNameInput}
                    placeholder={t('displayName')}
                    onSubmitEditing={() => emailRef.current?.focus()}
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    keyboardType={'default'}
                    autoCapitalize={'words'}
                    renderErrorMessage={!!nameError}
                    errorMessage={nameError}
                />
            </View>
            <View style={styles.input}>
                <Input
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
                    renderErrorMessage={!!emailError}
                    errorMessage={emailError}
                />
            </View>
            <View style={styles.input}>
                <Input
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
                    renderErrorMessage={!!passwordError}
                    errorMessage={passwordError}
                />
            </View>
            {!!error && <Text style={styles.error}>{error}</Text>}
            <Button
                onPress={() => createAccount(emailInput, passwordInput)}
                text={t('createAccount')}
                containerStyle={styles.button}
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
