import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Props} from './props';
import styles from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import InputModal from '../../components/ModalContent/InputModal';
import {useTranslation} from 'react-i18next';
import {addFirestoreList, subscribeToFirestoreListUpdates, subscribeToFirestoreListUpdatesForGroups} from '../../firestore/listActions';

const ListOverview: FunctionComponent<Props> = ({navigation}) => {
    const groups = useSelector((rootState: RootState) => rootState.groups);
    const lists = useSelector((rootState: RootState) => rootState.lists);
    const [groupUids, setGroupUids] = useState<Array<string>>([]);
    const {dispatch} = useOverlayData();
    const {t} = useTranslation('lists');

    useEffect(() => {
        return subscribeToFirestoreListUpdates();
    }, []);

    useEffect(() => {
        const newGroupUids: Array<string> = [];
        for (const key of Object.keys(groups)) {
            newGroupUids.push(key);
        }
        setGroupUids(newGroupUids);
    }, [groups]);

    useEffect(() => {
        if (groupUids.length <= 0) {
            return;
        }
        return subscribeToFirestoreListUpdatesForGroups(groupUids);
    }, [groupUids]);

    const createNewList = async (name: string) => {
        if (name === '') {
            dispatch(resetOverlay());
            return;
        }

        const listId = await addFirestoreList(name);
        dispatch(resetOverlay());
        if (listId) {
            navigation.navigate('ListDetails', {id: listId});
        }
    };

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
                    <Icon style={styles.listItemIcon} name={'keyboard-arrow-right'} size={24} color={'black'}/>
                </TouchableOpacity>
            );
        }

        return listItems;
    };

    const openInputModal = () => {
        dispatch(setOverlay({
            title: t('newList'),
            content: <InputModal
                buttonLabel={t('common:create')}
                onSubmit={async (input: string) => createNewList(input)}
            />,
            wrapperStyle: {
                width: '60%'
            }
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{t('title')}</Text>
                <TouchableOpacity
                    onPress={() => openInputModal()}
                >
                    <Icon name={'add'} size={40} color={'black'}/>
                </TouchableOpacity>
            </View>
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
