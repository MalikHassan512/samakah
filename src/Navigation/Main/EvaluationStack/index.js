import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Evaluation, EvaluationGraph} from '../../../Screens';

const Stack = createNativeStackNavigator();

const EvaluationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EvaluationScreen" component={Evaluation} />
      <Stack.Screen name="EvaluationGraph" component={EvaluationGraph} />
    </Stack.Navigator>
  );
};

export default EvaluationStack;
