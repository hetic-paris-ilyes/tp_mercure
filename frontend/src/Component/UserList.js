import { useEffect, useState } from 'react'
import useGetUserList from '../Hook/useGetUserList'
import { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'react-feather'
import ContactPill from './ContactPill'
import useGetMessagesChat from '../Hook/useGetMessagesChat'

export default function UserList () {
  const parseJwt = token => {
    if (!token) {
      return
    }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }

  const [userList, setUserList] = useState([])

  const { user } = useContext(userContext)
  const getUserList = useGetUserList()
  const getMessagesChat = useGetMessagesChat()
  const myUser = parseJwt(user)
  const loggedUserID = user ? myUser.mercure.payload.userid : null

  //TODO handlesubmit to get chatid et ensuite une redirection vers chat/:chatid

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const userId = e.target[0].value
  //   backendChat(userId).then(data => console.log('data : ', data))
  // }

  const handleMessage = e => {
    document
      .querySelector('h1')
      .insertAdjacentHTML(
        'afterend',
        '<div class="alert alert-success w-75 mx-auto">Ping !</div>'
      )
    window.setTimeout(() => {
      const $alert = document.querySelector('.alert')
      $alert.parentNode.removeChild($alert)
    }, 2000)
    console.log(JSON.parse(e.data))
  }
  useEffect(() => {
    getUserList().then(data => setUserList(data.users))
    // getMessagesChat(4).then(data => console.log(data))
    /*const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }*/
  }, [])

  return (
    <div>
      {userList.map(userItem =>
        userItem.id !== loggedUserID ? (
          <form key={userItem.id} className='contact-wrapper'>
            <button
              className='btn btn-light w-100 text-start btn-contact'
              type='submit'
              value={userItem.id}
            >
              <ContactPill userName={userItem.username} />
              {userItem.username} <MessageCircle size={25} />
            </button>
          </form>
        ) : null
      )}
    </div>
  )
}
