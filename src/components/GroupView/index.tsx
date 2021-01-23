import React, {FunctionComponent} from 'react';
import {Props} from './props';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import GroupItem from './GroupItem';

const GroupView: FunctionComponent<Props> = ({groups, editable, removeAction}) => {

    return (
        groups.length > 0 ?
            <View style={styles.wrapper}>
                <Text style={styles.title}>Groups</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                >
                    {groups.map((group) => (
                        <GroupItem
                            key={group.uid}
                            group={group}
                            removeAction={removeAction}
                            editable={editable}
                        />
                    ))}
                </ScrollView>
            </View>
            : null
    );
};

export default GroupView;
