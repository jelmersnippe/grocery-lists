import React, {FunctionComponent} from 'react';
import {Text, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {FirestoreList} from '../../firestore/types';

const ListDetails: FunctionComponent<Props> = ({route}) => {
    const {id} = route.params;
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);

    const renderDetails = (list: FirestoreList): JSX.Element => {
        return (
            <View>
                <Text>{list.name}</Text>
                <View>
                    {list.items.map((item, index) => (
                        <Text key={index}>{`${item.quantity}x ${item.name}`}</Text>
                    ))}
                </View>
            </View>
        );
    };

    return (
        selectedList ?
            <View style={styles.container}>
                <Text style={styles.title}>{selectedList.name}</Text>
                {renderDetails(selectedList)}
            </View>
            : <Text>List not found</Text>
    );
};

export default ListDetails;
