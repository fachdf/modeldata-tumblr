import userNetworkSource from "../datasource/user"

const getUserByUsername = async (username) => {
    return await userNetworkSource.getUserByUsername(username)
}

const createUser = async (data) => {
    console.log(data)
    return await userNetworkSource.createUser(data)
}

const userLogin = async (data) => {
    console.log(data)
    return await userNetworkSource.userLogin(data)
}

const getSessionUser = async (header) => {
    return await userNetworkSource.getSessionUser(header)
}

const getUserPostingan = async (user) => {
    return await userNetworkSource.getUserPostingan(user)
}

const getUserBio = async (username) =>{
    return await userNetworkSource.getUserBio(username)
}

const getUserBlogName = async (username) =>{
    return await userNetworkSource.getUserBlogName(username)
}

const follow = async (myUsername, targetUsername) =>{
    return await userNetworkSource.follow(myUsername, targetUsername)
}

const unfollow = async (myUsername, targetUsername) =>{
    return await userNetworkSource.unfollow(myUsername, targetUsername)
}

/* Change user identity */
const updateNamaUser = async (myID, data) =>{
    return await userNetworkSource.updateNamaUser(myID, data)
}
const updateEmailUser = async (myID, data) =>{
    return await userNetworkSource.updateEmailUser(myID, data)
}
const updatePasswordUser = async (myID, data) =>{
    return await userNetworkSource.updatePasswordUser(myID, data)
}
const updateBioUser = async (myID, data) =>{
    return await userNetworkSource.updateBioUser(myID, data)
}
const updateBlogNameUser = async (myID, data) =>{
    return await userNetworkSource.updateBlogNameUser(myID, data)
}
const deleteUser = async (myID) =>{
    return await userNetworkSource.deleteUser(myID)
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