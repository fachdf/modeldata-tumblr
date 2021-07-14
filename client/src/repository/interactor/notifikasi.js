import notifikasiNetworkSource from "../datasource/notifikasi"

const getUserNotification = async (username) => {
    console.log(username)
    return await notifikasiNetworkSource.getUserNotification(username)
}

const deleteUserNotification = async (username) => {
    return await notifikasiNetworkSource.deleteUserNotification(username)
}

export default {
    getUserNotification,
    deleteUserNotification
}