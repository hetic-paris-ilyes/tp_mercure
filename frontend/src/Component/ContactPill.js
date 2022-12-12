
export default function ContactPill ({ className, userName }) {
  const getInitials = userName => {
    let result = userName.slice(0, 2)
    return result
  }

  return <figure className={`profile-picture ${className? className : ""}`}>{getInitials(userName)}</figure>
}
