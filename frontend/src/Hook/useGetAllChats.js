export default function useGetUserList() {
    return function (myUser) {
        return fetch(`http://localhost:8245/allChat?${myUser}`, {
            method: 'GET',
            mode: "cors"
        })
            .then(data => data.json())
    }
}