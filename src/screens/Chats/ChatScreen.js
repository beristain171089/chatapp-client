import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { HeaderChat } from '../../components/Navigation';

export function ChatScreen() {

    const { params: { chatId } } = useRoute();

    return (
        <>
            <HeaderChat chatId={chatId} />
            <View>
                <Text>ChatScreen</Text>
            </View>
        </>
    );
};