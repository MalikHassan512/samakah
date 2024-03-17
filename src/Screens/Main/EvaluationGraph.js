import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BarChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {Colors} from '../../Constants';

const EvaluationGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const evaluationGraphData = useSelector(
    state => state?.fetchEvaluationGraphData?.data,
  );
  const labels = evaluationGraphData.labels;
  const datasets = evaluationGraphData.datasets;

  useEffect(() => {
    if (evaluationGraphData?.datasets?.length) {
      if (!graphData.length > 0) {
        for (let i = 0; i < labels.length; i++) {
          for (let j = 0; j < datasets.length; j++) {
            const isFirstObject = j === 0;

            graphData.push({
              value: datasets[j].data[i],
              ...(isFirstObject ? {label: labels[i]} : {}), // Include label only in the first object
              spacing: 2,
              labelWidth: 30,
              labelTextStyle: {color: 'white'},
              //ever week has different color
              frontColor: isFirstObject
                ? '#177AD5'
                : j === 1
                ? '#ED6665'
                : j === 2
                ? '#F29C6E'
                : j === 3
                ? '#F2C06E'
                : '#F2E06E',
            });
          }
        }
      }
    }
  }, [evaluationGraphData]);

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.monthText}>Month</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={graphData}
            barWidth={16}
            initialSpacing={5}
            spacing={2}
            barBorderRadius={4}
            showGradient
            yAxisThickness={0}
            xAxisType={'dashed'}
            xAxisColor={'lightgray'}
            xAxisLabelTextsColor={'white'}
            xAxisIndicesColor={{color: 'white'}}
            yAxisTextStyle={{color: 'lightgray'}}
            stepValue={1}
            maxValue={6}
            noOfSections={6}
            yAxisLabelTexts={['0', '1', '2', '3', '4', '5', '6', '7']}
            labelWidth={40}
            labelTextStyle={styles.labelTextStyle}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.darkBlue,
  },
  monthText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  chartContainer: {padding: 20, alignItems: 'center'},
  labelTextStyle: {color: Colors.white},
});

export default EvaluationGraph;
