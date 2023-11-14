import React, { useState, useEffect } from "react";
import axios from "axios";
let musicDB=[];
export const setSongDB = (playlist) => {
    return musicDB=playlist;
};
export default musicDB;


// export function getContentData() {
//     return new Promise((resolve) => {
//       // fetch async stuff here
//       resolve(myDataHere)
//     })
//   }