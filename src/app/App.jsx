import React, {useEffect, useState} from "react";
import './App.scss';
import Home from "../components/Pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "../components/Pages/Login";
import {ThemeContext, themes} from "../api/Theme";
import {setSongDB} from "../db/music";
import {useDispatch, useSelector} from "react-redux";
import {setPlaylist} from "../actions/actions";
import axios from "axios";


const App = () => {
 
    const {language} = useSelector(state => state.musicReducer);
    const [musicDB, setDB] = useState([]);

    useEffect(() => {
        async function getData(){
            await axios.get(`${window.API_URL}/songs`)
            .then(response => setDB(response.data))
            .catch(error => console.error(error));
        } 
        getData();
        
        
         
    },[]); 
    console.log(musicDB);
    // if(musicDB)  
    setSongDB(musicDB);   
    const dispatch = useDispatch();
    useEffect(()=>{ 
        if (language === null || language.includes("any")){
            dispatch(setPlaylist(musicDB))
        }
        else {
            let x = musicDB.filter((item)=>(
                item.lang && language.includes(item.lang.toLowerCase())
            ))
            dispatch(setPlaylist(x))
        }
    },[dispatch, language, musicDB]); 

    // if(musicDB){
        
    
    return (
        <ThemeContext.Provider value={themes.light}>
            <>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </Router>
            </>
        </ThemeContext.Provider>
    );
    // }
}

export default App;