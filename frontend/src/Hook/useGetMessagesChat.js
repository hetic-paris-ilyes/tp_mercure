export default function useGetMessagesChat () {
  return async function (id) {
    return fetch(`http://localhost:8245/chat/${id}`, {
      method: 'GET',
    }).then(data => {
        data.json()
    })
  }
}
