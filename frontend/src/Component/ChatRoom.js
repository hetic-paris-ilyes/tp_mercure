/* eslint-disable react-hooks/rules-of-hooks */

import { useContext, useState, useEffect } from 'react'
import { Loader, Send } from 'react-feather'
import { Col, Container, Row, Input, Form } from 'reactstrap'
import { userContext } from '../Context/UserContext'
import ContactPill from './ContactPill'
import { useLocation } from 'react-router-dom'
import useGetMessagesChat from '../Hook/useGetMessagesChat'
import usePostMessage from '../Hook/usePostMessage'

export default function ChatRoom () {
  const location = useLocation()
  const parseUrl = location.pathname.split('/')
  const chatID = parseUrl[parseUrl.length - 1]
  const [chat, setChat] = useState([])
  const [contacts, setContacts] = useState([])
  const [contentMsg, setContentMsg] = useState();
  const handleChange = (event) => {
    setContentMsg(event.target.value);
  }

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
  const loggedUserID = myUser?.mercure.payload.userid
  const getMessagesChat = useGetMessagesChat()

  const getContact = messages => {
    let tmp_members = []
    messages?.map(message => {
        if (message.author.id !== loggedUserID) tmp_members.push(message.author)
    })
    setContacts(tmp_members)
  }

  useEffect(() => {
    getMessagesChat(chatID).then(data => setChat(data.chat[0]))
    getContact(chat?.messages)
  }, [chatID, chat])

  /*
   const handleMessage = (e) => {
        console.log("Ca marche");
    }
  useEffect(() => {
    const url = new URL('http://localhost:9090/.well-known/mercure');
    url.searchParams.append('topic', 'https://example.com/my-private-topic');

    const eventSource = new EventSource(url, {withCredentials: true});
    eventSource.onmessage = handleMessage;

    return () => {
      eventSource.close()
    }

  }, [])
  */


  //useparams
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target[0].value;

    const authorId = myUser.mercure.payload.userid;
    // const authorId = 21

    var obj = new Object()
    obj.content = content
    obj.chatId = chatID
    obj.authorId = authorId

    var myMessage= JSON.stringify(obj);
    const sendMessage = await usePostMessage(myMessage);
    setContentMsg("");

  }

  return (
    <Row className='main-chat'>
      <Row className='header-chat'>
        <h6 className='session-user'>
          {/* {console.log(contacts, "co")} */}
          {contacts && contacts.length !== 0 ? <><ContactPill className='' userName={contacts[0].username} /> {contacts[0].username}</> : "Nouvelle conversation" }
        </h6>
      </Row>

      <Row className='section-chat'>
        <div className='messages'>
          {chat?.messages ? chat.messages.map(message => {
            const author = message.author
            return (
              <div
                className={`message ${
                  loggedUserID === author.id ? 'currentUser' : 'contact'
                }`}
                key={message.id}
              >
                <ContactPill className='' userName={author.username} />
                <p>{message.content}</p>
              </div>
            )
          }) : <div className='empty-chat'>Il n'y a pas encore de messages.</div> }
          {/* <div className='message contact'>
            <ContactPill className='' userName={'Contact 1'} />
            <p>
              lorelscn ujsdnhvksn cfsdvhkdhvn cksjvbskvnkncs vzskvhsikv
              svknbdkvs{' '}
            </p>
          </div>

          <div className='message currentUser'>
            <ContactPill className='currentUser' userName={'Contact 1'} />{' '}
            <p>
              lorelscn ujsdnhvksn cfsdvhkdhvn cksjvbskvnkncs vzskvhsikv
              svknbdkvs{' '}
            </p>
          </div> */}
        </div>
      </Row>
      <Row className='chat-tools'>
        <Form className='d-flex' onSubmit={handleSubmit}>
          <Input type='textarea' placeholder='Ecrivez votre message ...' value={contentMsg} onChange={handleChange} />
          <button type='submit'>
            <Send size={35} />
          </button>
        </Form>
      </Row>
    </Row>
  )
}
