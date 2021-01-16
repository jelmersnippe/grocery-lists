import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {Props} from './props';
import styles from './styles';

const Search: FunctionComponent<Props> = ({}) => {

    return (
        <View style={styles.container}>
            {
                __DEV__ ?
                    <Text style={styles.title}>Search</Text>
                    :
                    <Text style={styles.title}>Coming soon</Text>
            }
        </View>
    );
};

export default Search;
