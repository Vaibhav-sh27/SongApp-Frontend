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
import 'bootstrap/dist/css/bootstrap.min.css'; 
import HashLoader from "react-spinners/HashLoader"; 


const App = () => {
    let [loadingInProgress, setLoading] = useState(false);
    const {language} = useSelector(state => state.musicReducer);
    const [musicDB, setDB] = useState([]);

    useEffect(() => {
        async function getData(){
            setLoading(true);
            await axios.get(`${window.API_URL}/songs`)
            .then(response => {
                setDB(response.data);
                setLoading(false);
            })
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
            {   loadingInProgress &&
                <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", background:"rgba(0, 0, 0, 0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:"2"}}>
                    <HashLoader color="#A2D5F2" loading={loadingInProgress} size={90} />
                </div>
            }
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="*/home" component={Home}/>
                    </Switch>
                </Router>
            </>
        </ThemeContext.Provider>
    );
    // }
}

export default App;