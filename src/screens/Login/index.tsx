import React, {useState, useRef} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import CustomTextInput from '../../components/CustomTextInput';
import Button from '../../components/Button';
import {setUser} from '../../reducers/user/actions';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import theme from '../../config/theme';

const Login = ({navigation}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const passwordRef = useRef<TextInput>(null);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation('auth');

    const login = async (email: string, password: string) => {
        if (!!emailInput && !!passwordInput) {
            try {
                const {user} = await auth().signInWithEmailAndPassword(email, password);
                // TODO:
                // Get user info from firestore
                dispatch(setUser({
                    email: user.email ?? undefined,
                    uid: user.uid
                }));
            } catch (e) {
                setError(e.code);
            }
        } else {
            setError('Hey! You missed a spot..');
        }
    };

    return (
        <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <CustomTextInput
                label={t('email')}
                containerStyle={styles.input}
                value={emailInput}
                onChangeText={setEmailInput}
                placeholder={t('email')}
                onSubmitEditing={() => passwordRef.current?.focus()}
                returnKeyType={'next'}
                blurOnSubmit={false}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
            />
            <CustomTextInput
                label={t('password')}
                containerStyle={styles.input}
                value={passwordInput}
                onChangeText={setPasswordInput}
                secureTextEntry={true}
                placeholder={t('password')}
                onSubmitEditing={() => login(emailInput, passwordInput)}
                returnKeyType={'go'}
                ref={passwordRef}
                autoCapitalize={'none'}
            />
            {error && <Text style={styles.error}>Error: {error}</Text>}
            <Button
                onPress={() => login(emailInput, passwordInput)}
                text={t('login')}
                containerStyle={styles.input}
            />
            <TouchableOpacity
                style={theme.buttons.tertiary.container}
                onPress={() => navigation.navigate('CreateAccount')}
            >
                <Text style={theme.buttons.tertiary.text}>{t('toCreateAccount')}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Login;
