import { HomeOutlined, VideoCameraOutlined } from '@ant-design/icons';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import { LayoutPageDefault } from '~/layouts';

function AdminMovieStudio() {
    return (
        <LayoutPageDefault
            itemsBreadcrumb={[
                {
                    href: '',
                    title: <HomeOutlined />,
                },
                {
                    href: '',
                    title: (
                        <>
                            <VideoCameraOutlined />
                            <span> Rạp</span>
                        </>
                    ),
                },
                {
                    title: 'Cụm rạp',
                },
            ]}
        >
            <BaseTable />
        </LayoutPageDefault>
    );
}

export default AdminMovieStudio;
