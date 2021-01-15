import React, {FunctionComponent} from 'react';
import {View, Text} from 'react-native';
import {Props} from './props';
import styles from './styles';

const ListDetails: FunctionComponent<Props> = ({}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ListDetails</Text>
        </View>
    );
};

export default ListDetails;
