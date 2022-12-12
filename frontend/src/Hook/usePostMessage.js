export default function usePostMessage(dataToSend) {
    console.log('hook', dataToSend);
    return function (dataToSend) {
        return fetch(`http://localhost:8245/createMessage`, {
            method: 'POST',
            body: dataToSend
        })
            .then(data => data.json())
    }
}