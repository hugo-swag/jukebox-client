import { Button} from 'react-bootstrap';
import { useContext } from 'react';
import UserContext from '../user-context';

export default function Signup({showModal, setShowModal}) {
  
  const user = useContext(UserContext);

  async function logout() {
    user.login('', '', false);
  }

  return (
    <Button onClick={logout}>Logout</Button>
  )
}