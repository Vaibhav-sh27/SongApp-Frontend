import React, {useContext, useEffect, useRef, useState} from 'react';
import '../assets/scss/AddMusic.scss';
import {Add, Image, MusicNoteTwoTone} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {ThemeContext} from "../../api/Theme";
import musicDB from "../../db/music";
import axios from "axios";
import { useHistory, Redirect, Link } from "react-router-dom";

import {
    ref, 
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../../firebase";
  import { v4 } from "uuid";

function AddMusic() {
    const useStyle = useContext(ThemeContext);
    const fileRef = useRef();
    const fileRef2 = useRef();
    const [selected,setSelected] = useState(null);
    const [selected2,setSelected2] = useState(null);
    const [inputs, setInputs] = useState({});
    const [imageUpload, setImageUpload] = useState(null);
    const [songUpload, setSongUpload] = useState(null);
    const [imgName,setImg] = useState(null);
    const [songName,setSong] = useState(null);
    const qs = require('qs');
    const history = useHistory();


    // let id =musicDB[musicDB.length-1].id + 1;

    const selectImg = () =>{
        fileRef.current.click()
    }
    const selectSong = () =>{
        fileRef2.current.click()
    }
    const handleChange = (e) => {
        inputs.onChange(e)
        
    }
    const uploadImg = ()=>{
        console.log(imageUpload);
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            alert("File Uploaded")
            return getDownloadURL(snapshot.ref)
        }).then(downloadURL => {
            console.log('Download URL', downloadURL)
            setSelected(downloadURL.toString())
        });
    }
    const uploadSong = ()=>{
        console.log(songUpload);
        if (songUpload == null) return;
        const songRef = ref(storage, `songs/${songUpload.name + v4()}`);
        const metadata = {
            contentType: 'audio/mpeg',
            };
        uploadBytes(songRef, songUpload, metadata).then((snapshot) => {
            alert("File Uploaded")
            return getDownloadURL(snapshot.ref)
        }).then(downloadURL => {
            console.log('Download URL', downloadURL)
            setSelected2(downloadURL.toString())
        });
    }
    const add=(e)=>{
        let data = qs.stringify({
            name: inputs.songName,
            author_name: inputs.Sname,
            img: selected,
            lang: inputs.Lang,
            timesPlayed:0,
            type: inputs.Type,
            musicName: selected2,
            attribution:{
                song: inputs.songName,
                musicBy: inputs.Sname,
                download: null,
                stream: null
            }
          });

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${window.API_URL}/songs`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            data : data
          };

          axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            // navigate('/home');
            // history.push("/home");
            })
            .catch((error) => {
            console.log(error); 
            alert(error);

            e.preventDefault();
            });

 






    //     axios.post('http://localhost:8089/songs',{name: "helloooo",
    //     hehe: "jj"
    // }, {
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //         })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });

        // musicDB.push({
            // name: inputs.songName,
            // author_name: inputs.Sname,
            // img: selected,
            // lang: inputs.Lang,
            // timesPlayed:0,
            // type: inputs.Type,
            // musicName: selected2,
            // attribution:{
            //     song: inputs.songName,
            //     musicBy: inputs.Sname,
            //     download: null,
            //     stream: null
            // }
        // })
        // console.log(musicDB);
       
    }
    
    useEffect(()=>{
        fileRef.current.onchange =  (e) => {
            e.preventDefault()
            setImageUpload(e.target.files[0])
            setImg(e.target.files[0].name)
        }
        
        fileRef2.current.onchange = async (e) => {
            e.preventDefault()
            // setSongUpload(URL.createObjectURL(e.target.files[0]));
            setSongUpload(e.target.files[0]);
            setSong(e.target.files[0].name)
            
        }
        inputs.onChange=(e)=>{
            const name = e.target.name;
            const value = e.target.value;
            setInputs(values => ({...values, [name]: value}))
        }
    })
    
    return (
        <form style={useStyle.component} className={"AddMusic"}>
            <div className="add-music-sub-container">
                <div className="d1">
                    <Button  onClick={selectImg}  style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"} >
                        <Image titleAccess={"Select a music cover"} style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    
                    <input ref={fileRef} accept="image/*" type="file"  id={"music-img"} hidden required onChange={uploadImg}/>
                    <p>{imgName}</p>
                    <Button htmlFor={"music-img"} onClick={selectSong}  style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"} >
                        <MusicNoteTwoTone titleAccess={"Select a music"}  style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    <input ref={fileRef2} accept="audio/*" hidden type="file" onChange={uploadSong}/>
                    <p>{songName}</p>
                    <select onChange={handleChange} required name='Lang'>
                        <option value="">Select Language</option>
                        <option value="HINDI">Hindi</option>
                        <option value="ENGLISH">English</option>
                    </select>
                    <br />
                    <select onChange={handleChange} name='Type'>
                        <option value="">Select Type</option>
                        <option value="instrumental">Instrumental</option>
                        <option value="electronic">Electronic</option>
                        <option value="groovy">Groovy</option>
                    </select>
                </div>
                <div className="d2">
                    <div>
                        <input type="text" placeholder={"Song Name"} id={"songName"} name='songName'  onChange={handleChange}/>
                        <input type="text" placeholder={"CurrentPlayingLarge Name"} id={"name"} name='Lname'  onChange={handleChange}/>
                        <input type="text" placeholder={"Singer Name"} id={"artist"} name='Sname'  onChange={handleChange}/>
                        <Button  style={{backgroundColor: useStyle.theme, width:'100%'}} variant={"contained"} endIcon={<Add/>} onClick={add} type='submit' href='/home'>
                            {/* <Link to={"/home"} style={{textdecoration: ""}}> */}
                            Add
                            {/* </Link> */}
                            
                        </Button>
                    </div>
                    <div className={"preview"}>
                        <h3>Preview</h3>
                        <p>Music Cover : {inputs.Lname}</p>
                        <p>Music Image : {imgName}</p>
                        <p>Music Name : {songName}</p>
                        <p>Singer Name : {inputs.Sname}</p>
                        <p>Language : {inputs.Lang}</p>
                        <p>Type : {inputs.Type}</p>
                    </div>
                </div>
            </div>

        </form>
    );
}

export default AddMusic;
// value={inputs.Lname || ""}  value={inputs.Sname || ""}