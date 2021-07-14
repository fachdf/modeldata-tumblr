import axios from "axios";
import { USER_URL } from "../const"

const getUserByUsername = async (username) => {
    try {
        console.log(USER_URL + `/getUserByUsername/${username}`)
        const getAllURL = USER_URL + `/getUserByUsername/${username}`
        const result = await axios.get(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}

const createUser = async (data) => {
    try {
        console.log(USER_URL + `/createUser/`)
        const getAllURL = USER_URL + `/createUser/`
        const result = await axios.post(getAllURL,data);
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

const userLogin = async (data) => {
    try {
        console.log(USER_URL + `/userLogin/`)
        const getAllURL = USER_URL + `/userLogin/`
        const result = await axios.post(getAllURL,data);
        return result.data;
    } catch(err) {
        console.log(err);
    }
}

const getSessionUser = async (header) => {
    try {
        console.log(USER_URL + `/getSessionUser/`)
        const getAllURL = USER_URL + `/getSessionUser/`
        const result = await axios.get(getAllURL, header);
        console.log("msk")
        return result.data;
    } catch(err) {
        console.log(err)
    }
}

const getUserPostingan = async (username) => {
    try {
        console.log(USER_URL + `/getUserPostingan/${username}`)
        const getAllURL = USER_URL + `/getUserPostingan/${username}`
        const result = await axios.get(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}
const getUserBio = async (username) =>{
    try {
        console.log(USER_URL + `/getUserBio/${username}`)
        const getAllURL = USER_URL + `/getUserBio/${username}`
        const result = await axios.get(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}
const getUserBlogName = async (username) =>{
    try {
        console.log(USER_URL + `/getUserBlogName/${username}`)
        const getAllURL = USER_URL + `/getUserBlogName/${username}`
        const result = await axios.get(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}
const follow = async (myUsername, targetUsername) =>{
    try {
        console.log(USER_URL + `/follow/${targetUsername}`)
        const getAllURL = USER_URL + `/follow/${targetUsername}`
        const result = await axios.put(getAllURL, {username : myUsername});
        return result;
    } catch(err) {
        console.log(err)
    }
}
const unfollow = async (myUsername, targetUsername) =>{
    try {
        console.log(USER_URL + `/unfollow/${targetUsername}`)
        const getAllURL = USER_URL + `/unfollow/${targetUsername}`
        const result = await axios.put(getAllURL, {username : myUsername});
        return result;
    } catch(err) {
        console.log(err)
    }
}

/* Change user identity */
const updateNamaUser = async (myID, data) =>{
    try {
        console.log(USER_URL + `/updateNamaUser/${myID}`)
        const getAllURL = USER_URL + `/updateNamaUser/${myID}`
        const result = await axios.put(getAllURL, {nama : data});
        return result;
    } catch(err) {
        console.log(err)
    }
}
const updateEmailUser = async (myID, data) =>{
    try {
        
        console.log(USER_URL + `/updateEmailUser/${myID}`)
        const getAllURL = USER_URL + `/updateEmailUser/${myID}`
        const result = await axios.put(getAllURL, {email : data});
        return result;
    } catch(err) {
        console.log(err)
    }
}
const updatePasswordUser = async (myID, data) =>{
    try {
        console.log(USER_URL + `/updatePasswordUser/${myID}`)
        const getAllURL = USER_URL + `/updatePasswordUser/${myID}`
        const result = await axios.put(getAllURL, {password : data});
        return result;
    } catch(err) {
        console.log(err)
    }
}
const updateBioUser = async (myID, data) =>{
    try {
        console.log(USER_URL + `/updateBioUser/${myID}`)
        const getAllURL = USER_URL + `/updateBioUser/${myID}`
        const result = await axios.put(getAllURL, {bio : data});
        return result;
    } catch(err) {
        console.log(err)
    }
}
const updateBlogNameUser = async (myID, data) =>{
    try {
        console.log(USER_URL + `/updateBlogNameUser/${myID}`)
        const getAllURL = USER_URL + `/updateBlogNameUser/${myID}`
        const result = await axios.put(getAllURL, {blog_name : data});
        return result;
    } catch(err) {
        console.log(err)
    }
}
const deleteUser = async (myID) =>{
    try {
        console.log(USER_URL + `/updateBlogNameUser/${myID}`)
        const getAllURL = USER_URL + `/updateBlogNameUser/${myID}`
        const result = await axios.delete(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}

export default {
    getUserByUsername, 
    createUser, 
    userLogin, 
    getSessionUser, 
    getUserPostingan,
    getUserBio,
    getUserBlogName,
    follow,
    unfollow,
    updateNamaUser,
    updateEmailUser,
    updatePasswordUser,
    updateBioUser,
    updateBlogNameUser,
    deleteUser
}