import { Breadcrumb, Card } from 'antd';
import style from './LayoutPageDefault.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function LayoutPageDefault({ children, itemsBreadcrumb }) {
    return (
        <>
            <Card bordered={false} className={cx('card-Breadcrumb')}>
                <Breadcrumb items={itemsBreadcrumb} />
            </Card>
            <Card bordered={false} className={cx('card-content-page')}>
                {children}
            </Card>
        </>
    );
}

export default LayoutPageDefault;
