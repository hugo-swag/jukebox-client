import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import UserContext from '../user-context';

export default function RoomQueue() {
  const context = useContext(UserContext);

  const [queue, setQueue] = useState([]);

  function handleUpdateQueue(updatedQueue) {
    setQueue(updatedQueue.songList);
  }
  context.relay.socketManager.onUpdateQueue(handleUpdateQueue);

  function handleBid(e) {
    e.preventDefault();
    console.log('hello');
  }

  return (
    <>
      {
        queue.length !== 0 &&
        <>
          <h1>Music queue</h1>
          <h2>Currently Playing...</h2>
          {
            queue.map(song => {
              return (
                <Form key={song.songId} onSubmit={handleBid}>
                  <Form.Text>{song.name} by {song.artist}</Form.Text>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Bid</Form.Label>
                    <Form.Control type="number" placeholder="bid" />
                  </Form.Group>
                  <Button variant='primary' type='submit'>Bid</Button>
                </Form>
              )
            })
          }
        </>
      }
    </>
  )
}