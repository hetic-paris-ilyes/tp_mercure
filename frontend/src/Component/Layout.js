import UserList from './UserList'
import NeedAuth from '../Auth/NeedAuth'
import { Col, Container, Row, Nav } from 'reactstrap'
import { useContext, useState } from 'react'
import { userContext } from '../Context/UserContext'
import ContactPill from './ContactPill'
import { User, MessageCircle } from 'react-feather'

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
  const { user } = useContext(userContext)
  const myUser = parseJwt(user)
  const loggedUserName = user ? myUser.mercure.payload.username : null
  console.log("OPEN", open)
  return (
      <Row className='main'>
        <NeedAuth>
          <Col className='p-0 m-0 nav-wrapper'>
            <Nav className='navbar'>
              <button
                class='navbar-toggler'
                type='button'
                value={open}
                onClick={e => setOpen(!e.target.value)}
              >
                <span class='navbar-toggler-icon'></span>
              </button>
              <div
                class='menu-wrapper'
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
                    <p>some chats </p>
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
