import { View } from 'react-native';
import { Input, Button } from 'native-base';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
import { initialValues, validationSchema } from './ChangeLastnameScreen.form.js';
import { styles } from './ChangeLastnameScreen.styles.js';

const userController = new User();

export function ChangeLastnameScreen() {

    const navigation = useNavigation();

    const { accessToken, updateUser } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {

            try {

                const dataUser = { lastname: formValue.lastname };

                await userController.updateUser(accessToken, dataUser);

                updateUser('lastname', formValue.lastname);

                navigation.goBack();


            } catch (error) {
                console.error(error);
            };

        }
    });

    return (
        <View style={styles.content}>
            <Input
                placeholder='Nombre'
                variant='underlined'
                autoFocus
                value={formik.values.lastname}
                onChangeText={(text) => formik.setFieldValue('lastname', text)}
                style={[styles.input, formik.errors.lastname && styles.inputError]}
            />
            <Button
                style={[styles.btn]}
                onPress={formik.handleSubmit}
                isLoading={formik.isSubmitting}
            >
                Cambiar
            </Button>
        </View>
    );
};