import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from '../../Constants/Routes';
import {
  ForgetPassword,
  OTP,
  ResetPassword,
  SignIn,
  SignUp,
} from '../../Screens';
import {useSelector} from 'react-redux';
import DrawerNavigation from '../Drawer';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const userData = useSelector(
    state => state.getUserData.data?.data?.user_fields?.center_id,
  );

  return userData ? <DrawerNavigation /> : <AuthNavigation />;
}

export default AppNavigation;

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Routes.SignUp} component={SignUp} />
        <Stack.Screen name={Routes.SignIn} component={SignIn} />
        <Stack.Screen name={Routes.ForgetPassword} component={ForgetPassword} />
        <Stack.Screen name={Routes.OTP} component={OTP} />
        <Stack.Screen name={Routes.ResetPassword} component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
