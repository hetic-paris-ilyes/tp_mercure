import UserList from './UserList'
import NeedAuth from '../Auth/NeedAuth'
import { Col, Container, Row } from 'reactstrap'
import { useContext } from 'react'
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

  const { user } = useContext(userContext)
  const myUser = parseJwt(user)
  const loggedUserName = user ? myUser.mercure.payload.username : null

  return (
    <Container fluid>
      <Row className='main'>
        <NeedAuth>
          <Col md={2} className='ms-2 sidebar'>
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
              <h4 className='text-start list-title'><MessageCircle size={25} />Chats</h4>
              <div>
                {/* Chat things here */}
                <p>some chats </p>
              </div>
            </div>
            <div className='menu-scrollable'>
              <h4 className='text-start list-title'><User size={25} />Contacts</h4>
              <UserList />
            </div>
          </Col>
          <Col className='p-0'>{props.children}</Col>
        </NeedAuth>
      </Row>
    </Container>
  )
}
