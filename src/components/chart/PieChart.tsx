import { ArcElement, Chart as ChartJS, Colors, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import { selector } from '@/redux';
import { selectHoldingsValueList } from '@/redux/Data/DataRedux';

ChartJS.register(ArcElement, Tooltip, Colors);

export const PieChart = () => {
  const { currentData } = useSelector(selector.data);

  const HoldingsValueList = selectHoldingsValueList(currentData);

  const chartData = {
    labels: currentData.map((item: any) => item.symbol.toUpperCase()),
    datasets: [
      {
        label: '$',
        data: HoldingsValueList,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-64">
      <Pie data={chartData} />
    </div>
  );
};
