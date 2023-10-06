import MySelect from '~/components/Admin/SelectSeach';
import classNames from 'classnames/bind';
import style from './Seat.module.scss';
import SeatChart from './SeatChart';
import { Button, Input, Space, Col, Row, Form, message, Popconfirm, Table, Card, Breadcrumb } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const cx = classNames.bind(style);
function AdminSeat() {
    return (
        <div>
            <Card bordered={false} className={cx('card-Breadcrumb')}>
                <Breadcrumb
                    items={[
                        {
                            href: '',
                            title: <HomeOutlined />,
                        },
                        {
                            href: '',
                            title: (
                                <>
                                    <VideoCameraOutlined />
                                    <span> Ghế</span>
                                </>
                            ),
                        },
                        {
                            title: 'ghế',
                        },
                    ]}
                />
            </Card>
            <Card bordered={false} className={cx('card-chart-donut')}>
                <div className={cx('rright')}>
                    <div className={cx('left')}>
                        <div className={cx('wrap')}>
                            <h3>Chọn cụm rạp</h3>

                            <MySelect
                                placeholder="Chọn cụm rạp"
                                options={[
                                    {
                                        value: '1',
                                        label: 'Cụm rạp 1',
                                    },
                                    {
                                        value: '2',
                                        label: 'Cụm rạp 2',
                                    },
                                    {
                                        value: '3',
                                        label: 'Cụm rạp 3',
                                    },
                                ]}
                            />
                        </div>
                        <div className={cx('wrap')}>
                            <h3>Chọn rạp</h3>
                            <MySelect
                                placeholder="Chọn rạp"
                                options={[
                                    {
                                        value: '1',
                                        label: 'Rạp 1',
                                    },
                                    {
                                        value: '2',
                                        label: 'Rạp 2',
                                    },
                                    {
                                        value: '3',
                                        label: 'Rạp 3',
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className={cx('right')}>
                        <SeatChart />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default AdminSeat;
