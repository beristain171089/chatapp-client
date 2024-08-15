import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'native-base';
import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import { ChatMessage, UnreadMessages } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';
import { styles } from './item.styles.js';

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export function Item(props) {

    const { chat } = props;

    const { participant_one, participant_two } = chat;

    const { accessToken, user } = useAuth();

    const [lastMessage, setLastMessage] = useState(null);
    const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);

    useEffect(() => {

        (async () => {

            try {

                const totalMessages = await chatMessageController.getTotal(accessToken, chat._id);

                const totalReadMessages = await unreadMessagesController.getTotalReadMessages(chat._id);

                setTotalUnreadMessages(totalMessages - totalReadMessages);

            } catch (error) {
                console.error(error);
            };

        })();

    }, [chat._id]);

    useEffect(() => {

        (async () => {

            try {

                const response = await chatMessageController.getLastMessage(accessToken, chat._id);

                if (!isEmpty(response)) setLastMessage(response);

            } catch (error) {
                console.error(error);
            };

        })();

    }, [chat._id]);

    const userChat = user._id === participant_one._id ? participant_two : participant_one;

    const openChat = () => {
        console.log('Abrir chat -->', chat._id);
    };

    return (
        <>
            <TouchableOpacity
                style={styles.content}
                onPress={openChat}
            >
                <Avatar
                    bg='cyan.500'
                    size='lg'
                    marginRight={3}
                    style={styles.avatar}
                    source={{ uri: userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}` }}
                >
                    {userChat.email.substring(0, 2).toUpperCase()}
                </Avatar>
                <View style={styles.infoContent}>
                    <View style={styles.info}>
                        <Text style={styles.identity}>
                            {userChat.firstname || userChat.lastname ?
                                `${userChat.firstname || ''} ${userChat.lastname || ''}`
                                :
                                userChat.email
                            }
                        </Text>
                        <Text
                            style={styles.message}
                            numberLines={2}
                        >
                            {lastMessage?.message || " "}
                        </Text>
                    </View>
                    <View style={styles.notify}>
                        {lastMessage ?
                            <Text style={styles.time}>
                                {DateTime.fromISO(new Date(lastMessage.createdAt).toISOString()).toFormat("HH:mm")}
                            </Text>
                            :
                            null
                        }
                        {totalUnreadMessages ?
                            <View style={styles.totalUnreadContent}>
                                <Text style={styles.totalUnread}>
                                    {totalUnreadMessages < 99 ? totalUnreadMessages : '99+'}
                                </Text>
                            </View>
                            :
                            null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};