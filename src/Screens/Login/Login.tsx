import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from './Styles';
import { ButtonC, InputC } from '../../Components/Components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Action/UserAction';

const Login = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const { colors } = useTheme();
  const dispatch = useDispatch<any>();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').max(16, 'Password must be at most 16 characters').required('Password is required'),
  });

  const handleLogin = async (email: string, password: string) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await dispatch(login(email, password));
      if (response?.success) {
        setTimeout(() => {
          setLoading(false);
        }, 900);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while login');
      return;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleLogin(values.email, values.password);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <KeyboardAvoidingView style={styles.avoidingContainer} behavior='padding'>
            <ScrollView contentContainerStyle={styles.loginContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

              {/* header title */}
              <Text variant='headlineSmall' style={{ alignSelf: 'center' }}>Login</Text>

              {/* login form */}
              <View style={styles.bodyContainer}>
                <InputC
                  label='Email'
                  placeholder='Enter
                               your email'
                  mode='outlined'
                  vaule={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                />
                <View>
                  <InputC
                    label='Password'
                    placeholder='Enter your password'
                    mode='outlined'
                    vaule={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && errors.password}
                  />

                  <Text variant='titleMedium' style={{ paddingTop: 6, alignSelf: 'flex-end' }}>Forgot Password?</Text>
                </View>

                <ButtonC
                  loading={loading}
                  disabled={loading}
                  title='Login'
                  mode='contained'
                  textColor="white"
                  buttonStyle={{ borderRadius: 8, padding: 4, backgroundColor: colors.secondary }}
                  onPress={handleSubmit}
                />
              </View>

              {/* sign up */}
              <View style={styles.footerContainer}>
                <Text variant='bodyMedium'>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace('Signup')}>
                  <Text variant='bodyMedium' style={{ color: colors.secondary, marginLeft: 4 }}>Sign Up</Text>
                </TouchableOpacity>
              </View>


            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  )
}

export default Login;
