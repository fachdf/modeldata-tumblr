import responNetworkSource from "../datasource/respon"

const likePostingan = async (data) => {
    console.log(data)
    return await responNetworkSource.likePostingan(data)
}

const getPostinganLikers = async (responID) => {
    return await responNetworkSource.getPostinganLikers(responID)
}

const deleteLike = async (data) => {
    console.log("data delete like")
    console.log(data)
    return await responNetworkSource.deleteLike(data)
}

export default {
    likePostingan,
    getPostinganLikers,
    deleteLike
}