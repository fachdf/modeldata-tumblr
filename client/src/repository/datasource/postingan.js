import axios from "axios";
import { POST_URL } from "../const"

const createPostingan = async (data) => {
    try {
        const getAllURL = POST_URL + '/createPostingan'
        const result = await axios.post(getAllURL, data)  
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

const getAllPostingan = async () => {
    try {
        console.log(POST_URL + `/getAllPostingan/`)
        const getAllURL = POST_URL + `/getAllPostingan/`
        const result = await axios.get(getAllURL);
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

const getPostinganById = async (id) => {
    try {
        console.log(POST_URL + `/getPostinganById/${id}`)
        const getAllURL = POST_URL + `/getPostinganById/${id}`
        const result = await axios.get(getAllURL);
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

export default {
    createPostingan,
    getAllPostingan,
    getPostinganById
}