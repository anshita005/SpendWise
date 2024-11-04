// TransactionChart.js
import React from 'react';
import { Pie } from '@ant-design/charts';

const TransactionChart = ({ transactions }) => {
  const data = transactions.map(transaction => ({
    type: transaction.category,
    value: transaction.amount,
  }));

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
    color: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], // Custom colors for the pie chart
  };

  return <Pie {...config} />;
};

export default TransactionChart;
