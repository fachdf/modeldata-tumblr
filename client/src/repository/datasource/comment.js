import axios from "axios";
import { COMMENT_URL } from "../const"

const getCommentByResponID = async (id) => {
    try {
        console.log(COMMENT_URL + `/getCommentByResponID/${id}`)
        const getAllURL = COMMENT_URL + `/getCommentByResponID/${id}`
        const result = await axios.get(getAllURL);
        return result;
    } catch(err) {
        console.log(err)
    }
}
const createComment = async (data) => {
    try {
        console.log(COMMENT_URL + `/createComment/${data.postID}`)
        const getAllURL = COMMENT_URL + `/createComment/${data.postID}`
        const result = await axios.post(getAllURL, data.comment);
        return result;
    } catch(err) {
        console.log(err)
    }
}
export default {
    getCommentByResponID,
    createComment
}