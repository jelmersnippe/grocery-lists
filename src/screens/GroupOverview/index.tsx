import React, {FunctionComponent, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {FirestoreGroup} from '../../firestore/types';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {addGroup} from '../../reducers/groups/actions';

const GroupOverview: FunctionComponent<Props> = ({navigation}) => {
    const dispatch = useDispatch();
    const groups = useSelector((rootState: RootState) => rootState.groups);

    useEffect(() => {
        return firestore().collection('groups').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                const data = documentSnapshot.data() as FirestoreGroup;
                const id = documentSnapshot.id;
                dispatch(addGroup({id: id, group: data}));
            });
        });
    }, []);

    const renderGroups = (): Array<JSX.Element> => {
        const groupItems: Array<JSX.Element> = [];

        for (const [key, value] of Object.entries(groups)) {
            groupItems.push(
                <TouchableOpacity
                    key={key}
                    onPress={() => navigation.navigate('GroupDetails', {id: key})}
                >
                    <Text>{value.name}</Text>
                </TouchableOpacity>
            );
        }

        return groupItems;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GroupOverview</Text>
            {renderGroups()}
        </View>
    );
};

export default GroupOverview;
