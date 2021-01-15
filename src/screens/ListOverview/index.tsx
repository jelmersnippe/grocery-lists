import React, {FunctionComponent, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {FirestoreList} from '../../firestore/types';
import firestore from '@react-native-firebase/firestore';
import {addList} from '../../reducers/lists/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';

const ListOverview: FunctionComponent<Props> = ({navigation}) => {
    const dispatch = useDispatch();
    const lists = useSelector((rootState: RootState) => rootState.lists);

    useEffect(() => {
        return firestore().collection('lists').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                const data = documentSnapshot.data() as FirestoreList;
                const id = documentSnapshot.id;
                dispatch(addList({id: id, list: data}));
            });
        });
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
