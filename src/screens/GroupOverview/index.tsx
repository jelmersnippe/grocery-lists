import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';

const GroupOverview: FunctionComponent<Props> = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GroupOverview</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GroupDetails')}>
                <Text>To Details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GroupOverview;
