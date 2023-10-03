import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

function screening_details() {
    return (
        <Container>
            <h4>SELECT SUITABLE SCREENING</h4>
            <Content>
                <Screening>
                    <Wrap>
                        <span>10 AM {moment().add(1, 'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
                <Screening>
                    <Wrap>
                        <span>8 PM {moment().add(1, 'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
                <Screening>
                    <Wrap>
                        <span>10 AM {moment().add(2, 'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
                <Screening>
                    <Wrap>
                        <span>8 PM {moment().add(2, 'days').format('DD MMM')}</span>
                    </Wrap>
                </Screening>
            </Content>
        </Container>
    );
}

export default screening_details;

const Container = styled.div`
    padding: 30px 0px 26px;
    @media (max-width: 900px) {
        margin-bottom: 30px;
    }
`;

const Content = styled.div`
    display: flex;
    grid-gap: 25px;
    overflow-x: auto;
    padding: 10px 5px;
    @media (max-width: 900px) {
        font-size: 12px;
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;
const Screening = styled.div``;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; /* Căn giữa theo chiều dọc */
    align-items: center; /* Căn giữa theo chiều ngang */
    height: 100px; /* Chiều cao tối đa là 100px */
    border-radius: 10px;
    cursor: pointer;
    border: 3px solid rgba(249, 249, 249, 0.1);

    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    text-align: center;
    padding: 20px;

    @media (max-width: 900px) {
        width: 150px;
    }

    &:hover {
        transform: scale(1.02);
        border-color: rgba(249, 249, 249, 0.8);
    }

    span {
        letter-spacing: 1.42px;
        color: rgb(249, 249, 249, 0.8);
    }
`;
