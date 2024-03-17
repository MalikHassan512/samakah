import {View, Text, FlatList} from 'react-native';
import React from 'react';

const FormQuestionnaires = ({data}) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default FormQuestionnaires;
