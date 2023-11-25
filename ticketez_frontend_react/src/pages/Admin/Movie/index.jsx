import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import countriesJson from '~/data/countries.json';
import {
    Button,
    Carousel,
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
    Tag,
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
import { actorApi, directorApi, formatApi, movieApi, movieStudioApi } from '~/api/admin';
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
    const [fileListBanner, setFileListBanner] = useState([]);
    const [list, setList] = useState([]);
    const [movieStudios, setMovieStudios] = useState([]);
    const [formatOptions, setFormatOptions] = useState([]);
    const [movieProducers, setMovieProducers] = useState([]);
    const [directorOptions, setDirectorOptions] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);
    const [actorOptions, setActorOptions] = useState([]);
    const [searchValue, setSearchValue] = useState({
        searchMovieStudio: '',
        searchGenre: '',
        searchMovieProducer: '',
        searchFormat: '',
        searchActor: '',
        searchDirector: '',
    });
    const [initialOptions, setInitialOptions] = useState({
        movieStudios: [],
        genres: [],
        movieProducers: [],
        formats: [],
        actors: [],
        directors: [],
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
    const [selectDataTemp, setSelectDataTemp] = useState({
        actors: [],
        directors: [],
    });
    const [workSomething, setworkSomething] = useState(10);
    const [loadingButton, setLoadingButton] = useState(false);
    const [selectedValue, setSelectedValue] = useState({
        movieStudio: {},
        movieProducer: {},
        mpaaRating: {},
        genres: [],
        actors: [],
        formats: [],
        directors: [],
    });
    const [loadingStates, setLoadingStates] = useState({
        movieStudio: false,
        genre: false,
        movieProducer: false,
        format: false,
        actor: false,
        director: false,
    });
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
        // setLoadingButton(true);
        try {
            const values = await form.getFieldsValue();
            console.log(values, 'values');
            const { genres, formats, directors, actors, poster, ...movieData } = values;
            console.log('movieData', movieData);
            // return;
            if (fileList.length > 0 && fileListBanner.length > 0) {
                if (!dataEdit) {
                    try {
                        let imageName = await uploadApi.post(values.poster.fileList[0].originFileObj);
                        console.log(imageName);
                        let bannerName = await uploadApi.post(values.banner.fileList[0].originFileObj);
                        console.log(bannerName);
                        let dataCreate = {
                            genres: selectedValue.genres,
                            formats: selectedValue.formats,
                            directors: selectedValue.directors,
                            actors: selectedValue.actors,
                            movie: {
                                ...movieData,
                                releaseDate: movieData.releaseDate.format('YYYY-MM-DD'),
                                duration: movieData.duration.format('HH:mm:ss'),
                                rating: 0.0,
                                movieStudio: selectedValue.movieStudio,
                                movieProducer: selectedValue.movieProducer,
                                mpaaRating: selectedValue.mpaaRating,
                                poster: imageName,
                                banner: bannerName,
                            },
                        };
                        console.log('dataCreate', dataCreate);
                        const resp = await movieApi.create(dataCreate);
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
                    console.log('Cập nhật', dataEdit);
                    try {
                        let imageName = null;
                        let bannerName = null;

                        if (fileList[0].hasOwnProperty('originFileObj')) {
                            imageName = await uploadApi.put(dataEdit.poster, fileList[0].originFileObj);
                        }
                        if (fileListBanner[0].hasOwnProperty('originFileObj')) {
                            bannerName = await uploadApi.put(dataEdit.banner, fileListBanner[0].originFileObj);
                        }
                        console.log('dataEdit.banner', dataEdit.banner);

                        let dataUpdate = {
                            genres: selectedValue.genres,
                            formats: selectedValue.formats,
                            directors: (function () {
                                if (selectDataTemp.directors.length > 0) {
                                    const selects = selectedValue.directors.reduce((total, item) => {
                                        if (item != null) {
                                            total.push(item);
                                        }
                                        return total;
                                    }, []);
                                    const directors = [...selectDataTemp.directors, ...selects];
                                    return directors;
                                } else {
                                    return selectedValue.directors;
                                }
                            })(),
                            actors: (function () {
                                if (selectDataTemp.actors.length > 0) {
                                    const selects = selectedValue.actors.reduce((total, item) => {
                                        if (item != null) {
                                            total.push(item);
                                        }
                                        return total;
                                    }, []);
                                    const actors = [...selectDataTemp.actors, ...selects];
                                    return actors;
                                } else {
                                    return selectedValue.actors;
                                }
                            })(),
                            movie: {
                                ...movieData,
                                releaseDate: movieData.releaseDate.format('YYYY-MM-DD'),
                                duration: movieData.duration.format('HH:mm:ss'),
                                rating: 0.0,
                                movieStudio: selectedValue.movieStudio,
                                movieProducer: selectedValue.movieProducer,
                                mpaaRating: selectedValue.mpaaRating,
                                poster: imageName != null ? imageName : values.poster,
                                banner: bannerName != null ? bannerName : values.banner,
                                id: dataEdit.id,
                            },
                        };
                        console.log('movieData', movieData);
                        console.log('dataUpdate', dataUpdate);
                        // if (typesNoneSelect.length <= 0) {
                        const resp = await movieApi.update(dataEdit.id, dataUpdate);
                        setList(list.map((item) => (item.id === dataEdit.id ? resp.data : item)));
                        setworkSomething(!workSomething);
                        if (resp.status === httpStatus.OK) {
                            funcUtils.notify('Cập nhật phim thành công', 'success');
                        }
                        form.setFieldValue(resp.data);
                        // }
                        setLoadingButton(false);
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
    const handleCancelModal = async () => {
        setIsModalOpen(false);
        handleResetForm();
        if (dataEdit != null) {
            setDataEdit(null);
        }
    };

    const handleEditData = async (record) => {
        try {
            const movieResp = await movieApi.getById(record.id);
            const { actors, directors, formats, genres, ...movieData } = movieResp.data;
            const movie = movieData.movie;

            setFileList([
                {
                    uid: record.id.toString(),
                    name: record.poster,
                    url: uploadApi.get(record.poster),
                },
            ]);
            setFileListBanner([
                {
                    uid: record.id.toString(),
                    name: record.banner,
                    url: uploadApi.get(record.banner),
                },
            ]);
            const actsOpNotExist = actors.reduce((totals, item) => {
                if (!actorOptions.some((obj) => obj.id === item.id)) {
                    totals.push(item);
                }
                return totals;
            }, []);
            if (actsOpNotExist) {
                setActorOptions((prev) => [...prev, ...actsOpNotExist]);
            }
            const drtsOpNotExist = actors.reduce((totals, item) => {
                if (!directorOptions.some((obj) => obj.id === item.id)) {
                    totals.push(item);
                }
                return totals;
            }, []);
            if (drtsOpNotExist) {
                setActorOptions((prev) => [...prev, ...drtsOpNotExist]);
            }
            const formatIds = formats.map((o) => o.id);
            const genreIds = genres.map((o) => o.id);
            const directorIds = directors.map((o) => o.id);
            const actorIds = actors.map((o) => o.id);
            await Promise.all([
                handleSelectOption(actorIds, 'actor'),
                handleSelectOption(formatIds, 'format'),
                handleSelectOption(genreIds, 'genre'),
                handleSelectOption(directorIds, 'director'),
                handleSelectOption(movie.mpaaRating.id, 'mpaa'),
                handleSelectOption(movie.movieProducer.id, 'movie-producer'),
                handleSelectOption(movie.movieStudio.id, 'movie-studio'),
            ]);

            setPreviewTitle(`Poster của phim ${record.title}`);
            setIsModalOpen(true);

            setSelectDataTemp((prev) => ({ ...prev, actors: actors }));
            setSelectDataTemp((prev) => ({ ...prev, directors: directors }));

            console.log('actors-eidt', actors);
            setDataEdit(record);
            form.setFieldsValue({
                ...movie,
                genres: genreIds,
                formats: formatIds,
                directors: directorIds,
                actors: actorIds,
                movieProducer: movie.movieProducer.id,
                movieStudio: movie.movieStudio.id,
                mpaaRating: movie.mpaaRating.id,
                releaseDate: dayjs(record.releaseDate, 'DD-MM-YYYY'),
                duration: dayjs(movie.duration, 'HH:mm:ss'),
            });
        } catch (error) {
            console.error('Error:', error);
        }
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
                const [
                    movieResp,
                    movieStudioResp,
                    movieProducerResp,
                    mpaaResp,
                    genreResp,
                    formatResp,
                    actorResp,
                    directorResp,
                ] = await Promise.all([
                    movieApi.getByPage(currentPage, pageSize),
                    movieStudioApi.getAll(),
                    movieProducerApi.getAll(),
                    mpaaRatingApi.getAll(),
                    genreApi.getAll(),
                    formatApi.getAll(),
                    actorApi.getByPage(pageNoDefault, pageSizeDefault),
                    directorApi.getByPage(pageNoDefault, pageSizeDefault),
                ]);
                console.log(genreResp.data);
                const movieStudioOptions = movieStudioResp.data;
                const genreData = genreResp.data;
                const movieProducerData = movieProducerResp.data;
                const formatData = formatResp.data;
                const actorData = actorResp.data;
                const directorData = directorResp.data;

                setInitialOptions((prev) => ({ ...prev, movieStudios: movieStudioOptions }));
                setInitialOptions((prev) => ({ ...prev, formats: formatData }));
                setInitialOptions((prev) => ({ ...prev, genres: genreData }));
                setInitialOptions((prev) => ({ ...prev, movieProducers: movieProducerData }));
                setInitialOptions((prev) => ({ ...prev, actors: actorData }));
                setInitialOptions((prev) => ({ ...prev, directors: directorData }));

                setGenreOptions(genreData);
                setMovieStudios(movieStudioOptions);
                setDirectorOptions(directorData);
                setMovieProducers(movieProducerData);
                setFormatOptions(formatData);
                setActorOptions(actorData);
                setListMPAA(mpaaResp.data);

                const dataFormat = movieResp.data.map((item) => ({
                    ...item,
                    releaseDate: moment(item.releaseDate, 'YYYY-MM-DD').format(formatDate),
                }));
                setList(dataFormat);
                setTotalItems(movieResp.totalItems);
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
        searchValue.searchActor,
        actorApi,
        { setOptions: setActorOptions, field: 'actor' },
        initialOptions.actors,
        { loadingStates, setLoadingStates },
        isSearch,
    );
    useSearchSelectEffect(
        searchValue.searchDirector,
        directorApi,
        { setOptions: setDirectorOptions, field: 'director' },
        initialOptions.directors,
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
    const onChangeUploadBanner = async ({ fileList: newFileList }) => {
        setFileListBanner(newFileList);
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
            title: 'Banner',
            dataIndex: 'banner',
            key: 'banner',
            render: (_, record) => (
                <Space size="middle">
                    <Image
                        width={105}
                        height={80}
                        style={{ objectFit: 'contain' }}
                        alt="ảnh rỗng"
                        src={uploadApi.get(record.banner)}
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
            <div>
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
            </div>
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
            case 'format':
                setSearchValue((prev) => ({ ...prev, searchFormat: value }));
                break;
            case 'actor':
                setSearchValue((prev) => ({ ...prev, searchActor: value }));
                break;
            case 'director':
                setSearchValue((prev) => ({ ...prev, searchDirector: value }));
                break;
            default:
                console.log('Error: Không tìm thấy type của search');
                break;
        }
    };
    const handleSelectOption = (value, type) => {
        setIsSearch(true);
        switch (type) {
            case 'movie-studio':
                let movieStudio = movieStudios.find((o) => o.id === value);
                console.log('movieStudio', movieStudio);
                setSelectedValue((prev) => ({ ...prev, movieStudio: movieStudio }));
                break;
            case 'movie-producer':
                let movieProducer = movieProducers.find((mProducer) => mProducer.id === value);
                setSelectedValue((prev) => ({ ...prev, movieProducer: movieProducer }));
                break;
            case 'mpaa':
                let mpaa = listMPAA.find((o) => o.id === value);
                console.log('mpaa', mpaa);
                setSelectedValue((prev) => ({ ...prev, mpaaRating: mpaa }));
                break;
            case 'genre':
                let genres = value.map((id) => {
                    return genreOptions.find((o) => o.id === id);
                });
                setSelectedValue((prev) => ({ ...prev, genres: genres }));
                break;
            case 'format':
                let formats = value.map((id) => {
                    return formatOptions.find((o) => o.id === id);
                });
                console.log('formats', formats);
                setSelectedValue((prev) => ({ ...prev, formats: formats }));
                break;
            case 'actor':
                let actors = value.map((id) => {
                    return actorOptions.find((o) => o.id === id);
                });
                setSelectedValue((prev) => ({ ...prev, actors: actors }));
                break;
            case 'director':
                let directors = value.map((id) => {
                    return directorOptions.find((o) => o.id === id);
                });
                console.log('directors', directors);
                setSelectedValue((prev) => ({ ...prev, directors: directors }));
                break;

            default:
                console.log('Error: Không tìm thấy type của search');
                break;
        }
    };
    const tagRender = (props) => {
        const { label, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Space wrap>
                <Tag
                    // color={value}
                    onMouseDown={onPreventMouseDown}
                    closable={closable}
                    onClose={onClose}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: 'auto',
                        minWidth: 200,
                        border: 'none',
                        marginRight: 3,
                        backgroundColor: '#f0f0f0',
                    }}
                >
                    {label}
                </Tag>
            </Space>
        );
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
                        <Input placeholder="Nhập tên phim vào đây" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Poster"
                        name="poster"
                        rules={[{ required: true, message: 'Vui lòng chọn poster' }]}
                    >
                        <Upload
                            beforeUpload={(file) => {
                                console.log({ file });
                                return false;
                            }}
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
                    <Form.Item
                        {...formItemLayout}
                        label="Banner"
                        name="banner"
                        rules={[{ required: true, message: 'Vui lòng chọn banner' }]}
                    >
                        <Upload
                            beforeUpload={(file) => {
                                console.log({ file });
                                return false;
                            }}
                            accept=".png, .jpg"
                            listType="picture-card"
                            onChange={onChangeUploadBanner}
                            onPreview={handlePreview}
                            fileList={fileListBanner}
                            name="banner"
                            maxCount={1}
                        >
                            {fileListBanner.length < 1 && '+ Upload'}
                        </Upload>
                    </Form.Item>

                    <Form.Item name="duration" label="Thời lượng" {...config}>
                        <TimePicker style={{ width: 150 }} placeholder="Chọn thời lượng" />
                    </Form.Item>
                    <Form.Item label="Đánh giá" name="rating">
                        <Input readOnly defaultValue={0.0} />
                    </Form.Item>

                    <Form.Item name="releaseDate" label="Ngày phát hành" {...config}>
                        <DatePicker placeholder="Chọn ngày phát hành" format={formatDate} />
                    </Form.Item>
                    <Form.Item
                        name="country"
                        label="Quốc gia"
                        rules={[{ required: true, message: 'Vui lòng chọn quốc gia' }]}
                    >
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
                    <Form.Item
                        label="Nhà sản xuất"
                        rules={[{ required: true, message: 'Vui lòng chọn nhà sản xuất' }]}
                        name="movieProducer"
                    >
                        <Select
                            // mode=""
                            allowClear
                            showSearch
                            placeholder="Tìm kiếm và chọn hãng sản xuât"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            loading={loadingStates.movieProducer}
                            onChange={(value) => handleSelectOption(value, 'movie-producer')}
                            options={[
                                ...movieProducers.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="movieStudio"
                        label="Hãng phim"
                        rules={[{ required: true, message: 'Vui lòng chọn hãng phim' }]}
                    >
                        <Select
                            // mode=""
                            allowClear
                            showSearch
                            placeholder="Tìm kiếm và chọn hãng phim"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onChange={(value) => handleSelectOption(value, 'movie-studio')}
                            loading={loadingStates.movieStudio}
                            options={[
                                ...movieStudios.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="genres"
                        label="Thể loại phim"
                        rules={[{ required: true, message: 'Vui lòng chọn thể loại phim' }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Tìm kiếm và chọn loại phim"
                            allowClear
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onChange={(value) => handleSelectOption(value, 'genre')}
                            loading={loadingStates.genre}
                            options={[
                                ...genreOptions.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="formats"
                        label="Định dạng phim"
                        rules={[{ required: true, message: 'Vui lòng chọn định dạng' }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Tìm kiếm và chọn định dạng phim"
                            allowClear
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onChange={(value) => handleSelectOption(value, 'format')}
                            loading={loadingStates.format}
                            options={[
                                ...formatOptions.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="directors"
                        label="Đạo diễn"
                        rules={[{ required: true, message: 'Vui lòng chọn đạo diễn' }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Tìm kiếm và chọn đạo diễn"
                            allowClear
                            filterOption={false}
                            tagRender={tagRender}
                            onSearch={(value) => handleSearchInput(value, 'director')}
                            onChange={(value) => handleSelectOption(value, 'director')}
                            loading={loadingStates.director}
                            optionLabelProp="children"
                        >
                            {directorOptions.map((item) => (
                                <Select.Option key={item.id} value={item.id} label={item.fullname}>
                                    <div className={cx('wrap-option-image')}>
                                        <div className={cx('box-img')}>
                                            <img className={cx('img-avatar')} src={uploadApi.get(item.avatar)} />
                                        </div>
                                        <span className={cx('label')}>{item.fullname}</span>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="actors"
                        label="Diễn viên"
                        rules={[{ required: true, message: 'Vui lòng chọn diễn viên' }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Tìm kiếm và chọn diễn viên"
                            allowClear
                            filterOption={false}
                            tagRender={tagRender}
                            onSearch={(value) => handleSearchInput(value, 'actor')}
                            onChange={(value) => handleSelectOption(value, 'actor')}
                            onDeselect={(value) => console.log('value', value)}
                            loading={loadingStates.actor}
                            optionLabelProp="children"
                        >
                            {actorOptions.map((item) => (
                                <Select.Option key={item.id} value={item.id} label={item.fullname}>
                                    <div className={cx('wrap-option-image')}>
                                        <div className={cx('box-img')}>
                                            <img className={cx('img-avatar')} src={uploadApi.get(item.avatar)} />
                                        </div>
                                        <span className={cx('label')}>{item.fullname}</span>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Loại phim"
                        rules={[{ required: true, message: 'Vui lòng chọn loại phim' }]}
                        name="mpaaRating"
                    >
                        <Select
                            showSearch
                            placeholder="Tìm kiếm và chọn loại phim"
                            allowClear
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onChange={(value) => handleSelectOption(value, 'mpaa')}
                            options={[
                                ...listMPAA.map((item) => ({
                                    value: item.id,
                                    label: item.ratingCode,
                                })),
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Link trailer phim"
                        name="videoTrailer"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập link video trailer!',
                            },
                        ]}
                    >
                        <Input placeholder="Dán link trailer phim vào đây" />
                    </Form.Item>

                    <Form.Item name={'description'} label="Mô tả">
                        <Input.TextArea placeholder="Nhập mô tả phim ở đây" />
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
