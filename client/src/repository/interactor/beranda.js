import berandaNetworkSource from "../datasource/beranda"

const getBerandaByID = async (username) => {
    return await berandaNetworkSource.getBerandaByID(username)
}

const fetchPost = async (username) => {
    return await berandaNetworkSource.fetchPost(username)
}

export default {
    getBerandaByID,
    fetchPost
}