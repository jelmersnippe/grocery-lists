import React, {FunctionComponent} from 'react';
import {View, Text} from 'react-native';
import {Props} from './props';
import styles from './styles';

const Home: FunctionComponent<Props> = ({}) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
};

export default Home;
