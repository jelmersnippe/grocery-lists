import React, {FunctionComponent, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {FirestoreList} from '../../firestore/types';
import Icon from 'react-native-vector-icons/Ionicons';

const ListDetails: FunctionComponent<Props> = ({navigation, route}) => {
    const {id} = route.params;
    const selectedList = useSelector((rootState: RootState) => rootState.lists.hasOwnProperty(id) ? rootState.lists[id] : undefined);

    useEffect(() => {
        if (selectedList) {
            navigation.setOptions({title: selectedList.name});
        }
    }, [selectedList]);

    const renderDetails = (list: FirestoreList): JSX.Element => {
        return (
            <>
                {list.items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.itemQuantity}>
                            <Text style={styles.itemQuantityText}>{item.quantity}</Text>
                            <Icon name={'close'} size={18} color={'black'}/>
                        </View>
                        <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                ))}
            </>
        );
    };

    return (
        selectedList ?
            <View style={styles.container}>
                <Text style={styles.title}>{selectedList.name}</Text>
                <View style={styles.header}>
                    <Text style={styles.headerQuantity}>Qty.</Text>
                    <Text style={styles.headerName}>Name</Text>
                </View>
                <ScrollView
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                >
                    {renderDetails(selectedList)}
                </ScrollView>
            </View>
            : <Text>List not found</Text>
    );
};

export default ListDetails;
