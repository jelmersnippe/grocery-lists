import React, {FunctionComponent} from 'react';
import {View, Text} from 'react-native';
import {Props} from './props';
import styles from './styles';

const GroupDetails: FunctionComponent<Props> = ({}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GroupDetails</Text>
        </View>
    );
};

export default GroupDetails;
