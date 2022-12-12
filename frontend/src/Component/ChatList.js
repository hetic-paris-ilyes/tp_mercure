import { useEffect, useState } from 'react'
import useGetUserList from '../Hook/useGetUserList'
import useGetAllChats from '../Hook/useGetAllChats'
import useBackendChat from '../Hook/useBackendChat'
import { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'react-feather'
import ContactPill from './ContactPill'

export default function ChatList () {
  const parseJwt = token => {
    if (!token) {
      return
    }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }

  const [chatList, setChatList] = useState([])

  const { user } = useContext(userContext)
  const backendChat = useBackendChat()
  const myUser = parseJwt(user)
  const loggedUserID = user ? myUser.mercure.payload.userid : null
  const getAllChats = useGetAllChats(loggedUserID)

  //TODO handlesubmit to get chatid et ensuite une redirection vers chat/:chatid

  const handleSubmit = e => {
    e.preventDefault()
    const userId = e.target[0].value
    backendChat(userId).then(data => console.log('data : ', data))
  }

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
    getAllChats(loggedUserID).then(data => setChatList(data.Chats))
  }, [])

  const renderChatList = (chatList) => {
    if (chatList.length > 0) {
      chatList.map(chat => {
        <form key={chat.id} className='contact-wrapper'>
          {console.log("Chat detail:", chat)}
            <a
              className='btn btn-light w-100 text-start btn-contact'
              type='submit'
              value={chat.id}
              href={`/chat/${chat.id}`}
            >
              {/* <ContactPill userName={userItem.username} />
              {userItem.username} <MessageCircle size={25} /> */}
            </a>
          </form>
      })
    }
  }
  return (
    <div>
      {console.log("ChatList : ", chatList)}
        {renderChatList(chatList)}
    </div>
  )
}
