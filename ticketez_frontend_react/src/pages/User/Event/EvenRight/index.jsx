/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import uploadApi from '~/api/service/uploadApi';
import eventAPI from '~/api/user/event/eventAPI';

const EventRight = () => {

    const location = useLocation();
    const [dataEventByNew, setDataEventByNew] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await eventAPI.getEventByPromotion();

                setDataEventByNew(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getList();
    }, []);

    const handle = (event) => {
        if (location.pathname === '/su-kien/khuyen-mai') {
            return event.id !== dataEventByNew[0].id;
        } else {
            return event.id !== dataEventByNew.id;
        }
    };
    return (
        <>
            {dataEventByNew && dataEventByNew.length > 0 && (
                <div>
                    {dataEventByNew
                        .filter((event) => handle(event))
                        .slice(0, 3)
                        .map((event, index) => (
                            <div
                                key={index}
                                className={`tw-w-[318px] tw-h-[298px] tw-bg-white tw-shadow-lg tw-shadow-slate-300-500/50  tw-rounded-[20px] tw-mb-${
                                    index < 2 ? '[15px]' : '[35px]'
                                } `}
                            >
                                <Link to={`/su-kien/khuyen-mai/${event.id}`}>
                                    <img
                                        src={uploadApi.get(event.banner)}
                                        width={318}
                                        height={154}
                                        className="tw-mr-[20px] tw-rounded-t-[20px]"
                                    />
                                    <h2
                                        className={`tw-text-left tw-p-[1rem] tw-mt-[-50px] tw-leading-normal tw-line-clamp-1 tw-h-[40px]  tw-w-[300px] tw-text-black hover:tw-text-pink-600 tw-font-[var(--font-family)]`}
                                    >
                                        {event.name}
                                    </h2>
                                    <span className="tw-text-left tw-ml-[12px] tw-leading-normal tw-line-clamp-2 tw-text-gray-500 tw-mt-[-0px] tw-font-[var(--font-family)]">
                                        {event.name}
                                    </span>
                                    <p
                                        className={`tw-text-left tw-p-[1rem] tw-text-pink-500 hover:tw-text-pink-700 tw-font-[var(--font-family)] tw-cursor-pointer`}
                                    >
                                        Xem chi tiết <FontAwesomeIcon icon={faChevronRight} className="tw-text-lg" />
                                    </p>
                                </Link>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};

export default EventRight;
