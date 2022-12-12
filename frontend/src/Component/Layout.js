import UserList from './UserList'
import NeedAuth from '../Auth/NeedAuth'
import { Col, Container, Row, Nav } from 'reactstrap'
import { useContext, useState } from 'react'
import { userContext } from '../Context/UserContext'
import ContactPill from './ContactPill'
import { User, MessageCircle } from 'react-feather'
import ChatList from './ChatList'
import { useEffect } from 'react'

import useGetMessagesChat from '../Hook/useGetMessagesChat'

export default function Layout (props) {
  const parseJwt = token => {
    if (!token) {
      return
    }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  }
  const [open, setOpen] = useState(false)
  const [chat, setChat] = useState([])
  const { user } = useContext(userContext)
  const myUser = parseJwt(user)
  const loggedUserName = user ? myUser.mercure.payload.username : null
  const getMessagesChat = useGetMessagesChat()

  useEffect(() => {
    getMessagesChat(4).then(data => setChat(data.chat))
  }, [])
  
  return (
      <Row className='main'>
        <NeedAuth>
          <Col className='p-0 m-0 nav-wrapper'>
            <Nav className='navbar'>
              <button
                className='navbar-toggler'
                type='button'
                value={open}
                onClick={e => setOpen(!e.target.value)}
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div
                className='menu-wrapper'
                style={{display: open ? "block" : "none", width: "100%"}}
              >
                {loggedUserName ? (
                  <h3 className='session-user'>
                    <ContactPill
                      className='currentUser'
                      userName={loggedUserName}
                    />
                    {loggedUserName}
                  </h3>
                ) : null}
                <hr />
                <div className='menu-scrollable'>
                  <h4 className='text-start list-title'>
                    <MessageCircle size={25} />
                    Chats
                  </h4>
                  <div>
                    {/* Chat things here */}
                    <ChatList chat={chat}/>
                  </div>
                </div>
                <div className='menu-scrollable'>
                  <h4 className='text-start list-title'>
                    <User size={25} />
                    Contacts
                  </h4>
                  <UserList />
                </div>
              </div>
            </Nav>
          </Col>
          <Col className='p-0'>{props.children}</Col>
        </NeedAuth>
      </Row>
  )
}
