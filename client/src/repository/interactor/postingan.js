import postinganNetworkSource from "../datasource/postingan"
const createPostingan = async (data) => {
    return await postinganNetworkSource.createPostingan(data)
}
const getAllPostingan = async () => {
    //console.log("ini username: " + nama)
    return await postinganNetworkSource.getAllPostingan()
}

const getPostinganById = async (id) => {
    //console.log("ini username: " + nama)
    return await postinganNetworkSource.getPostinganById(id)
}
export default {
    getAllPostingan,
    createPostingan,
    getPostinganById
}