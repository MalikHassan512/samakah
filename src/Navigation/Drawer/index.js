import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../../Screens';
import EvaluationStack from '../Main/EvaluationStack';
import {NavigationContainer} from '@react-navigation/native';
import {CustomDrawer} from '../../Components';
import Routes from '../../Constants/Routes';
import UpdateProfile from '../../Screens/Main/UpdateProfile';
import WeightHistoryGraph from '../../Screens/Main/WeightHistoryGraph';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
          drawerType: 'front',
        }}>
        <Drawer.Screen name={Routes.Home} component={Home} />
        <Drawer.Screen name={Routes.Evaluation} component={EvaluationStack} />
        <Drawer.Screen name={Routes.UpdateProfile} component={UpdateProfile} />
        <Drawer.Screen
          name={Routes.WeightHistoryGraph}
          component={WeightHistoryGraph}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
