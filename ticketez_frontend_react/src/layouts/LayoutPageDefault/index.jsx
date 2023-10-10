import { Card } from 'antd';
import style from './LayoutPageDefault.module.scss';
import classNames from 'classnames/bind';
import Bread from '~/layouts/Admin/Breadcrumb/Breadcrumb';

const cx = classNames.bind(style);

function LayoutPageDefault({ children, path = '' }) {
    return (
        <>
            <Card bordered={false} className={cx('card-Breadcrumb')}>
                <Bread path={path} />
            </Card>
            <Card bordered={false} className={cx('card-content-page')}>
                {children}
            </Card>
        </>
    );
}

export default LayoutPageDefault;
