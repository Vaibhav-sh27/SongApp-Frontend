import React, {useEffect, useState} from 'react';
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from "./MusicCard";
import {useSelector} from "react-redux";
import Container from "./Container";


function MusicCardContainer() {
    const {playlists} = useSelector(state => state.musicReducer);
    const [mostPlayed, setMostPlayed] = useState([]);

    function sortByProperty(property) {
        return function (a, b) {
            
            if (a[property] < b[property])
                return 1;
            else if (a[property] > b[property])
                return -1;

            return 0;
        }
    }

    useEffect(() => {
        setMostPlayed(playlists.sort(sortByProperty("timesPlayed")));
    }, [playlists]);


    return (
        <Container>
            <div className={"music-card-container"}>
                {
                    mostPlayed.map(item => (
                        <MusicCard key={item._id} music={item}/>
                    ))
                }
            </div>
        </Container>
    );
}

export default MusicCardContainer;
