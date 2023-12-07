import React, { useState } from 'react';
import { Tabs } from 'antd';

import classNames from 'classnames/bind';
import styles from './BookingHistory.module.scss';
import MovieTickets from './MovieTickets';

const cx = classNames.bind(styles);

function BookingHistory() {
    const [activityKey, setActivityKey] = useState('1');
    const items = [
        {
            key: '1',
            label: 'Vé xem phim',
            children: activityKey === '1' && <MovieTickets />,
        },
        {
            key: '2',
            label: 'Vé bắp nước',
            children: 'Content of Tab Pane 2',
        },
    ];
    const onChange = (key) => {
        setActivityKey(key);
        console.log(key);
    };
    return (
        <div id={cx('wrapper-booking-history')}>
            <div className={cx('wrapper-tabs')}>
                <Tabs defaultActiveKey="1" activeKey={activityKey} items={items} onChange={onChange} />
            </div>
        </div>
    );
}

export default BookingHistory;
