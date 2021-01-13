import React, {FunctionComponent, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';

const Home: FunctionComponent<Props> = ({}) => {
    const [username, setUsername] = useState('');
    const user = useSelector((rootState: RootState) => rootState.user);

    const getUsername = async () => {
        firestore().collection('users')
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    setUsername(documentSnapshot.data()?.name);
                }
            });
    };

    return (
        <View style={styles.container}>
            <Text>Welcome, {username}</Text>
            <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => auth().signOut()}
            >
                <Text style={styles.link}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => getUsername()}
            >
                <Text style={styles.link}>Get Username</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;
