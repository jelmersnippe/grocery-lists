import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';

const ListOverview: FunctionComponent<Props> = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ListOverview</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ListDetails')}>
                <Text>To Details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ListOverview;
