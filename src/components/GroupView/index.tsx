import React, {FunctionComponent} from 'react';
import {Props} from './props';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {capitalize} from '../../utils/capitalize';

const GroupView: FunctionComponent<Props> = ({groups}) => {

    return (
        groups.length > 0 ?
            <View style={styles.wrapper}>
                <Text style={styles.title}>Groups</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                >
                    {groups.map((group, index) => {
                        return (
                            <View
                                key={index}
                                style={styles.groupItem}>
                                <Text style={styles.groupName}>
                                    {capitalize(group.name)}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            : null
    );
};

export default GroupView;
