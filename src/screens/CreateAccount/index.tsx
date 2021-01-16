import React, {FunctionComponent, useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {setUser} from '../../reducers/user/actions';

const CreateAccount: FunctionComponent<Props> = ({navigation}) => {
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const [displayNameInput, setDisplayNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const createAccount = async (email: string, password: string) => {
        if (!!displayNameInput && !!emailInput && !!passwordInput) {
            try {
                const result = await auth().createUserWithEmailAndPassword(email, password);
                await firestore().collection('users').doc(result.user.uid).set({
                    name: displayNameInput
                });
                dispatch(setUser({uid: result.user.uid}));
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
                onSubmitEditing={() => createAccount(emailInput, passwordInput)}
                returnKeyType={'go'}
                keyboardType={'default'}
                autoCapitalize={'none'}
                ref={passwordRef}
            />
            {error && <Text style={styles.error}>Error: {error}</Text>}
            <Button
                onPress={() => createAccount(emailInput, passwordInput)}
                text={'Create Account'}
                containerStyle={styles.input}
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
