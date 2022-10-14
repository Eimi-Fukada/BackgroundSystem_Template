import type { FC } from 'react';
import React, { memo } from 'react';
import styles from './index.module.less';
import { BussinessProps } from './const';
import { ViewModel } from './viewModel';
import { Area, Rose } from '@ant-design/plots';
import BreadCrumb from '@/components/BreadCrumb';
import { AreaMap, HexbinMap } from '@ant-design/maps';

const Component: FC<BussinessProps> = () => {
  const { data, Hexbin = [] } = ViewModel();

  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };

  const HexbinMapconfig = {
    map: {
      type: 'mapbox',
      style: 'dark',
      pitch: 43,
      center: [120.13383079335335, 29.9],
      zoom: 8.2,
    },
    source: {
      data: Hexbin,
      parser: {
        type: 'csv',
        x: 'lng',
        y: 'lat',
      },
      aggregation: {
        field: 'v',
        radius: 2500,
        method: 'sum',
      },
    },
    shape: 'hexagonColumn',
    size: {
      field: 'sum',
      value: ({ sum }: { sum: number }) => {
        return sum * 200;
      },
    },
    color: {
      field: 'sum',
      value: [
        '#094D4A',
        '#146968',
        '#1D7F7E',
        '#289899',
        '#34B6B7',
        '#4AC5AF',
        '#5FD3A6',
        '#7BE39E',
        '#A1EDB8',
        '#C3F9CC',
        '#DEFAC0',
        '#ECFFB1',
      ],
    },
    style: {
      coverage: 0.8,
      angle: 0,
      opacity: 1.0,
    },
  };

  const roseData = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];

  const roseconfig = {
    data: roseData,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: {
      position: 'bottom',
    },
  };

  return (
    <>
      <BreadCrumb />
      <div className={styles.page}>
        <div className={styles.left}>
          <div className={styles.left_top}>
            <Area {...config} />
          </div>
          <div className={styles.left_bottom}>
            <HexbinMap {...HexbinMapconfig} />
          </div>
        </div>
        <div className={styles.right}>
          <Rose {...roseconfig} />
        </div>
      </div>
    </>
  );
};

const Bussiness = memo(Component);
export default Bussiness;
