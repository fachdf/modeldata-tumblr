import axios from "axios";
import { BERANDA_URL } from "../const"

const getBerandaByID = async (id) => {
    try {
        console.log(BERANDA_URL + `/getBerandaByID/${id}`)
        const getAllURL = BERANDA_URL + `/getBerandaByID/${id}`
        const result = await axios.get(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}
const fetchPost = async (username) => {
    try {
        console.log(BERANDA_URL + `/fetchPost/${username}`)
        const getAllURL = BERANDA_URL + `/fetchPost/${username}`
        const result = await axios.get(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}
export default {
    getBerandaByID,
    fetchPost
}