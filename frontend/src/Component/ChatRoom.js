/* eslint-disable react-hooks/rules-of-hooks */

import { useContext, useState, useEffect } from 'react'
import { Loader, Send } from 'react-feather'
import { Col, Container, Row, Input, Form } from 'reactstrap'
import { userContext } from '../Context/UserContext'
import ContactPill from './ContactPill'
import { useLocation } from 'react-router-dom';
import useGetMessagesChat from '../Hook/useGetMessagesChat'
import usePostMessage from '../Hook/usePostMessage'


export default function ChatRoom () {

const location = useLocation();
const parseUrl = location.pathname.split("/")
const chatID = parseUrl[parseUrl.length-1]
const [chat, setChat] = useState([])

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
  console.log('ChatRoom.user : ', user)
  const getMessagesChat = useGetMessagesChat()

  useEffect(() => {
    getMessagesChat(chatID).then(data => setChat(data.chat[0]))
  }, [chatID])
  

  //useparams
  const handleSubmit = (event) => {
    event.preventDefault();
    const chatId = 21; //rajouter chatId
    const content = event.target[0].value;
    // const authorId = myUser.mercure.payload.userid; real id user
    const authorId = 120;

    var obj = new Object();
    obj.content  = content;
    obj.chatId = chatId;
    obj.authorId = authorId;

    var myMessage= JSON.stringify(obj);
    usePostMessage(myMessage);
  }
  return (
    <Row className='main-chat'>
        {console.log(chat, "CHATHHHHHHH")}
      <Row className='header-chat'>
        <h6 className='session-user'>
          <ContactPill className='' userName={'Contact 1'} /> Contact 1
        </h6>
      </Row>

      <Row className='section-chat'>
        <div className='messages'>
          <div className='message contact'>
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
          </div>
        </div>
      </Row>
      <Row className='chat-tools'>
        <Form className='d-flex' onSubmit={handleSubmit}>
          <Input type='textarea' placeholder='Ecrivez votre message ...' />
          <button type='submit'>
            <Send size={35} />
          </button>
        </Form>
      </Row>
    </Row>
  )
}
