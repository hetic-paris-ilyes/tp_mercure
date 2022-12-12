/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { Send } from 'react-feather'
import { Col, Container, Row, Input, Form } from 'reactstrap'
import { userContext } from '../Context/UserContext'
import ContactPill from './ContactPill'
import usePostMessage from '../Hook/usePostMessage'

export default function ChatRoom () {
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
  //useparams
  const handleSubmit = async (event) => {
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
    const sendMessage = await usePostMessage(myMessage);

    console.log("sendMessage",sendMessage().then(console.log("then")));
  }
  return (
    <Row className='main-chat'>
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
