export default function useGetAllChats() {
    return function (myUser) {
        console.log(myUser, "user getUserList")
        return fetch(`http://localhost:8245/allChat?myUser=${myUser}`, {
            method: 'GET',
            mode: "cors"
        })
            .then(data => data.json())
    }
}