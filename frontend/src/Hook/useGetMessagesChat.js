export default function useGetMessagesChat() {
    return function (userId) {
        return fetch(`http://localhost:8245/chat/${userId}`, {
            method: 'GET',
        })
            .then(data => data.json())
    }
}
