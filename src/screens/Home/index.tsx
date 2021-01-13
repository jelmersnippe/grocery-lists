import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import firestoreUserActions from '../../firestore/userActions';

const Home: FunctionComponent<Props> = ({}) => {
    const [username, setUsername] = useState('');
    const user = useSelector((rootState: RootState) => rootState.user);

    const getUser = async () => {
        if (user?.uid) {
            const firestoreUser = await firestoreUserActions.getByUid(user.uid);
            if (firestoreUser) {
                setUsername(firestoreUser.name);
            }
        }
    };

    useEffect(() => {
        (async () => await getUser())();
    }, []);

    return (
        <View style={styles.container}>
            {!!username && <Text>Welcome, {username}</Text>}
            <TouchableOpacity
                style={styles.linkWrapper}
                onPress={() => auth().signOut()}
            >
                <Text style={styles.link}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;
