import { useContext } from 'react'
import { Send } from 'react-feather'
import { Col, Container, Row , Input, Form} from 'reactstrap'
import { userContext } from '../Context/UserContext'
import ContactPill from './ContactPill'


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
  return (
    <Row className='main-chat'>
      <Row className='header-chat'>
        <h6 className='session-user'>
          <ContactPill className='' userName={'Contact 1'} /> Contact 1
        </h6>
      </Row>

      <Row className='section-chat'>
        <div className='message contact'>
          <ContactPill className='' userName={'Contact 1'} />
          <p>
            lorelscn ujsdnhvksn cfsdvhkdhvn cksjvbskvnkncs vzskvhsikv svknbdkvs{' '}
          </p>
        </div>

        <div className='message currentUser'>
          <ContactPill className='currentUser' userName={'Contact 1'} />{' '}
          <p>
            lorelscn ujsdnhvksn cfsdvhkdhvn cksjvbskvnkncs vzskvhsikv svknbdkvs{' '}
          </p>
        </div>
      </Row>
      <Row className='chat-tools'>
        <Form className='d-flex'>
           <Input type='textarea' placeholder='Ecrivez votre message ...' />
           <button type='submit'><Send size={35} /></button>
        </Form>
      </Row>
    </Row>
  )
}
