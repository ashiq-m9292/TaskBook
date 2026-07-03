import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ButtonC, InputC } from '../../Components/Components';
import styles from './Styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { signup } from '../../Redux/Action/UserAction';

const Signup = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const { colors } = useTheme();
  const dispatch = useDispatch<any>();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').max(16, 'Password must be at most 16 characters').required('Password is required'),
  });

  // handle signup
  const handleSignup = async (name: string, email: string, password: string) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await dispatch(signup(name, email, password));
      if (response?.success) {
        navigation.replace('Login');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while signup');
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
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSignup(values.name, values.email, values.password);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <KeyboardAvoidingView style={styles.avoidingContainer} behavior='padding'>
            <ScrollView contentContainerStyle={styles.signupContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>

              {/* header title */}
              <Text variant='headlineSmall' style={{ alignSelf: 'center' }}>SignUp</Text>

              {/* login form */}
              <View style={styles.bodyContainer}>
                <InputC
                  label='Username'
                  placeholder='Enter
                 your username'
                  mode='outlined'
                  vaule={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name && errors.name}
                />

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

                <InputC
                  label='Password'
                  placeholder='Enter your password'
                  mode='outlined'
                  vaule={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                />

                <ButtonC
                  loading={loading}
                  disabled={loading}
                  title='SignUp'
                  mode='contained'
                  textColor='white'
                  buttonStyle={{ borderRadius: 8, padding: 4, backgroundColor: colors.secondary }}
                  onPress={handleSubmit}
                />
              </View>

              {/* sign up */}
              <View style={styles.footerContainer}>
                <Text variant='bodyMedium'>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                  <Text variant='bodyMedium' style={{ color: colors.secondary, marginLeft: 4 }}>Log In</Text>
                </TouchableOpacity>
              </View>


            </ScrollView>
          </KeyboardAvoidingView>

        )}
      </Formik>
    </View>
  );
}

export default Signup;
