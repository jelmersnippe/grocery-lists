import React, {FunctionComponent, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import firestoreGroupActions from '../../firestore/groupActions';

const GroupOverview: FunctionComponent<Props> = ({navigation}) => {
    const groups = useSelector((rootState: RootState) => rootState.groups);

    useEffect(() => {
        return firestoreGroupActions.subscribeToUpdates();
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
            {
                __DEV__ ?
                    <>
                        <Text style={styles.title}>GroupOverview</Text>
                        {renderGroups()}
                    </>
                    :
                    <Text style={styles.title}>Coming soon</Text>
            }
        </View>
    );
};

export default GroupOverview;
