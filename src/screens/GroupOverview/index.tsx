import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text';
import {Props} from './props';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {
    addFirestoreGroup,
    addFirestoreGroupUsers, deleteFirestoreGroup,
    removeFirestoreGroupUsers,
    subscribeToFirestoreGroupUpdates
} from '../../firestore/groupActions';
import {resetOverlay, setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import InputModal from '../../components/ModalContent/InputModal';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {capitalize} from '../../utils/capitalize';
import theme from '../../config/theme';
import {getMultipleUsers} from '../../firestore/userActions';
import {Button, Card} from 'react-native-elements';
import UserSearch from '../../components/UserSearch';
import {User} from '../../reducers/userCache/types';
import styles from './styles';

const GroupOverview: FunctionComponent<Props> = ({}) => {
    const groups = useSelector((rootState: RootState) => rootState.groups);
    const [groupUsers, setGroupUsers] = useState<{ [key: string]: Array<User> }>({});
    const [expandedGroup, setExpandedGroup] = useState<string | undefined>(undefined);
    const currentUserId = useSelector((rootState: RootState) => rootState.user.uid);
    const {dispatch} = useOverlayData();
    const {t} = useTranslation('groups');

    useEffect(() => {
        return subscribeToFirestoreGroupUpdates();
    }, []);

    useEffect(() => {
        (async () => {
            const newGroupUsers: { [key: string]: Array<User> } = {};
            for (const group in groups) {
                newGroupUsers[group] = await getMultipleUsers(groups[group].users);
            }
            setGroupUsers(newGroupUsers);
        })();
    }, [groups]);

    const openUserSearch = (groupId: string) => {
        dispatch(setOverlay({
            wrapperStyle: {height: '80%', marginTop: 'auto', borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
            content: (<UserSearch
                saveAction={async (usersToAdd) => await addFirestoreGroupUsers(groupId, usersToAdd)}
                initialUsers={groups[groupId]?.users ?? []}
            />),
            animationType: 'slide'
        }));
    };

    const renderGroups = (): Array<JSX.Element> => {
        const groupItems: Array<JSX.Element> = [];

        for (const [key, value] of Object.entries(groups)) {
            const createdByUser = currentUserId === groups[key].creatorUid;
            groupItems.push(
                <Card>
                    <TouchableOpacity
                        key={key}
                        onPress={ () => setExpandedGroup(expandedGroup !== key ? key : undefined)}
                        style={styles.groupCard}
                    >
                        <Text style={styles.groupName}>{capitalize(value.name)}</Text>
                        {
                            createdByUser &&
                            <TouchableOpacity
                                style={styles.addUserButton}
                                onPress={() => openUserSearch(key)}
                            >
                                <Icon name={'people'} size={32} color={theme.colors.black}/>
                                <Icon name={'add'} size={26} color={theme.colors.black}/>
                            </TouchableOpacity>
                        }
                    </TouchableOpacity>
                    {
                        (expandedGroup === key) &&
                        <>
                            {groupUsers[key]?.map((user) => {
                                return (
                                    <View style={styles.userItem}>
                                        <Text>{capitalize(user.name)}</Text>
                                        {(createdByUser && user.uid !== currentUserId) &&
                                        <TouchableOpacity
                                            onPress={() => removeFirestoreGroupUsers(key, [user.uid])}
                                            style={theme.iconButton}
                                        >
                                            <Icon name={'delete'} color={theme.colors.red} size={24}/>
                                        </TouchableOpacity>}
                                    </View>
                                );
                            })}
                            {createdByUser &&
                                <Button
                                    title={t('deleteGroup')}
                                    onPress={() => deleteFirestoreGroup(key)}
                                    icon={<Icon name={'delete'} color={theme.colors.red} size={24}/>}
                                    type={'outline'}
                                    iconRight={true}
                                    containerStyle={styles.deleteButtonContainer}
                                    buttonStyle={styles.deleteButtonButton}
                                    titleStyle={styles.deleteButtonTitle}
                                />
                            }
                        </>
                    }
                </Card>
            );
        }

        return groupItems;
    };

    const createNewGroup = async (name: string) => {
        if (name === '') {
            dispatch(resetOverlay());
            return;
        }

        const groupId = await addFirestoreGroup(name);
        dispatch(resetOverlay());
        if (groupId) {
            setExpandedGroup(groupId);
        }
    };

    const openInputModal = () => {
        dispatch(setOverlay({
            content: <InputModal
                placeholder={t('newGroup')}
                buttonLabel={t('common:create')}
                onSubmit={async (input: string) => createNewGroup(input)}
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
                    {t('yourGroups')}
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
                {renderGroups()}
            </ScrollView>
        </View>
    );
};

export default GroupOverview;
