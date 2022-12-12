export default function useGetUserList(myUser) {
    return function () {
        return fetch(`http://localhost:8245/allChat?myUser=${myUser}`, {
            method: 'GET',
            mode: "cors"
        })
            .then(data => data.json())
    }
}