import commentNetworkSource from "../datasource/comment"


const getCommentByResponID = async (id) => {
    //console.log("ini username: " + nama)
    return await commentNetworkSource.getCommentByResponID(id)
}

const createComment = async (data) => {
    //console.log("ini username: " + nama)
    return await commentNetworkSource.createComment(data)
}
export default {
    getCommentByResponID,
    createComment
}