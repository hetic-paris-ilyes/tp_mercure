export default async function useGetRoomId(userTo, myUser) {
    console.log(userTo, myUser)
    try {
        const res = await fetch(`http://localhost:8245/getChatRoom?userTo=${userTo}&myUser=${myUser}`, {
            method: 'GET'
        })
        if (res) 
        return res.json()
    } catch (error) {
        console.log(error)
        return error;
    }

}