import React, {useContext, useEffect, useRef, useState} from 'react';
import '../assets/scss/AddMusic.scss';
import {Add, Image, MusicNoteTwoTone, CheckCircleOutlineTwoTone, UpdateTwoTone} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {ThemeContext} from "../../api/Theme";
import musicDB from "../../db/music";
import axios from "axios";
import { useHistory, Redirect, Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import HashLoader from "react-spinners/HashLoader";
import { getStorage, deleteObject } from "firebase/storage";

import {
    ref, 
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { storage } from "../../firebase";
  import { v4 } from "uuid";

function EditMusic() {
    let [loadingInProgress, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    let notAvail="https://firebasestorage.googleapis.com/v0/b/music-db-19482.appspot.com/o/images%2FnotAvailable.jpg?alt=media&token=6d200741-88a0-4128-8764-41c82f8f4315";



    const [data,setData] = useState({});

    let ss="";
    // let id =musicDB[musicDB.length-1].id + 1;
    useEffect(()=>{
        // async function getData(){
        //     await axios.get(`${window.API_URL}/songs`)
        //     .then(response => setDB(response.data))
        //     .catch(error => console.error(error));
        // } 
        console.log(window.location.pathname.substring(15));
        // getData();
        // ss=;
        let data = qs.stringify({
            id:window.location.pathname.substring(15)
          });

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${window.API_URL}/get_song`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            data : data
          };
          setLoading(true);
          axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data.name));
            setData(response.data);
            setLoading(false);
            // navigate('/home');
            // history.push("/home");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error); 
            // alert(error);

            
            });

    },[])

    const selectImg = () =>{
        fileRef.current.click()
    }
    const selectSong = () =>{
        fileRef2.current.click()
    }
    const handleChange = (e) => {
        inputs.onChange(e)
        
    }

    async function  handleDeleteImg(img, _id) {

        if(img !== notAvail){
            const fileRef = ref(storage, img);
            await deleteObject(fileRef).then(() => {
                console.log("Image deleted successfully");
            }).catch((error) => {
                console.log(error);
            });
        }
        
        

       
    }

    async function handleDeleteSong(musicName, _id) {
        const fileRef2 = ref(storage, musicName);
        await deleteObject(fileRef2).then(() => {
            console.log("Song deleted successfully");
            
        }).catch((error) => {
            console.log(error);
        });
    }

    const uploadImg = ()=>{
        setLoading(true);

        console.log(imageUpload);
        if (imageUpload == null) return;
        handleDeleteImg(data.img, data._id);
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            setLoading(false);
            // alert("File Uploaded")
            handleShow();
            return getDownloadURL(snapshot.ref)
        }).then(downloadURL => {
            console.log('Download URL', downloadURL)
            setSelected(downloadURL.toString())
        });
    }
    const uploadSong = ()=>{
        setLoading(true);
        console.log(songUpload);
        if (songUpload == null) return;
        data.musicName?
        handleDeleteSong(data.musicName, data._id) : console.log("clear");
        const songRef = ref(storage, `songs/${songUpload.name + v4()}`);
        const metadata = {
            contentType: 'audio/mpeg',
            };
        uploadBytes(songRef, songUpload, metadata).then((snapshot) => {
            setLoading(false);
            // alert("File Uploaded")
            handleShow();
            return getDownloadURL(snapshot.ref)
        }).then(downloadURL => {
            console.log('Download URL', downloadURL)
            setSelected2(downloadURL.toString())
        });
    }
    const add=(e)=>{
        let dat = qs.stringify({
            id: data._id,
            name: inputs.songName || data.name,
            author_name: inputs.Sname || data.author_name,
            img: selected || data.img,
            lang: inputs.Lang || data.lang,
            timesPlayed: data.timesPlayed,
            type: inputs.Type || data.type,
            musicName: selected2 || data.musicName,
            attribution:{
                song: inputs.songName || data.songName,
                musicBy: inputs.Sname || data.author_name,
                download: null,
                stream: null
            }
          });
          console.log(dat);

          let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${window.API_URL}/edit_song`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            data : dat
          };

          axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
            // navigate('/home');
            // history.push("/home");
            })
            .catch((error) => {
            console.log(error); 
            // alert(error);

            // e.preventDefault();
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

            {   loadingInProgress &&
                <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", background:"rgba(0, 0, 0, 0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:"2"}}>
                    <HashLoader color="#A2D5F2" loading={loadingInProgress} size={90} />
                </div>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h5>Welcome Admin,</h5> */}
                    <h5>File Uploaded Sucessfully <CheckCircleOutlineTwoTone  style={{color:"green", fontSize:'36px'}}/></h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button  style={{color:"white", backgroundColor:"royalblue"}} onClick={handleClose}>
                        Ok
                    </Button> 
                    {/* <Button  style={{color:"white", backgroundColor:"red", margin:"0px 10px"}} onClick={function(){
                            handleClose();
                            
                        }}>
                        Yes
                    </Button> */}
                    {/* <Button  style={{color:"white", backgroundColor:"red"}} onClick={handleClose}>
                        Close
                    </Button> */}
                </Modal.Footer>
            </Modal>

            <div className="add-music-sub-container">
                <div className="d1">
                    <Button  onClick={selectImg}  style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"} >
                        <Image titleAccess={"Select a music cover"} style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    
                    <input ref={fileRef} accept="image/*" type="file"  id={"music-img"} hidden onChange={uploadImg}/>
                    <p>{imgName}</p>
                    <Button htmlFor={"music-img"} onClick={selectSong}  style={{backgroundColor: useStyle.subTheme,width:"200px",height:"200px"}} variant={"contained"} >
                        <MusicNoteTwoTone titleAccess={"Select a music"}  style={{color:"#f0f0f0",width:"150px",height:"150px"}}/>
                    </Button>
                    <input ref={fileRef2} accept="audio/*" hidden type="file" onChange={uploadSong}/>
                    <p>{songName}</p>
                    <select  defaultValue={data.lang} onChange={handleChange} required name='Lang'>
                        <option value="">Select Language</option>
                        <option value="HINDI">Hindi</option>
                        <option value="ENGLISH">English</option>
                        <option value="PUNJABI">Punjabi</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <br />
                    <select onChange={handleChange} name='Type' defaultValue={data.type}>
                        <option value="">Select Type</option>
                        <option value="instrumental">Instrumental</option>
                        <option value="electronic">Electronic</option>
                        <option value="groovy">Groovy</option>
                        <option value="love">Love</option>
                        <option value="sufi">Sufi</option>
                    </select>
                </div>
                <div className="d2">
                    <div>
                        <input type="text" placeholder={"Song Name"} id={"songName"} name='songName' defaultValue={data.name}  onChange={handleChange} required/>
                        {/* <input type="text" placeholder={"CurrentPlayingLarge Name"} id={"name"} name='Lname'   onChange={handleChange} required/> */}
                        <input type="text" placeholder={"Singer Name"} id={"artist"} name='Sname' defaultValue={data.author_name}  onChange={handleChange} required/>
                        <Button  style={{backgroundColor: useStyle.theme, width:'100%'}} variant={"contained"} endIcon={<UpdateTwoTone/>} onClick={add} type='submit' href='/home/edit'>
                            {/* <Link to={"/home"} style={{textdecoration: ""}}> */}
                            Update
                            {/* </Link> */}
                            
                        </Button>
                    </div>
                    <div className={"preview"}>
                        <h3>Preview</h3>
                        <p>Music Cover : {inputs.songName || data.name}</p>
                        <p>Music Image : {imgName || "Default"}</p>
                        <p>Music Name : {songName || "Default"}</p>
                        <p>Singer Name : {inputs.Sname || data.author_name}</p>
                        <p>Language : {inputs.Lang || data.lang}</p>
                        <p>Type : {inputs.Type || data.type}</p>
                    </div>
                </div>
            </div>

        </form>
    );
}

export default EditMusic;
// value={inputs.Lname || ""}  value={inputs.Sname || ""}