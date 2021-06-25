import axios from "axios";
import { USER_URL } from "../const"

const getUserByUsername = async (nama) => {
    try {
        console.log(USER_URL + `/getUserByUsername/${nama}`)
        const getAllURL = USER_URL + `/getUserByUsername/${nama}`
        const result = await axios.get(getAllURL);
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

export default {
    getUserByUsername
}