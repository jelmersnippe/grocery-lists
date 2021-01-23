import styles from './styles';
import CustomTextInput from '../../CustomTextInput';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {FunctionComponent, useState} from 'react';
import {Props} from './props';
import theme from '../../../config/theme';

const SearchBar: FunctionComponent<Props> = ({searchAction}) => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <View style={styles.searchContainer}>
            <CustomTextInput
                containerStyle={styles.searchInputContainer}
                placeholder={'Username'}
                value={searchInput}
                onChangeText={(input) => setSearchInput(input)}
                onSubmitEditing={() => searchAction(searchInput)}
                autoCapitalize={'words'}
                returnKeyType={'go'}
                style={styles.searchInput}
            />
            <TouchableOpacity
                onPress={async () => {
                    Keyboard.dismiss();
                    await searchAction(searchInput);
                }}
                style={styles.searchIcon}
            >
                <Icon name={'search'} size={40} color={theme.colors.black}/>
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
