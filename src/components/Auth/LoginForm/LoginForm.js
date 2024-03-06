import { View } from 'react-native';
import { Input, Button } from 'native-base';
import { useFormik } from 'formik';
import { Auth } from '../../../api';
import { useAuth } from '../../../hooks';
import { initialValues, validationSchema } from './LoginForm.form.js';
import { styles } from './LoginForm.styles.js';

const authController = new Auth();

export function LoginForm() {

    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {

            try {

                const response = await authController.login(formValue.email, formValue.password);

                const { access, refresh } = response;

                await authController.setAccessToken(access);
                await authController.setRefreshToken(refresh);

                await login(access);

            } catch (error) {
                console.error(error);
            };

        }
    });

    return (
        <View>
            <View style={styles.viewInput}>
                <Input
                    placeholder='Correo electronico'
                    variant='unstyled'
                    autoCapitalize='none'
                    value={formik.values.email}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                    style={[styles.input, formik.errors.email && styles.inputError]}
                />
            </View>
            <Input
                placeholder='Contraseña'
                variant='unstyled'
                autoCapitalize='none'
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                style={[styles.input, formik.errors.password && styles.inputError]}
            />
            <Button
                style={styles.btn}
                onPress={formik.handleSubmit}
                isLoading={formik.isSubmitting}
            >
                ENTRAR
            </Button>
        </View>
    );
};