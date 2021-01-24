import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text';
import {Props} from './props';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import InputModal from '../../components/ModalContent/InputModal';
import {useTranslation} from 'react-i18next';
import {addFirestoreList, subscribeToFirestoreListUpdates, subscribeToFirestoreListUpdatesForGroups} from '../../firestore/listActions';
import theme from '../../config/theme';

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
                    style={theme.overviewItem.container}
                >
                    <Text>{value.name}</Text>
                    <Icon style={theme.overviewItem.icon} name={'keyboard-arrow-right'} size={24} color={theme.colors.black}/>
                </TouchableOpacity>
            );
        }

        return listItems;
    };

    const openInputModal = () => {
        dispatch(setOverlay({
            title: t('newList'),
            content: <InputModal
                placeholder={t('newList')}
                buttonLabel={t('common:create')}
                onSubmit={async (input: string) => createNewList(input)}
            />,
            wrapperStyle: {
                width: '60%'
            }
        }));
    };

    return (
        <View style={theme.mainContainer}>
            <View style={theme.pageHeader}>
                <Text style={theme.pageTitle}>
                    {t('yourLists')}
                </Text>
                <TouchableOpacity
                    onPress={() => openInputModal()}
                    style={theme.iconButton}
                >
                    <Icon name={'add'} size={40} color={theme.colors.black}/>
                </TouchableOpacity>
            </View>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
            >
                {renderLists()}
            </ScrollView>
        </View>
    );
};

export default ListOverview;
