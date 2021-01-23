import React, {FunctionComponent, useState} from 'react';
import {Props} from './props';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reducers';
import Checkbox from '../../Checkbox';
import Button from '../../Button';
import {setFirestoreListGroups} from '../../../firestore/listActions';
import {resetOverlay, useOverlayData} from '@jelmersnippe/flexible-overlays';
import {ScrollView, View} from 'react-native';
import styles from './styles';

const AddGroupModal: FunctionComponent<Props> = ({initialGroups, listId}) => {
    const groups = useSelector((rootState: RootState) => rootState.groups);
    const [updatedGroups, setUpdatedGroups] = useState<Array<string>>(initialGroups);
    const {dispatch} = useOverlayData();

    const updateGroupsToAdd = (groupUid: string) => {
        if (updatedGroups.includes(groupUid)) {
            const filteredGroups = updatedGroups.filter((group) => group !== groupUid);
            setUpdatedGroups(filteredGroups);
        } else {
            setUpdatedGroups([...updatedGroups, groupUid]);
        }
    };

    const renderGroups = () => {
        const groupElements = [];
        for (const key of Object.keys(groups)) {
            const group = groups[key];
            groupElements.push(
                <Checkbox
                    key={key}
                    label={group.name}
                    checked={updatedGroups.includes(key)}
                    onPress={() => updateGroupsToAdd(key)}
                />
            );
        }

        return groupElements;
    };

    return (
        <>
            <ScrollView
                alwaysBounceVertical={false}
            >
                {renderGroups()}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    text={'Cancel'}
                    onPress={() => dispatch(resetOverlay())}
                />
                <Button
                    text={'Save'}
                    onPress={async() => {
                        await setFirestoreListGroups(listId, updatedGroups);
                        dispatch(resetOverlay());
                    }}
                />
            </View>
        </>
    );
};

export default AddGroupModal;
