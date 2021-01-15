import React, {FunctionComponent, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import firestoreListActions from '../../firestore/listActions';
import Icon from 'react-native-vector-icons/Ionicons';

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
                    style={styles.listItem}
                >
                    <Text style={styles.listItemName}>{value.name}</Text>
                    <Icon style={styles.listItemIcon} name={'caret-forward'} size={24} color={'black'} />
                </TouchableOpacity>
            );
        }

        return listItems;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ListOverview</Text>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                style={styles.listContainer}
            >
                {renderLists()}
            </ScrollView>
        </View>
    );
};

export default ListOverview;
