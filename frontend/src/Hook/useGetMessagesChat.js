export default function useGetMessagesChat() {
    return function (userId) {
        return fetch(`http://localhost:8245/chat/${userId}`, {
            method: 'POST',
        })
            .then(data => data.json())
    }
}