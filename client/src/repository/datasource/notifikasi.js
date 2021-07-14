
import axios from "axios";
import { NOTIFICATION_URL } from "../const"

const getUserNotification = async (username) => {
    try {
        console.log(NOTIFICATION_URL + `/getUserNotification/${username}`)
        const getAllURL = NOTIFICATION_URL + `/getUserNotification/${username}`
        const result = await axios.get(getAllURL);
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

const deleteUserNotification = async (username) => {
    try {
        console.log(NOTIFICATION_URL + `/deleteUserNotification/${username}`)
        const getAllURL = NOTIFICATION_URL + `/deleteUserNotification/${username}`
        const result = await axios.delete(getAllURL);
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

export default {
    getUserNotification,
    deleteUserNotification
}