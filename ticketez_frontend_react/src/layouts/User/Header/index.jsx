/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './header.scss';
import { animateScroll as scroll } from 'react-scroll';
import img from '~/assets/img';
import { Avatar, Breadcrumb, Divider, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
    faAddressCard,
    faChevronRight,
    faCircleCheck,
    faFireFlameCurved,
    faHome,
    faNewspaper,
    faRightFromBracket,
    faSearch,
    faTicket,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const allowedPaths = [
        '/su-kien/khuyen-mai',
        '/su-kien/tin-tuc',
        /^\/su-kien\/tin-tuc\/\d+$/,
        /^\/su-kien\/khuyen-mai\/\d+$/,
    ];
    const isEventPage = allowedPaths.some((path) =>
        typeof path === 'string' ? location.pathname === path : path.test(location.pathname),
    );

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    Xem tài khoản
                </a>
            ),
            icon: <FontAwesomeIcon icon={faAddressCard} className="text-4xl" />,
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    Lịch sử đặt vé
                </a>
            ),
            icon: <FontAwesomeIcon icon={faTicket} />,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    Lịch sử tích điểm
                </a>
            ),
            icon: <FontAwesomeIcon icon={faCircleCheck} />,
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="">
                    Đăng xuất
                </a>
            ),
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        },
    ];

    const scrollToShowTimes = () => {
        navigate('/');
        scroll.scrollTo(1800);
    };
    const scrollToMovieUpcoming = () => {
        navigate('/');
        // Assuming you are using a library like react-scroll for scrolling
        // Replace 'scrollTo' with the actual scrolling logic you are using
        scroll.scrollTo(1200);
    };
    const scrollToMovieShowing = () => {
        navigate('/');
        scroll.scrollTo(600);
    };
    return (
        <>
            <nav className="tw-z-[999] tw-bg-white tw-text-gray-500 tw-font-bold tw-shadow-2xl tw-sticky tw-top-0 ">
                <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-border-b tw-container tw-mx-auto tw-px-[150px]">
                    <a href="/" className="tw-text-gray-700">
                        <div className="tw-flex tw-items-center tw-gap-2">
                            <div className="tw-text-xl tw-font-medium tw-text-blue-800">
                                <span className="tw-font-bold tw-text-blue-900">
                                    <img src={img.logoAdmin} />
                                </span>
                            </div>
                            <div className="tw-w-[1px] tw-bg-pink-900 tw-h-10 tw-hidden lg:tw-block"></div>
                            <img src={img.logoHome} />
                            <div className="tw-hidden tw-leading-4 tw-text-pink-700 lg:tw-block">
                                <div>
                                    <div>Đặt vé</div>
                                    <div className="tw-mt-[5px]">Xem phim</div>
                                </div>
                            </div>
                        </div>
                    </a>
                    <div className="tw-flex tw-items-center tw-font-medium tw-cursor-pointer">
                        <div className="tw-hidden lg:tw-block tw-mr-[20px] tw-text-gray-700 tw-font-2xl">
                            <a onClick={scrollToShowTimes} className="tw-text-gray-700">
                                Lịch chiếu
                            </a>
                        </div>
                        <div className="tw-xl:tw-hidden tw-mr-[20px] tw-text-gray-700">
                            <a onClick={scrollToMovieShowing} className="tw-text-gray-700">
                                Phim đang chiếu
                            </a>
                        </div>
                        <div className="tw-xl:tw-hidden tw-mr-[20px] tw-text-gray-700">
                            <a onClick={scrollToMovieUpcoming} className="tw-text-gray-700">
                                Phim sắp chiếu
                            </a>
                        </div>
                        <div className="tw-xl:tw-hidden tw-mr-[20px] ">
                            <a href="/su-kien/tin-tuc" className="tw-text-gray-700">
                                Sự kiện
                            </a>
                        </div>
                        <div className="tw-hidden lg:tw-block tw-mr-[10px] tw-text-gray-700 tw-font-2xl">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <Divider type="vertical" />
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottom"
                            arrow
                        >
                            <a onClick={(e) => e.preventDefault()} className="tw-text-gray-700">
                                Minh khôi
                                <Avatar
                                    style={{
                                        backgroundColor: '#87d068',
                                    }}
                                    className="tw-ml-2"
                                    icon={<UserOutlined />}
                                />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                {isEventPage && ( // Render additional code only if isEventPage is true
                    <>
                        <Divider className="tw-mt-[-5px]" />
                        <div className="tw-container tw-mx-auto tw-px-[150px] tw-mt-[-10px] tw-mb-[10px] tw-text-gray-700 tw-font-2xl tw-font-[var(--font-family)]">
                            <Breadcrumb
                                separator={null}
                                items={[
                                    {
                                        href: '/',
                                        title: <FontAwesomeIcon icon={faHome} />,
                                    },
                                    {
                                        type: 'separator',
                                        separator: <FontAwesomeIcon icon={faChevronRight} />,
                                    },
                                    {
                                        title: 'Sự kiện',
                                        className: ' tw-cursor-pointer  tw-text-gray-500  tw-font-[var(--font-family)]',
                                    },
                                    {
                                        type: 'separator',
                                        separator: <FontAwesomeIcon icon={faChevronRight} />,
                                    },
                                    {
                                        href: '/su-kien/tin-tuc',
                                        className: `focus:tw-text-pink-500 hover:tw-text-pink-500 tw-cursor-pointer  tw-text-gray-500  tw-font-[var(--font-family)] ${
                                            isEventPage &&
                                            (location.pathname === '/su-kien/tin-tuc' ||
                                                /^\/su-kien\/tin-tuc\/\d+$/.test(location.pathname))
                                                ? ' tw-text-pink-500'
                                                : ''
                                        }`,
                                        title: (
                                            <>
                                                <FontAwesomeIcon icon={faFireFlameCurved} className="tw-mr-2" />
                                                <span>Tin tức</span>
                                            </>
                                        ),
                                    },
                                    {
                                        type: 'separator',
                                        separator: ' | ',
                                    },
                                    {
                                        href: '/su-kien/khuyen-mai',
                                        className: `focus:tw-text-pink-500 hover:tw-text-pink-500 tw-cursor-pointer  tw-text-gray-500  tw-font-[var(--font-family)] ${
                                            isEventPage &&
                                            (location.pathname === '/su-kien/khuyen-mai' ||
                                                /^\/su-kien\/khuyen-mai\/\d+$/.test(location.pathname))
                                                ? ' tw-text-pink-500'
                                                : ''
                                        }`,
                                        title: (
                                            <>
                                                <FontAwesomeIcon icon={faNewspaper} className="tw-mr-2" />
                                                <span>Khuyến mãi</span>
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </>
                )}
            </nav>
        </>
    );
};

export default Header;
