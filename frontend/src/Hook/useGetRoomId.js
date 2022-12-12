export default function useGetRoomId() {
    return function (userTo, myUser) {
        return fetch(`http://localhost:8245/getChatRoom?${userTo}&${myUser}`, {
            method: 'GET',
        })
            .then(data => data.json())
            .then(data => data.message)
    }
}