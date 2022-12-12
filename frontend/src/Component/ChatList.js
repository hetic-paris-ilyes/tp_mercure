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

  //TODO handlesubmit to get chatid et ensuite une redirection vers chat/:chatid

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const userId = e.target[0].value
  //   getChat(userId).then(data => console.log('data : ', data))
  // }

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
  console.log(chat, 'CHAT')
  return (
    <div>
      {chat
        ? chat.map(data => {
            console.log(data, 'DATA')
            return (
           
              <a
                key={data.id}
                className='btn btn-light w-100 text-start btn-message'
                type='submit'
                value={data.id}
                href={`/chat/${data.id}`}
              >
                {/* <ContactPill userName={userItem.username} />
              {userItem.username} <MessageCircle size={25} /> */}
                <strong className='message-preview'>{data.label}</strong>
                <i className='message-content-preview'>
                  {getContentLastMessagePreview(data.messages)}
                </i>
              </a>
            )
          })
        : null}
    </div>
  )
}
