import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Loader} from '../../Components';
import {fetchUserWeightHistory} from '../../Redux/Slices/GraphSlice';
import {useDispatch, useSelector} from 'react-redux';

const WeightHistoryGraph = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state?.signIn?.data?.api_token);
  const userWeightHistoryData = useSelector(
    state => state?.getUserWeightHistory?.data,
  );
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const loading = useSelector(state => state?.getUserWeightHistory?.loading);
  const getCurrentMonth = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    return month;
  };

  const getCurrentYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  };

  useEffect(() => {
    setMonth(getCurrentMonth());
    setYear(getCurrentYear());
  }, []);

  useEffect(() => {
    dispatch(fetchUserWeightHistory({token, month, year}));
  }, []);

  const data = userWeightHistoryData?.weight_data?.datasets[0]?.data || [];

  const randomData = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ];

  return loading ? (
    <Loader />
  ) : (
    <>
      <View style={styles.container}>
        <Text>Weight Loss Chart</Text>
        <LineChart
          data={{
            labels: data?.map((value, index) => {
              if (value !== null) {
                return index;
              }
              return null;
            }),

            datasets: [
              {
                data: data?.length > 0 ? data : randomData,
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 0.2) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          hidePointsAtIndex={data?.map((value, index) =>
            value === null ? index : null,
          )}
          propsForLabels={styles.proplabelStyle}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proplabelStyle: {
    fontSize: 8,
    margin: 5,
    fontWeight: 'bold',
  },
});

export default WeightHistoryGraph;
