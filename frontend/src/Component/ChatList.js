import { useEffect, useState } from 'react'
import useGetUserList from '../Hook/useGetUserList'
import useGetAllChats from '../Hook/useGetAllChats'
import useGetMessagesChat from '../Hook/useGetMessagesChat'
import { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'react-feather'
import ContactPill from './ContactPill'

const TestChat = ({ chatId }) => {
  const getChat = useGetMessagesChat()
  const [chat, setChat] = useState({})

  useEffect(() => {
    getChat(chatId).then(res => setChat(res))
  }, [])

  return <p>chat</p>
}

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
  const [testi, setTesti] = useState([])

  const { user } = useContext(userContext)
  const myUser = parseJwt(user)
  const loggedUserID = user ? myUser.mercure.payload.userid : null
  const getAllChats = useGetAllChats(loggedUserID)
  const getAllMessages = useGetMessagesChat()

  //TODO handlesubmit to get chatid et ensuite une redirection vers chat/:chatid

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const userId = e.target[0].value
  //   getChat(userId).then(data => console.log('data : ', data))
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
    getAllChats(loggedUserID).then(data => setChatList(data.Chats))
    getAllMessages(4).then(data => setTesti(data))
    console.log("les datas:", testi)
  }, [])

  return (
    <div>
      {chatList.length !== 0
        ? chatList.map(chat => {
            return <TestChat chatId={chat} />
          })
        : null}
    </div>
  )
}
