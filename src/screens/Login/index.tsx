import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import Button from '../../components/Button';

const Login = ({navigation}: Props): JSX.Element => {
    const passwordRef = useRef<TextInput>(null);
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        if (!!emailInput && !!passwordInput) {
            try {
                await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
                setError(e.code);
            }
        } else {
            setError('Hey! You missed a spot..');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={emailInput}
                onChangeText={setEmailInput}
                placeholder={'Username'}
                onSubmitEditing={() => passwordRef.current?.focus()}
                returnKeyType={'next'}
                blurOnSubmit={false}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
            />
            <TextInput
                style={styles.input}
                value={passwordInput}
                onChangeText={setPasswordInput}
                secureTextEntry={true}
                placeholder={'Password'}
                onSubmitEditing={() => login(emailInput, passwordInput)}
                returnKeyType={'go'}
                ref={passwordRef}
                autoCapitalize={'none'}
            />
            {error && <Text style={styles.error}>Error: {error}</Text>}
            <Button
                onPress={() => login(emailInput, passwordInput)}
                text={'Login'}
                containerStyle={styles.input}
            />
            <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => navigation.navigate('CreateAccount')}
            >
                <Text style={styles.link}>Create account instead</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
