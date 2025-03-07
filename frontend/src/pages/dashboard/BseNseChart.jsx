import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

export default function BseNseChart({ timeFrame }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: theme.palette.mode === 'dark' ? ['#FFD700', '#FF4500'] : ['#87CEFA', '#00008B'], // Dynamic colors based on theme
      xaxis: {
        categories: timeFrame === 'month'
          ? ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10']
          : ['09:15 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:30 PM'],
        labels: {
          style: { colors: Array(10).fill(secondary) }
        },
        axisBorder: { show: true, color: line }
      },
      yaxis: {
        labels: { style: { colors: [secondary] } }
      },
      grid: { borderColor: line }
    }));
  }, [primary, secondary, line, theme, timeFrame]);

  const [series, setSeries] = useState([
    {
      name: 'BSE (Sensex)',
      data: [60000, 60200, 59950, 60500, 60350, 60100, 60450, 60700, 60950, 60800]
    },
    {
      name: 'NSE (Nifty)',
      data: [17800, 17920, 17750, 18000, 17950, 17880, 17990, 18100, 18250, 18180]
    }
  ]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

BseNseChart.propTypes = { timeFrame: PropTypes.string };
