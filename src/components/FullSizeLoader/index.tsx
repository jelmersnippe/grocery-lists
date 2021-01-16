import {ActivityIndicator, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Props} from './props';
import styles from './styles';

const FullSizeLoader: FunctionComponent<Props> = ({size, color}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color}/>
        </View>
    );
};

export default FullSizeLoader;
