import React, { useState } from 'react';
import { Button, Card, Col, Row, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import style from './Home.module.scss';
import classNames from 'classnames/bind';
import ReactApexChart from 'react-apexcharts';

const cx = classNames.bind(style);

// Các options và series cho biểu đồ ApexCharts
const apexChartOptions = {
    chart: {
        type: 'bar',
        height: 350,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
    },
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)',
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return '$ ' + val + ' thousands';
            },
        },
    },
};

const apexChartSeries = [
    {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
];

const seriesData = [
    {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
    },
];
const options = {
    chart: {
        height: 350,
        type: 'area',
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
    },
    xaxis: {
        type: 'datetime',
        categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
        ],
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm',
        },
    },
};

const dataBieuDoTron = [44, 55, 41, 17, 15];

const optionsBieuDoTron = {
    chart: {
        type: 'donut',
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        },
    ],
};

const AdminIndex = () => {
    const [size, setSize] = useState('large');
    return (
        <>
            {/* 4 card thống kê  */}
            <Row gutter={24} className={cx('body')}>
                <Col xs={24} lg={6}>
                    <Card bordered={false} className={cx('card-top')}>
                        <Row gutter={24}>
                            <Col xs={12} lg={18}>
                                <span className={cx('title-card-top')}>Today's Moneys</span>
                                <br />
                                <span className={cx('money-card-top')}>$53,000 </span>
                                <span className={cx('char-card-top')}> +55%</span>
                            </Col>
                            <Col xs={12} lg={4}>
                                <Space wrap>
                                    <Button
                                        type="primary"
                                        className={cx('button-card-top')}
                                        icon={<DownloadOutlined />}
                                        size={size}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} lg={6}>
                    <Card bordered={false} className={cx('card-top')}>
                        <Row gutter={24}>
                            <Col xs={12} lg={18}>
                                <span className={cx('title-card-top')}>Today's Moneys</span>
                                <br />
                                <span className={cx('money-card-top')}>$53,000 </span>
                                <span className={cx('char-card-top')}> +55%</span>
                            </Col>
                            <Col xs={12} lg={4}>
                                <Space wrap>
                                    <Button
                                        type="primary"
                                        className={cx('button-card-top')}
                                        icon={<DownloadOutlined />}
                                        size={size}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} lg={6}>
                    <Card bordered={false} className={cx('card-top')}>
                        <Row gutter={24}>
                            <Col xs={12} lg={18}>
                                <span className={cx('title-card-top')}>Today's Moneys</span>
                                <br />
                                <span className={cx('money-card-top')}>$53,000 </span>
                                <span className={cx('char-card-top')}> +55%</span>
                            </Col>
                            <Col xs={12} lg={4}>
                                <Space wrap>
                                    <Button
                                        type="primary"
                                        className={cx('button-card-top')}
                                        icon={<DownloadOutlined />}
                                        size={size}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} lg={6}>
                    <Card bordered={false} className={cx('card-top')}>
                        <Row gutter={24}>
                            <Col xs={12} lg={18}>
                                <span className={cx('title-card-top')}>Today's Moneys</span>
                                <br />
                                <span className={cx('money-card-top')}>$53,000 </span>
                                <span className={cx('char-card-top')}> +55%</span>
                            </Col>
                            <Col xs={12} lg={4}>
                                <Space wrap>
                                    <Button
                                        type="primary"
                                        className={cx('button-card-top')}
                                        icon={<DownloadOutlined />}
                                        size={size}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={16}>
                    <Card bordered={false} className={cx('card-top')}>
                        <div id="chart">
                            <span>
                                <span className={cx('money-card-top')}>Biểu đồ thống kê doanh thu</span>
                                <br />
                                <span className={cx('char-card-top')}>5% hơn </span>
                                <span className={cx('title-card-top')}>năm 2023 </span>
                            </span>
                            <ReactApexChart
                                options={apexChartOptions} // Sử dụng options từ biến apexChartOptions
                                series={apexChartSeries} // Sử dụng series từ biến apexChartSeries
                                type="bar"
                                height={350}
                                style={{ maxWidth: '720px' }}
                            />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card bordered={false} className={cx('card-chart-donut')}>
                        {/*  */}
                        <div id="chart">
                            <span>
                                <span className={cx('money-card-top')}>Biểu đồ thống kê số lượng vé</span>
                                <br />
                                <span className={cx('char-card-top')}>5% hơn </span>
                                <span className={cx('title-card-top')}>trong 2023 </span>
                            </span>
                            <div className="chart-donut">
                                <ReactApexChart
                                    options={optionsBieuDoTron}
                                    series={dataBieuDoTron}
                                    type="donut"
                                    style={{ maxWidth: '300px', marginTop: '50px' }}
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={24}>
                    <Card bordered={false} className={cx('card-chart-donut')}>
                        <div>
                            <span>
                                <span className={cx('money-card-top')}>Biểu đồ thống kê số lượng vé</span>
                                <br />
                                <span className={cx('char-card-top')}>5% hơn </span>
                                <span className={cx('title-card-top')}>trong 2023 </span>
                            </span>
                            <ReactApexChart
                                options={options}
                                series={seriesData}
                                type="area"
                                style={{ maxWidth: '1155px', marginLeft: '-10px' }}
                                height={350}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default AdminIndex;
