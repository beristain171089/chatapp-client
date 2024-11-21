import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, CloseIcon, Icon, Image, Spinner } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ChatMessage } from '../../../api';
import { useAuth } from '../../../hooks';
import { imageExpoFormat } from '../../../utils';
import { styles } from './PhotoCapture.styles.js';

const chatMessageController = new ChatMessage();

export function PhotoCapture(props) {

    const { photo, type, id } = props;

    const navigation = useNavigation();

    const { accessToken } = useAuth();

    const [loading, setLoading] = useState(false);

    const sendMedia = async () => {

        try {

            setLoading(true);     
            
            const file = imageExpoFormat(photo.uri);

            if (type === 'chat') {
                await chatMessageController.sendImage(accessToken, id, file);
            };

            setLoading(false);

            navigation.goBack();

        } catch (error) {
            console.error(error);
        };

    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: photo.uri }}
                alt='photo'
                style={styles.photo}
            />
            <View style={styles.topAction}>
                <IconButton icon={null} />
                <IconButton
                    icon={
                        <CloseIcon
                            onPress={navigation.goBack}
                            style={styles.icon}
                            size={8}
                        />
                    }
                />
                <IconButton icon={null} />
            </View>
            <View style={styles.bottomAction}>
                <IconButton icon={null} />
                {loading ?
                    <Spinner size='lg' />
                    :
                    <IconButton
                        onPress={sendMedia}
                        icon={
                            <Icon
                                as={MaterialCommunityIcons}
                                size={20}
                                name='check-circle-outline'
                                style={styles.icon}
                            />
                        }
                    />
                }
                <IconButton icon={null} />
            </View>
        </View>
    );
};