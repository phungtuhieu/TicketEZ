import React, { useRef, useState, useEffect } from 'react';
import {
    Button,
    Input,
    Space,
    Col,
    Row,
    Form,
    message,
    Popconfirm,
    DatePicker,
    Tag,
    Switch,
    Select,
    Upload,
    Descriptions,
    Pagination,
} from 'antd';
import Image from 'antd/lib/image';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Event.module.scss';
import axiosClient from '~/api/global/axiosClient';
import moment from 'moment';
import CustomCKEditor from '~/pages/Templates/Ckeditor';
import { eventApi } from '~/api/admin';
import uploadApi from '~/api/service/uploadApi';
import funcUtils from '~/utils/funcUtils';
const { RangePicker } = DatePicker;

const cx = classNames.bind(style);

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const AdminShowtime = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [checkNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [posts, setPosts] = useState([]);

    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tạif
    const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang
    const [workSomeThing, setWorkSomeThing] = useState(false);

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await eventApi.getPage(currentPage, pageSize);
                setPosts(res.data);
                setTotalItems(res.totalItems);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getList();
    }, [currentPage, pageSize, workSomeThing]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Nhập để tìm`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        làm mới
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        thoát
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            width: '10%',
            defaultSortOrder: 'sorting',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },

        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            render: (startTime) => {
                return startTime ? moment(startTime).format('DD-MM-YYYY HH:mm:ss') : '';
            },
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            render: (endTime) => {
                return endTime ? moment(endTime).format('DD-MM-YYYY HH:mm:ss') : '';
            },
        },
        {
            title: 'Banner',
            dataIndex: 'banner',
            width: '10%',
            render: (_, record) => (
                <Space size="middle">
                    <Image
                        src={`http://localhost:8081/api/upload/${record.banner}`}
                        alt="không có ảnh"
                        width={65}
                        loading="lazy"
                    />
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => {
                const statusText = record.status === true ? 'Hoạt động' : 'Kết thúc';
                const tagColor = record.status === true ? 'green' : 'red';

                return <Tag color={tagColor}>{statusText}</Tag>;
            },
            onFilter: (value, record) => record.status === (value === 'true'), // Assuming 'value' is a string like 'true' or 'false'
            filters: [
                { text: 'Hoạt động', value: 'true' },
                { text: 'Kết thúc', value: 'false' },
            ],
            filterMultiple: false,
        },

        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={faPen}
                        className={cx('icon-pen')}
                        onClick={() => {
                            handleEditData(record);
                        }}
                    />

                    <Popconfirm
                        title="Bạn có chắc"
                        description="Muốn xoá hay không?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record)}
                    >
                        <FontAwesomeIcon icon={faTrash} className={cx('icon-trash')} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        form.resetFields();
        setEditData(null);
        setOpen(true);
        setResetForm(true);

        setFileList([]);
        form.setFieldsValue({
            status: true,
            'range-time-picker': [],
        });
    };

    const handleDelete = async (record) => {
      try {
          const res = await eventApi.delete(record.id);
          console.log(res);
          if (res.status === 200) {
            if(fileList.length > 0) {
                await uploadApi.deleteUpload(record.banner);
            }
              funcUtils.notify(res.data, 'success');
          }
      } catch (error) {
          console.log(error);
          if (error.response.status === 409) {
              funcUtils.notify(error.response.data, 'error');
          }
      }
      setWorkSomeThing(!workSomeThing);
    };

    const handleEditData = (record) => {
        const formattedStartTime = record.startDate ? moment(record.startDate) : null;
        const formattedEndTime = record.endDate ? moment(record.endDate) : null;

        const newUploadFile = {
            uid: record.id.toString(),
            url: `http://localhost:8081/api/upload/${record.banner}`,
        };
        setFileList([newUploadFile]);
        form.setFieldsValue({
            ...record,
            status: record.status === true,
            cinemaComplex: record.cinemaComplex?.id,
            'range-time-picker': [formattedStartTime, formattedEndTime],
        });

        setDataStartTime(formattedStartTime);
        setDataEndTime(formattedEndTime);
        setStatusValue(record.status);
        setOpen(true);
        setResetForm(false);
        setEditData(record);
    };

    const [dataStartTime, setDataStartTime] = useState();
    const [dataEndTime, setDataEndTime] = useState();
    const [statusValue, setStatusValue] = useState(true);
    const onChangeDate = (dates) => {
        if (dates && dates.length === 2) {
            setDataStartTime(dates[0]);
            setDataEndTime(dates[1]);
        }
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            if (fileList.length > 0) {
                console.log(values);
                if (editData) {
                    let putData = {
                        id: editData.id,
                        ...values,
                        startDate: new Date(dataStartTime),
                        endDate: new Date(dataEndTime),
                    };
                    console.log(putData);
                    if (putData.banner.file) {
                        const file = putData.banner.fileList[0].originFileObj;
                        const images = await uploadApi.putUpload(editData.banner, file);
                        putData = {
                            ...putData,
                            banner: images,
                        };
                    }

                    try {
                        const resPut = await eventApi.put(putData.id, putData , putData.cinemaComplex);
                        if (resPut.status === 200) {
                            funcUtils.notify('Cập nhật sự kiện thành công', 'success');
                        }
                    } catch (error) {
                        if (error.status === 500) {
                            funcUtils.notify('Lỗi máy chủ nội bộ, vui lòng thử lại sau!', 'error');
                        }
                        console.log(error);
                    }
                      setWorkSomeThing(!workSomeThing);
                } else {
                    try {
                        const file = values.banner.fileList[0].originFileObj;
                        const images = await uploadApi.postUpload(file);
                        const postData = {
                            ...values,
                            startDate: new Date(dataStartTime),
                            endDate: new Date(dataEndTime),
                            banner: images,
                        };
                        console.log(postData);
                        const resPost = await eventApi.post(postData, postData.cinemaComplex);
                        console.log('resPost', resPost);
                        if (resPost.status === 200) {
                            funcUtils.notify('Thêm sự kiện thành công', 'success');
                        }
                    } catch (error) {
                        if (error.status === 500) {
                            funcUtils.notify('Lỗi máy chủ nội bộ, vui lòng thử lại sau!', 'error');
                        }
                        // upload
                        if (error.response.data.error) {
                            funcUtils.notify(error.response.data.error, 'error');
                        }
                        console.log(error);
                    }
                }
                setOpen(false);
                form.resetFields();
                setLoading(false);
                setFileList([]);
                setWorkSomeThing(!workSomeThing);
            } else {
                setLoading(false);
                message.error('vui lòng chọn ảnh');
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    useEffect(() => {
        apiSelectCinemaComplex();
    }, []);

    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
        console.log(form);
    };
        const handlePageChange = (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
        };
    const [selectCinemaComplex, setSelectCinemaComplex] = useState();
    const apiSelectCinemaComplex = async () => {
        try {
            const resp = await axiosClient.get(`cinemaComplex`);
            setSelectCinemaComplex(resp.data.data);
        } catch (error) {
            console.error('Error fetching province data:', error);
        }
    };

    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };

    const propsUpload = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const onChangeUpload = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (data) => {
        setEditorData(data);
    };

    const itemsDescriptions = (record) => [
        {
            key: '1',
            label: 'Id',
            children: record.id,
        },
        {
            key: '2',
            label: 'Tên',
            children: record.name,
        },
        {
            key: '3',
            label: 'Ngày bắt đầu',
            children: moment(record.startDate).format('DD/MM/YYYY'),
        },
        {
            key: '4',
            label: 'Ngày kết thúc',
            children: moment(record.endDate).format('DD/MM/YYYY'),
        },
        {
            key: '7',
            label: 'Cụm rạp',
            children: record.cinemaComplex.name,
        },
        {
            key: '6',
            label: 'Trạng thái',
            children: record.status === true ? 'Hoạt động' : 'Kết thúc',
        },
        {
            key: '5',
            label: 'Ảnh',
            children: (
                <Image
                    src={`http://localhost:8081/api/upload/${record.banner}`}
                    alt={record.banner}
                    width={65}
                    style={{ marginTop: '-10px' }}
                />
            ),
        },
        {
            key: '8',
            label: 'Mô tả',
            children: record.description !== null && (
                <span dangerouslySetInnerHTML={{ __html: record.description }} style={{ marginTop: '-15px' }} />
            ),
        },
    ];

    return (
        <div>
            <Row>
                <Col span={22}>
                    <h1 className={cx('title')}>Bảng dữ liệu</h1>
                </Col>
                <Col span={2}>
                    <Button type="primary" className={cx('button-title')} icon={<PlusOutlined />} onClick={showModal}>
                        Thêm
                    </Button>
                </Col>
                <BaseModal
                    open={open}
                    width={'60%'}
                    title={editData ? 'Cập nhật' : 'Thêm mới'}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Thoát
                        </Button>,
                        resetForm && (
                            <Button key="reset" onClick={handleResetForm}>
                                Làm mới
                            </Button>
                        ),
                        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                            {editData ? 'Cập nhật' : 'Thêm mới'}
                        </Button>,
                    ]}
                >
                    <Form form={form} style={{ maxWidth: 1000 }} {...formItemLayout}>
                        <Form.Item label="Trạng thái" name="status">
                            <Switch
                                checked={statusValue === true}
                                onChange={(checked) => setStatusValue(checked ? true : false)}
                                checkedChildren={'Đang hoạt động'}
                                unCheckedChildren={'Kết Thúc '}
                                defaultChecked
                            />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Chọn Banner"
                            name="banner"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                        >
                            <Upload
                                {...propsUpload}
                                listType="picture-card"
                                onChange={onChangeUpload}
                                onPreview={onPreview}
                                fileList={fileList}
                                name="icon"
                                maxCount={1}
                            >
                                {fileList.length < 2 && '+ Upload'}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="name"
                            label="Chọn phim"
                            rules={[{ required: true, message: 'Vui lòng chọn phim' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="range-time-picker" label="Ngày giờ" {...rangeConfig}>
                            <RangePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                value={[dataStartTime, dataEndTime]}
                                onChange={onChangeDate}
                            />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            name="cinemaComplex"
                            label="Chọn phim"
                            rules={[{ required: true, message: 'Vui lòng chọn phim' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn loại"
                                optionFilterProp="children"
                                // onChange={onchangeSelectLoaiVanBan}
                                //onSearch={onSearchSelectBox}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={selectCinemaComplex?.map((cinemaComplex) => ({
                                    value: cinemaComplex.id,
                                    label: cinemaComplex.name,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="description"
                            label="Chọn rạp"
                            rules={[{ required: true, message: 'Vui lòng chọn rạp' }]}
                        >
                            <CustomCKEditor value={editorData} onChange={handleEditorChange} />
                        </Form.Item>
                    </Form>
                </BaseModal>
            </Row>
            <BaseTable
                pagination={false}
                columns={columns}
                onClick={() => {
                    handleDelete();
                }}
                dataSource={posts.map((post) => ({
                    ...post,
                    key: post.id,
                }))}
                expandable={{
                    expandedRowRender: (record) => (
                        <Descriptions title="Thông tin chi tiết" items={itemsDescriptions(record)} />
                    ),
                }}
            />
            <div className={cx('wrapp-pagination')}>
                <Pagination
                    style={{ float: 'right', marginTop: '10px' }}
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AdminShowtime;
