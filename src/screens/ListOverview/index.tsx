import React, {FunctionComponent, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import firestoreListActions from '../../firestore/listActions';

const ListOverview: FunctionComponent<Props> = ({navigation}) => {
    const lists = useSelector((rootState: RootState) => rootState.lists);

    useEffect(() => {
        return firestoreListActions.subscribeToUpdates();
    }, []);

    const renderLists = (): Array<JSX.Element> => {
        const listItems: Array<JSX.Element> = [];
        for (const [key, value] of Object.entries(lists)) {
            listItems.push(
                <TouchableOpacity
                    key={key}
                    onPress={() => navigation.navigate('ListDetails', {id: key})}
                >
                    <Text>{value.name}</Text>
                </TouchableOpacity>
            );
        }

        return listItems;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ListOverview</Text>
            {renderLists()}
        </View>
    );
};

export default ListOverview;
