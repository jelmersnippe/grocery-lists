import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const Home: FunctionComponent<Props> = ({}) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
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
