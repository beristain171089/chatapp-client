import { View } from 'react-native';
import { Spinner, VStack, Heading } from 'native-base';

export function LoadingScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size='lg' />
            <Heading color='primary.500' fontSize='md' marginTop={2}>
                Cargando
            </Heading>
        </View>
    );
};