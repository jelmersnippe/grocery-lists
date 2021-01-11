import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const Login: FunctionComponent<Props> = ({navigation}) => {
    const passwordRef = useRef<TextInput>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
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
        }
    };

    useEffect(() => {
        return auth().onAuthStateChanged((user) => {
            console.log(user);
            setCurrentUser(user);
        });
    }, []);

    return (
        <View style={styles.container}>
            {
                currentUser ?
                    <>
                        <Text>Welcome, {currentUser.displayName}</Text>
                        <TouchableOpacity
                            style={styles.linkWrapper}
                            onPress={() => auth().signOut()}
                        >
                            <Text style={styles.link}>Logout</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <Text>Login</Text>
                        {error && <Text>Error: {error}</Text>}
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
                        <TouchableOpacity
                            style={styles.linkWrapper}
                            onPress={() => navigation.navigate('CreateAccount')}
                        >
                            <Text style={styles.link}>Create account instead</Text>
                        </TouchableOpacity>
                    </>
            }
        </View>
    );
};

export default Login;
