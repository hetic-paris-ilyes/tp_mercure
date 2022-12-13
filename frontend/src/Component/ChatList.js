import { useEffect, useState } from 'react'
import useGetUserList from '../Hook/useGetUserList'
import useGetAllChats from '../Hook/useGetAllChats'
import useGetMessagesChat from '../Hook/useGetMessagesChat'
import { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'react-feather'
import ContactPill from './ContactPill'

export default function ChatList ({ chat }) {
  console.log(chat, 'CHAT')
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
    <div>
      {chat ? (
        <a
          key={chat.id}
          className='btn btn-light w-100 text-start btn-message'
          type='submit'
          value={chat.id}
          href={`/chat/${chat.id}`}
        >
          {/* <ContactPill userName={userItem.username} />
              {userItem.username} <MessageCircle size={25} /> */}
          <strong className='message-preview'>{chat.label}</strong>
          <i className='message-content-preview'>
            {getContentLastMessagePreview(chat.messages)}
          </i>
        </a>
      ) : null}
    </div>
  )
}
