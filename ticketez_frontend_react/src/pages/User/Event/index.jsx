/* eslint-disable jsx-a11y/alt-text */
import { Col, Row, Typography } from 'antd';
import React from 'react';
import img from '~/assets/img';
import classNames from 'classnames/bind';
import style from './Event.module.scss';

const cx = classNames.bind(style);

const { Paragraph, Title } = Typography;
const Event = () => {
    return (
        <div >
            <Row
                gutter={24}
                style={{ backgroundColor: '#fff', color: '#000', justifyItems: 'center' }}
                
            >
                <Col lg={16}>
                    <img
                        src={img.event}
                        width={720}
                        height={330}
                        className={cx('img-right')}
                        style={{ marginTop: '10px' }}
                    />
                    <Paragraph>
                        Xem phim hay, lời ngay deal xịn: Giảm 10.000Đ khi đặt vé xem phim và nhập mã “XEMGI” trên
                        website MoMo KHUYẾN MÃI · 21/08/2023 · 8.8K lượt xem Chia sẻ Cùng MoMo đặt vé xem phim trên
                        website https://momo.vn/cinema để chớp ngay deal 10.000Đ với hóa đơn từ 200.000Đ. Tưng bừng cùng
                        loạt bom tấn siêu hấp dẫn mùa thu này! Nhấn vào để copy mã XEMGI Chần chờ là mất ưu đãi ngon,
                        dân mê phim điện ảnh nhanh tay mở website https://momo.vn/cinema lên, đặt vé xem phim ngay và
                        luôn. Nhập thêm mã “XEMGI” là tới công chuyện, hời thêm deal 10.000Đ chấn động các rạp liền! Nào
                        cùng nhập mã thần sầu, chốt đơn mau mau, tận hưởng bao phim HOT! Lưu ý: Chương trình áp dụng cho
                        hóa đơn từ 200.000Đ khi đặt qua website https://momo.vn/cinema. Thời gian diễn ra chương trình
                        22/08/2023 - 30/09/2023 Đối tượng tham gia: Dành riêng cho những khách hàng nhận được thông báo
                        về chương trình qua ứng dụng MoMo. Hướng dẫn nhập mã, nhận ưu đãi: 👉 Bước 1: Vào website
                        https://momo.vn/cinema và chọn “ĐẶT VÉ NGAY”. 👉 Bước 2: Chọn rạp, phim, suất chiếu, ghế và nhấn
                        “Mua vé”. 👉 Bước 3: Chọn bắp nước và nhấn “Tiếp tục”. 👉 Bước 4: Mở app MoMo và quét mã QR trên
                        màn hình hiển thị để thanh toán. 👉 Bước 5: Kiểm tra thông tin thanh toán và nhấn “Tiếp tục”. 👉
                        Bước 6: Tại màn hình thanh toán, phần ƯU ĐÃI, bấm “Chọn thẻ quà tặng”, nhập mã “XEMGI” vào ô Mã
                        khuyến mãi và bấm “Áp dụng”. 👉 Bước 7: Xem lại thông tin, số tiền và xác nhận thanh toán. 👉
                        Bước 8: Xuất trình QR code để nhận vé vào rạp. Điều kiện & điều khoản Mỗi khách hàng chỉ được
                        hưởng ưu đãi tối đa 1 lần (1 lần/1 tài khoản MoMo/1 CMND/1 SĐT/1 thiết bị). Chương trình áp dụng
                        t. Lưu ý: Do số lượng quà tặng có hạn nên chương trình có thể kết thúc sớm hơn so với dự kiến.
                    </Paragraph>
                </Col>
                <Col lg={8} className={cx('right')}>
                    <Title level={3} className={cx('name-right')} style={{ color: '#D82D8B' }}>
                        Tin tức liên quan
                    </Title>
                    <Row gutter={24} style={{ height: 80 }} className={cx('card-right')}>
                        <Col lg={8}>
                            <img src={img.event} width={150} height={60} className={cx('img-right')} />
                        </Col>
                        <Col lg={16}>
                            <Paragraph
                                style={true ? { width: 200 } : undefined}
                                ellipsis={true ? { rows: 3 } : false}
                                className={cx('title-right')}
                            >
                               Hoàn tiền may mắn đến 500.000đ khi thanh toán hóa đơn bằng Túi Thần Tài
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ height: 80 }}>
                        <Col lg={8}>
                            <img src={img.event} width={150} height={60} className={cx('img-right')} />
                        </Col>
                        <Col lg={16}>
                            <Paragraph
                                style={true ? { width: 200 } : undefined}
                                ellipsis={true ? { rows: 3 } : false}
                                className={cx('title-right')}
                            >
                               Hoàn tiền may mắn đến 500.000đ khi thanh toán hóa đơn bằng Túi Thần Tài
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ height: 80 }}>
                        <Col lg={8}>
                            <img src={img.event} width={150} height={60} className={cx('img-right')} />
                        </Col>
                        <Col lg={16}>
                            <Paragraph
                                style={true ? { width: 200 } : undefined}
                                ellipsis={true ? { rows: 3 } : false}
                                className={cx('title-right')}
                            >
                               Hoàn tiền may mắn đến 500.000đ khi thanh toán hóa đơn bằng Túi Thần Tài
                            </Paragraph>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ height: 80 }}>
                        <Col lg={8}>
                            <img src={img.event} width={150} height={60} className={cx('img-right')} />
                        </Col>
                        <Col lg={16}>
                            <Paragraph
                                style={true ? { width: 200 } : undefined}
                                ellipsis={true ? { rows: 3 } : false}
                                className={cx('title-right')}
                            >
                               Hoàn tiền may mắn đến 500.000đ khi thanh toán hóa đơn bằng Túi Thần Tài
                            </Paragraph>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Event;
