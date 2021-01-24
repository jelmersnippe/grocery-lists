import React, {FunctionComponent} from 'react';
import {Props} from './props';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import styles from './styles';
import GroupItem from './GroupItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {setOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import AddGroupModal from '../ModalContent/AddGroupModal';
import {removeFirestoreListGroup} from '../../firestore/listActions';
import theme from '../../config/theme';

const GroupView: FunctionComponent<Props> = ({groups, editable, listId}) => {
    const {dispatch} = useOverlayData();

    const openAddGroupModal = () => {
        dispatch(setOverlay({
            wrapperStyle: {
                maxHeight: '60%'
            },
            content: <AddGroupModal
                initialGroups={groups.map((group) => group.uid)}
                listId={listId}
            />
        }));
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Groups</Text>
            <View style={styles.groupContainer}>
                {
                    groups.length > 0 &&
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        alwaysBounceHorizontal={false}
                    >
                        {groups.map((group) => (
                            <GroupItem
                                key={group.uid}
                                group={group}
                                removeAction={(groupUid) => removeFirestoreListGroup(listId, groupUid)}
                                editable={editable}
                            />
                        ))}
                    </ScrollView>
                }
                <TouchableOpacity
                    onPress={() => openAddGroupModal()}
                    style={theme.iconButton}
                >
                    <Icon name={'add'} size={32} color={theme.colors.black}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GroupView;
