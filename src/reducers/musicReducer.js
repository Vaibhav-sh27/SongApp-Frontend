import musicDB from "../db/music";
import axios from "axios";
import React, {useContext, useEffect, useRef, useState} from 'react';

export const initialState = {
    playlists: musicDB,
    playing:null,
    bannerOpen: false,
    search:null,
    language: null
};
const musicReducer = (state=initialState,action) => {
    // useEffect(()=>{
    //     musicDB;
    // },[]);
    const qs = require('qs');

    switch (action.type){
        case "SET_PLAYLIST":
            return {
                ...state,
                playlists: action.payload
            }
        case "SET_CURR_PLAYING":
            return {
                ...state,
                playing: action.payload
             }
        case "SET_BANNER_OPEN":
            return {
                ...state,
                bannerOpen: action.payload
            };
        case "INC_TIMES_PLAYED":
            console.log(action.payload);
            // musicDB[action.payload].timesPlayed += 1;
            // return state;
            let data = qs.stringify({
                id:action.payload,
              });
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${window.API_URL}/inc_time`,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            };
            axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        case "SET_SEARCH_QUERY":
            return {
                ...state,
                search: action.payload
            };
        case "SET_MUSIC_LIST":
            return {
                ...state,
                language: action.payload
            };
        default:
            return state;
    }
};

export default musicReducer;