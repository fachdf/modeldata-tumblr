import axios from "axios";
import { RESPON_URL } from "../const"

const likePostingan = async (data) => {
    try {
        const postID = data.postID
        const getAllURL = RESPON_URL + `/likePostingan/${postID}`
        const result = await axios.post(getAllURL, data)  
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

const getPostinganLikers = async (responID) => {
    try {
        const getAllURL = RESPON_URL + `/getPostinganLikers/${responID}`
        const result = await axios.get(getAllURL)  
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

const deleteLike = async (data) => {
    try {
        const postID = data.postID
        const getAllURL = RESPON_URL + `/unlikePostingan/${postID}`
        const result = await axios.post(getAllURL, data)  
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

export default {
    likePostingan,
    getPostinganLikers,
    deleteLike
}