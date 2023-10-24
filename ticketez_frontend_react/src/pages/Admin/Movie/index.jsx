import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import countriesJson from '~/data/countries.json';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Image,
    Input,
    Modal,
    Popconfirm,
    Row,
    Select,
    Space,
    TimePicker,
    Upload,
    message,
} from 'antd';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';

import style from './Movie.module.scss';
import classNames from 'classnames/bind';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosClient from '~/api/global/axiosClient';
import Highlighter from 'react-highlight-words';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import PaginationCustom from '~/components/Admin/PaginationCustom';
import { movieApi, movieStudioApi } from '~/api/admin';
import '~/scss/_global.scss';
import moment from 'moment';
import uploadApi from '~/api/service/uploadApi';
import httpStatus from '~/api/global/httpStatus';
import movieProducerApi from '~/api/admin/managementMovie/movieProducerApi';
import mpaaRatingApi from '~/api/admin/managementMovie/mpaaRating';
import funcUtils from '~/utils/funcUtils';
import genreApi from '~/api/admin/managementMovie/genreApi';
import { useSearchSelectEffect } from '~/hooks';

const cx = classNames.bind(style);
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
function AdminMovie() {
    const formatDate = 'DD-MM-YYYY';
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [list, setList] = useState([]);
    const [movieStudios, setMovieStudios] = useState([]);
    const [movieProducers, setMovieProducers] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [searchValue, setSearchValue] = useState({
        searchMovieStudio: '',
        searchGenre: '',
        searchMovieProducer: '',
    });
    const [initialOptions, setInitialOptions] = useState({
        movieStudios: [],
        genres: [],
        movieProducers: [],
    });
    const [listMPAA, setListMPAA] = useState([]);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10);
    const [workSomething, setworkSomething] = useState(10);
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingStates, setLoadingStates] = useState({ movieStudio: false, genre: false, movieProducer: false });
    const [isSearch, setIsSearch] = useState(false);

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 20 },
    };

    // Xem hình ảnh
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleCancelPreview = () => setPreviewOpen(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoadingButton(true);
        try {
            const values = await form.validateFields();
            let movieStudioForm = movieStudios.find((studio) => studio.id === values.movieStudio);
            let movieProducerForm = movieProducers.find((mProducer) => mProducer.id === values.movieProducer);
            let mpaaForm = listMPAA.find((mProducer) => mProducer.id === values.movieProducer);
            let selectsValue = {
                movieProducer: movieProducerForm,
                movieStudio: movieStudioForm,
                mpaaRating: mpaaForm,
            };
            if (fileList.length > 0) {
                if (!dataEdit) {
                    try {
                        let imageName = await uploadApi.post(values.poster.fileList[0].originFileObj);
                        let movieCreate = {
                            ...values,
                            releaseDate: values.releaseDate.format('YYYY-MM-DD'),
                            duration: values.duration.format('HH:mm:ss'),
                            ...selectsValue,
                            rating: 0.0,
                            poster: imageName,
                        };
                        // console.log(dataCreate);
                        const resp = await movieApi.create(movieCreate);
                        setLoadingButton(false);
                        handleResetForm();
                        setworkSomething(!workSomething);
                        if (resp.status === httpStatus.OK) {
                            funcUtils.notify('Đã thêm phim thành công', 'success');
                        }
                        setIsModalOpen(false);
                    } catch (error) {
                        setLoadingButton(false);
                        if (error.hasOwnProperty('response')) {
                            funcUtils.notify(error.response.data, 'error');
                        } else {
                            funcUtils.notify('thất bại', 'error');
                            console.log(error);
                        }
                    }
                } else {
                    console.log('Cập nhật', values);
                    try {
                        let imageName = null;
                        if (fileList[0].hasOwnProperty('originFileObj')) {
                            // console.log('ádfjahsfashjfas', fileList[0].originFileObj);
                            imageName = await uploadApi.put(dataEdit.poster, fileList[0].originFileObj);
                            // imageName = 'ss';
                        }
                        const dataUpdate = {
                            ...values,
                            releaseDate: values.releaseDate.format('YYYY-MM-DD'),
                            duration: values.duration.format('HH:mm:ss'),
                            ...selectsValue,
                            poster: imageName != null ? imageName : values.poster,
                            rating: dataEdit.rating,
                            id: dataEdit.id,
                        };
                        console.log(dataUpdate);
                        const resp = await movieApi.update(dataEdit.id, dataUpdate);
                        setLoadingButton(false);
                        setList(list.map((item) => (item.id === dataEdit.id ? resp.data : item)));
                        setworkSomething(!workSomething);
                        if (resp.status === httpStatus.OK) {
                            funcUtils.notify('Cập nhật phim thành công', 'success');
                        }
                        form.setFieldValue(resp.data);
                    } catch (error) {
                        setLoadingButton(false);
                        if (error.hasOwnProperty('response')) {
                            funcUtils.notify(error.response.data, 'error');
                        } else {
                            funcUtils.notify('Cập nhật phim thất bại', 'error');
                            console.log(error);
                            console.log('image', error.values);
                        }
                    }
                }
            } else {
                funcUtils.notify('Vui lòng chọn ảnh', 'error');
                setLoadingButton(false);
            }
        } catch (error) {
            console.log(error);
            setLoadingButton(false);
        }
    };
    const handleResetForm = () => {
        setFileList([]);
        form.resetFields();
    };
    const handleCancelModal = () => {
        setIsModalOpen(false);
        handleResetForm();
        if (dataEdit != null) {
            setDataEdit(null);
        }
    };
    const handleEditData = async (record) => {
        setFileList([
            {
                uid: record.id.toString(),
                name: record.poster,
                url: uploadApi.get(record.poster),
            },
        ]);
        setPreviewTitle(`Poster của phim ${record.title}`);
        setIsModalOpen(true);
        setDataEdit(record);
        form.setFieldsValue({
            ...record,
            movieStudio: record.movieStudio.id,
            movieProducer: record.movieProducer.id,
            mpaaRating: record.mpaaRating.id,
            releaseDate: dayjs(record.releaseDate, 'DD-MM-YYYY'),
            duration: dayjs(record.duration, 'HH:mm:ss'),
        });
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        console.log(selectedKeys);
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleDelete = async (id) => {
        setLoadingButton(true);
        try {
            const resp = await axiosClient.delete(`movie/${id}`);
            if (resp.status === 200) {
                setLoadingButton(false);
                funcUtils.notify('Đã xoá phim thành công', 'success');
                setworkSomething(!workSomething);
            }
        } catch (error) {
            if (error.hasOwnProperty('response')) {
                funcUtils.notify(error.response.data, 'error');
            } else {
                funcUtils.notify('Xảy ra lỗi, không thể xoá', 'error');
                console.log(error);
            }
            setLoadingButton(false);
        }
    };

    // Load table
    useEffect(() => {
        const pageNoDefault = 1;
        const pageSizeDefault = 20;
        const fetchData = async () => {
            try {
                const [movieResp, movieStudioResp, movieProducerResp, mpaaResp, genreResp] = await Promise.all([
                    movieApi.getByPage(currentPage, pageSize),
                    movieStudioApi.getByPage(pageNoDefault, pageSizeDefault),
                    movieProducerApi.getByPage(pageNoDefault, pageSizeDefault),
                    mpaaRatingApi.getByPage(pageNoDefault, pageSizeDefault),
                    genreApi.getByPage(pageNoDefault, pageSizeDefault),
                ]);
                console.log(genreResp.data);
                const movieStudioOptions = movieStudioResp.data;
                const genreData = genreResp.data;
                const movieProducerData = movieProducerResp.data;
                setInitialOptions((prev) => ({ ...prev, movieStudios: movieStudioOptions }));
                setInitialOptions((prev) => ({ ...prev, genres: genreData }));
                setInitialOptions((prev) => ({ ...prev, movieProducers: movieProducerData }));
                setGenreOptions(genreData);
                setMovieStudios(movieStudioOptions);
                setMovieProducers(movieProducerData);
                setListMPAA(mpaaResp.data);
                const formatData = movieResp.data.map((item) => ({
                    ...item,
                    releaseDate: moment(item.releaseDate, 'YYYY-MM-DD').format(formatDate),
                }));
                setList(formatData);
                setTotalItems(movieResp.totalItem);
            } catch (error) {
                if (error.hasOwnProperty('response')) {
                    message.error(error.response.data);
                } else {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [currentPage, pageSize, workSomething]);

    useSearchSelectEffect(
        searchValue.searchMovieStudio,
        movieStudioApi,
        { setOptions: setMovieStudios, field: 'movieStudio' },
        initialOptions.movieStudios,
        { loadingStates, setLoadingStates },
        isSearch,
    );
    useSearchSelectEffect(
        searchValue.searchGenre,
        genreApi,
        { setOptions: setGenreOptions, field: 'genre' },
        initialOptions.genres,
        { loadingStates, setLoadingStates },
        isSearch,
    );
    useSearchSelectEffect(
        searchValue.searchMovieProducer,
        movieProducerApi,
        { setOptions: setMovieProducers, field: 'movieProducer' },
        initialOptions.movieProducers,
        { loadingStates, setLoadingStates },
        isSearch,
    );

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
                    placeholder={`Nhập từ khoá`}
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
                        Làm mới
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Lọc
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
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
        render: (text) =>
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
    const onChangeUpload = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log('newFileList', newFileList);
    };

    const columns = [
        {
            title: 'Tên phim',
            dataIndex: 'title',
            key: 'title',
            sorter: {
                compare: (a, b) => a.title.localeCompare(b.name),
                multiple: 4,
            },
            ...getColumnSearchProps('title'),
        },

        {
            title: 'Poster',
            dataIndex: 'poster',
            key: 'poster',
            render: (_, record) => (
                <Space size="middle">
                    <Image
                        width={105}
                        height={80}
                        style={{ objectFit: 'contain' }}
                        alt="ảnh rỗng"
                        src={uploadApi.get(record.poster)}
                    />
                </Space>
            ),
            // ...getColumnSearchProps('duration'),
        },
        {
            title: 'Thời lượng',
            dataIndex: 'duration',
            key: 'duration',
            // ...getColumnSearchProps('duration'),
        },
        {
            title: 'Ngày phát hành',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            // render: (_, record) => {
            //     const formattedDate = moment(record.releaseDate).format('DD-MM-YYYY');
            //     return <span>{formattedDate}</span>;
            // },
        },
        {
            title: 'Quốc gia',
            dataIndex: 'country',
            key: 'country',
            ...getColumnSearchProps('country'),
            render: (_, record) => {
                let i = countriesJson.findIndex((item) => item.code === record.country);
                return <span>{i > -1 ? countriesJson[i].name : record.country}</span>;
            },
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
        },

        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={solidIcons.faPen}
                        onClick={() => handleEditData(record)}
                        className={cx('icon-pen')}
                    />
                    <Popconfirm
                        title="Bạn có chắc"
                        description="Muốn xoá hay không?"
                        okText="Yes"
                        onConfirm={() => handleDelete(record.id)}
                        cancelText="No"
                    >
                        <FontAwesomeIcon icon={solidIcons.faTrash} className={cx('icon-trash')} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Vui lòng chọn thời gian!',
            },
        ],
    };
    const expandedRowRender = (record) => {
        return (
            <ul className={cx('wrapp-more-info')}>
                <li>
                    <span>
                        <b>Mô tả: </b> {record.description}
                    </span>
                </li>
                <li>
                    <span>
                        <b>Hãng phim: </b> {`${record.movieStudio.name} (${record.movieStudio.country})`}
                    </span>
                </li>
                <li>
                    <span>
                        <b>Loại phim (MPAA): </b>{' '}
                    </span>
                    {`${record.mpaaRating.ratingCode} ( ${record.mpaaRating.description})`}
                </li>
                <li>
                    <span>
                        <b>Video trailer: </b>
                        <a
                            href={record.videoTrailer}
                            className={cx('table-link-video')}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {record.videoTrailer}
                        </a>
                    </span>
                </li>
            </ul>
        );
    };
    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleSearchInput = (value, type) => {
        setIsSearch(true);
        switch (type) {
            case 'movie-studio':
                setSearchValue((prev) => ({ ...prev, searchMovieStudio: value }));
                break;
            case 'genre':
                setSearchValue((prev) => ({ ...prev, searchGenre: value }));
                break;
            case 'movie-producer':
                setSearchValue((prev) => ({ ...prev, searchMovieProducer: value }));
                break;
            default:
                console.log('Error: Không tìm thấy type của search');
                break;
        }
    };

    return (
        <>
            <Row>
                <Col span={22}>
                    <h1>Phim</h1>
                </Col>
                <Col span={2} className={cx('wrap-act-top-right')}>
                    <Button
                        type="primary"
                        size={'large'}
                        onClick={showModal}
                        icon={<FontAwesomeIcon icon={solidIcons.faPlus} />}
                    >
                        Thêm
                    </Button>
                </Col>
            </Row>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
            <BaseModal
                forceRender
                className={cx('modal-form')}
                open={isModalOpen}
                title={dataEdit ? 'Cập nhật' : 'Thêm mới'}
                width={'45%'}
                onOk={handleOk}
                onCancel={handleCancelModal}
                footer={[
                    <div key="wrapp" className={cx('wrapp-btn-modal')}>
                        <Button key="back" onClick={handleCancelModal}>
                            Thoát
                        </Button>

                        {!dataEdit && (
                            <Button key="reset" onClick={handleResetForm}>
                                Làm mới
                            </Button>
                        )}

                        <Button key="submit" type="primary" loading={loadingButton} onClick={handleOk}>
                            {dataEdit ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </div>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    {...formItemLayout}
                    style={{
                        maxWidth: 600,
                    }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên phim"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên phim!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Poster"
                        name="poster"
                        rules={[{ required: true, message: 'Vui lòng chọn poster' }]}
                    >
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            accept=".png, .jpg"
                            listType="picture-card"
                            onChange={onChangeUpload}
                            onPreview={handlePreview}
                            fileList={fileList}
                            name="poster"
                            maxCount={1}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </Form.Item>
                    <Form.Item name="duration" label="Thời lượng" {...config}>
                        <TimePicker style={{ width: 150 }} placeholder="Chọn thời lượng" />
                    </Form.Item>
                    <Form.Item
                        label="Đánh giá"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên phim!',
                            },
                        ]}
                    >
                        <Input disabled defaultValue={0.0} />
                    </Form.Item>

                    <Form.Item name="releaseDate" label="Ngày phát hành" {...config}>
                        <DatePicker placeholder="Chọn ngày phát hành" format={formatDate} />
                    </Form.Item>
                    <Form.Item name="country" label="Quốc gia" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Tìm kiếm và chọn quốc gia"
                            // onChange={onGenderChange}
                            allowClear
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                ...countriesJson.map((item) => ({
                                    value: item.code,
                                    label: item.name,
                                })),
                            ]}
                        />
                        {/* {countriesJson.map((item) => {
                                return (
                                    <Select.Option key={item.code} value={item.code}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })} */}
                        {/* </Select> */}
                    </Form.Item>
                    <Form.Item label="Hãng sản xuất" rules={[{ required: true }]} name="movieProducer">
                        <Select
                            // mode=""
                            allowClear
                            showSearch
                            placeholder="Tìm kiếm và chọn hãng sản xuât"
                            filterOption={false}
                            onSearch={(value) => handleSearchInput(value, 'movie-producer')}
                            loading={loadingStates.movieProducer}
                            options={[
                                ...movieProducers.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="movieStudio" label="Hãng phim" rules={[{ required: true }]}>
                        <Select
                            // mode=""
                            allowClear
                            showSearch
                            placeholder="Tìm kiếm và chọn hãng phim"
                            filterOption={false}
                            onSearch={(value) => handleSearchInput(value, 'movie-studio')}
                            loading={loadingStates.movieStudio}
                            options={[
                                ...movieStudios.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="genre" label="Thể loại phim" rules={[{ required: true }]}>
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Tìm kiếm và chọn loại phim"
                            allowClear
                            filterOption={false}
                            onSearch={(value) => handleSearchInput(value, 'genre')}
                            loading={loadingStates.genre}
                            options={[
                                ...genreOptions.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Loại phim" rules={[{ required: true }]} name="mpaaRating">
                        <Select
                            showSearch
                            placeholder="Tìm kiếm và chọn loại phim"
                            allowClear
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                ...listMPAA.map((item) => ({
                                    value: item.id,
                                    label: item.ratingCode,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Link trailer video"
                        name="videoTrailer"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập link video trailer!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name={'description'} label="Mô tả">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </BaseModal>
            <BaseTable
                pagination={false}
                columns={columns}
                dataSource={list.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
                expandable={{ expandedRowRender }}
            />

            <PaginationCustom
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
            />
        </>
    );
}

export default AdminMovie;
