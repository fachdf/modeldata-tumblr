import userNetworkSource from "../datasource/user"

const getUserByUsername = async (nama) => {
    console.log("ini username: " + nama)
    return await userNetworkSource.getUserByUsername(nama)
}

export default {
    getUserByUsername
}