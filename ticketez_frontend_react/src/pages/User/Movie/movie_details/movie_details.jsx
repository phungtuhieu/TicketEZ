// Import các thư viện cần thiết và CSS styles
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import SeatChart from '../../Booking/SeatChart';
import ReactDOM from 'react-dom';



const MovieDetails = (props) => {
  

    function setZoom() {
        if (navigator.appVersion.indexOf('Win') !== -1) {
            document.body.style.zoom = '80%';
        }
    }

    const [mute, setMute] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hàm mở modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    setZoom();
    return (
        <Container>
            <Details>
                <h1>{props.movie.name}</h1>
                <SubTitle>
                    {props.movie.lang} • {props.movie.duration}m • Animated
                </SubTitle>
                <Description>{props.movie.desc}</Description>
                <BookTicket onClick={openModal}>
                    <img src="/images/ticket.png" alt="" />
                    <span>BOOK TICKETS</span>
                </BookTicket>
                {/* Hiển thị modal khi cần */}
                <Modal isOpen={isModalOpen} onClick={closeModal}>
                    <ModalContent isOpen={isModalOpen} onClick={(e) => e.stopPropagation()}>
                        <SeatChart />
                    
                    </ModalContent>
                </Modal>
            </Details>
            <Trailer>
                <MovieTrailerPlayer>
                    <ReactPlayer
                        id="MovieTrailer"
                        url={props.movie.trailer}
                        playing={true}
                        loop={true}
                        muted={mute}
                        controls={false}
                        width="90%"
                        height="90%"
                    />
                    <UnMute onClick={() => setMute(!mute)}>
                        <img src={mute ? '/images/muted.png' : '/images/unmuted.png'} alt="Unmute" />
                    </UnMute>
                </MovieTrailerPlayer>
            </Trailer>
        </Container>
    );
};

export default MovieDetails;

const Container = styled.div`
    display: flex;
    margin-top: 20px;

    height: 100%;
    width: 100%;
    background: #0c111b;
    border-radius: 10px;
    overflow: hidden;

    @media (max-width: 900px) {
        flex-direction: column-reverse;
    }
`;

const Details = styled.div`
    width: 40%;
    padding: 0px 36px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const SubTitle = styled.div`
    color: rgb(249, 249, 249, 0.6);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`;

const Description = styled.div`
    width: 80%;
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249, 0.8);

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const BookTicket = styled.button`
    margin-top: 30px;
    margin-bottom: 30px;
    ${'' /* margin-left: 120px; */}
    border-radius: 4px;
    font-size: 15px;
    padding: 0px 24px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249, 0.8);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background: rgb(249, 249, 249);
    }
    ${
        '' /* @media (min-width: 500px) {
        margin-left: 120px;
    }
    @media (max-width: 500px) {
        margin-left: 40px;
    } */
    }
`;

const Trailer = styled.div`
    width: 60%;
    padding-top: 1%;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

const MovieTrailerPlayer = styled.div`
    position: relative;
    padding-top: 60.25%;
    #MovieTrailer {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
`;

const UnMute = styled.button`
    border-radius: 50%;
    padding: 8px 8px;
    background: rgb(249, 249, 249, 0.6);
    position: absolute;
    left: 5px;
    bottom: 100px;
    &: hover {
        background: rgb(249, 249, 249);
    }
`;
// modal
const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
    transition: opacity 0.3s, visibility 0.3s;
`;

const ModalContent = styled.div`
    background-color: #262626;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transform: translateY(${(props) => (props.isOpen ? 0 : '-20px')});
    transition: opacity 0.3s, transform 0.3s;
`;
