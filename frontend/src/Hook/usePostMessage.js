export default function usePostMessage() {
    return function (dataToSend) {
        return fetch(`http://localhost:8245/chat/createMessage`, {
            method: 'POST',
            body: dataToSend
        })
            .then(data => data.json())
    }
}