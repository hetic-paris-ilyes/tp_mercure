export default async function usePostMessage(dataToSend) {
    try {
        const res = await fetch('http://localhost:8245/createMessage', {
            method: 'POST',
            body: dataToSend
        })
        if (res) console.log("message sent")
        return res
    } catch (error) {
        return error;
    }

}