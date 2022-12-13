export default function useGetAllChats() {
    return function (myUser) {
        return fetch(`http://localhost:8245/allChat?myUser=${myUser}`, {
            method: 'GET',
            mode: "cors"
        })
            .then(data => data.json())
    }
}