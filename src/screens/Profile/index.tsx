import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {Props} from './props';
import styles from './styles';

const Profile: FunctionComponent<Props> = ({}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
        </View>
    );
};

export default Profile;
