import React, {FunctionComponent, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const CreateAccount: FunctionComponent<Props> = ({navigation}) => {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const [displayNameInput, setDisplayNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        if (!!emailInput && !!passwordInput) {
            try {
                const result = await auth().createUserWithEmailAndPassword(email, password);
                console.log(result);
                await auth().currentUser?.updateProfile({displayName: displayNameInput});
            } catch (e) {
                setError(e.code);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text>Create Account</Text>
            {error && <Text>Error: {error}</Text>}
            <TextInput
                style={styles.input}
                value={displayNameInput}
                onChangeText={setDisplayNameInput}
                placeholder={'Display name'}
                onSubmitEditing={() => emailRef.current?.focus()}
                returnKeyType={'next'}
                blurOnSubmit={false}
                keyboardType={'default'}
                autoCapitalize={'none'}
            />
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
                ref={emailRef}
            />
            <TextInput
                style={styles.input}
                value={passwordInput}
                onChangeText={setPasswordInput}
                secureTextEntry={true}
                placeholder={'Password'}
                onSubmitEditing={() => login(emailInput, passwordInput)}
                returnKeyType={'go'}
                keyboardType={'default'}
                autoCapitalize={'none'}
                ref={passwordRef}
            />
            <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.link}>Login instead</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateAccount;
