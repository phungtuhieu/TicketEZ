import React from 'react';
import styled from 'styled-components';
import MovieDetails from './movie_details/movie_details';
import { useParams } from 'react-router-dom';
import { movieData } from '../../data/data';

function setZoom() {
    if (navigator.appVersion.indexOf('Win') !== -1) {
        document.body.style.zoom = '90%';
    }
}

const Movie = () => {
    const { id } = useParams();
    console.log(id);
    setZoom();
    return (
        <Container>
            <MovieDetails movie={movieData[id - 1]} />
        </Container>
    );
};

export default Movie;

const Container = styled.div`
    min-height: calc(100vh - 160px);
    padding: 0 calc(3.5vw + 5px);
`;
