import { useEffect, useState } from 'react'
import useGetUserList from '../Hook/useGetUserList'
import useGetAllChats from '../Hook/useGetAllChats'
import useGetMessagesChat from '../Hook/useGetMessagesChat'
import { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'react-feather'
import ContactPill from './ContactPill'

export default function ChatList ({ chat, userID }) {
  const parseJwt = token => {
    if (!token) {
      return
    }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }

  const { user } = useContext(userContext)
  const myUser = parseJwt(user)

  const users = chat.users

  //TODO handlesubmit to get chatid et ensuite une redirection vers chat/:chatid

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const userId = e.target[0].value
  //   getChat(userId).then(data => console.log('data : ', data))
  // }

  const getPill = (members, userId) => {
    const render = members.map(member => {
      console.log(userId, "========", member.id)
      return (
        <ContactPill className={`${
          userId === member.id ? 'currentUser' : 'contact'
        }`} key={member.id} userName={member.username} />
        )
    })
    return ( <span className='d-flex'>{render}</span>)
   
  }

  const getMembers = members => {
    const users = []
    members.map(member => {
      users.push(member.username)
    })
    const userString = users.join(', ')
    return <strong>{userString}</strong>
  }

  const getContentLastMessagePreview = messages => {
    const render = messages.map((message, index) => {
      if (index === messages.length - 1) {
        return (
          <i className='message-content-preview' key={index}>
            {message.content}
          </i>
        )
      }
    })
    return render
  }
  return (
    <span>
      {chat ? (
        <a
          key={chat.id}
          className='btn btn-light w-100 text-start btn-message'
          type='submit'
          value={chat.id}
          href={`/chat/${chat.id}`}
        >
          <h6 className='message-members'>{getPill(chat.users, userID)}
          {getMembers(chat.users)}</h6>
          <span className='message-preview'>{chat.label}</span>
          {chat.messages ? (
            <i className='message-content-preview'>
              {getContentLastMessagePreview(chat.messages)}
            </i>
          ) : null}
        </a>
      ) : null}
    </span>
  )
}
