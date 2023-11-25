import React, {useEffect, useState} from 'react';
import '../assets/scss/MusicCard.scss';
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

import {useDispatch, useSelector} from "react-redux";
import {increaseTimesPlayed, setCurrentPlaying} from "../../actions/actions";
import Name from "./Name";
import {Skeleton} from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import {Avatar, Button} from "@material-ui/core";
import { getStorage, ref, deleteObject } from "firebase/storage";
import axios from "axios";
// import { css } from "@emotion/react";
import Modal from 'react-bootstrap/Modal';
import dlt from "../assets/img/delete.png"
import edit from "../assets/img/edit.png"


function MusicCard(props) {
    
    const {_id, name, img, author_name, musicName} = props.music;
    const {playlists} = useSelector(state => state.musicReducer);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let notAvail="https://firebasestorage.googleapis.com/v0/b/music-db-19482.appspot.com/o/images%2FnotAvailable.jpg?alt=media&token=6d200741-88a0-4128-8764-41c82f8f4315";
    // let id=playlists.findIndex(function(object){
    //     return object._id===_id
    // });

    const [isHovered, setHovered] = useState(false);

    function handleResponse() {
        setHovered(!isHovered);
    }
 
    const dispatch = useDispatch();

    function handlePlay() {
        dispatch(setCurrentPlaying(props.music))
        dispatch(increaseTimesPlayed(_id));
    }

    async function  handleDelete(img, musicName, _id) {



        const storage = getStorage();
        const qs = require('qs');
        if(img != notAvail){
            const fileRef = ref(storage, img);
            await deleteObject(fileRef).then(() => {
                console.log("Image deleted successfully");
            }).catch((error) => {
                console.log(error);
            });
        }
        

        const fileRef2 = ref(storage, musicName);
        await deleteObject(fileRef2).then(() => {
            console.log("Song deleted successfully");
            
        }).catch((error) => {
            console.log(error);
        });

        let data = qs.stringify({
            'id': _id 
          });
          
          let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${window.API_URL}/dlt_song`,
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

          window.location.reload();
    }

    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        setLoaded(true)
    },[]);

    return (
        <div className={"music-card"}>
            
            {
                !loaded ?
                <div className={"Skeleton-top"}>
                    <Skeleton variant="rect" width={210} height={210} />
                    <Box pt={0.5}>
                        <Skeleton />    
                        <Skeleton width="60%" />
                    </Box>
                </div>
                    :
                    <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Alert</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <h5>Welcome Admin,</h5> */}
                            <h5>Are you sure, you want to delete <b>{name}</b> by <b>{author_name}</b> ?</h5>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button  style={{color:"white", backgroundColor:"royalblue"}} onClick={handleClose}>
                                No
                            </Button> 
                            <Button  style={{color:"white", backgroundColor:"red", margin:"0px 10px"}} onClick={function(){
                                   handleClose();
                                   handleDelete(img, musicName, _id);
                                }}>
                                Yes
                            </Button>
                            {/* <Button  style={{color:"white", backgroundColor:"red"}} onClick={handleClose}>
                                Close
                            </Button> */}
                        </Modal.Footer>
                    </Modal>
                        <div onClick={handlePlay}  className={"music-card-cover"} onMouseOver={handleResponse}>
                            {/* <img src={require("../assets/img/" + img)} alt={name}/> */}

                            <img src={img} alt={name}/>
                            
                            <div className="play-circle">
                                <PlayCircleFilledWhiteIcon/>
                            </div>
                        </div>
                        <React.Fragment>
                            <Name name={name} className={"song-name"} length={name.length}/>
                            <Name name={author_name} className={"author-name"} length={author_name.length}/>
                        </React.Fragment>
                        { window.location.pathname==="/home/edit"?
                            <div style={{display:"flex", justifyContent:"space-evenly", backgroundColor:"#E1F2FB", padding:"2px"}}>
                                <Button href={`/home/editsong/${_id}`} title='Edit Song' style={{ borderRadius:"5px", color:"white", padding:"0"}}><img src={edit} width={"30px"}/></Button>
                                <Button title='Delete Song' style={{ borderRadius:"5px", color:"white"}} onClick={ function(){
                                   handleShow();
                                }} ><img src={dlt} width={"30px"}/></Button>
                            </div> :
                            <></>
                        }
                        
                    </>
            }


        </div>
    );
}

export default MusicCard;