import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import UserContext from '../user-context';

export default function RoomQueue() {
  const context = useContext(UserContext);

  const [queue, setQueue] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({})

  function handleUpdateQueue(updatedQueue) {
    console.log(updatedQueue.songList);
    setQueue(updatedQueue.songList);
  }
  context.relay.socketManager.onUpdateQueue(handleUpdateQueue);

  // function handlePlayAndUpdateQueue(updatedQueue) {
  //   console.log(updatedQueue);
  // }
  // context.relay.socketManager.onUpdatePlayingAndQueue(handlePlayAndUpdateQueue);

  function handleBid(e, song) {
    e.preventDefault();
    song.bid += e.target.bid.value;
  }
  context.relay.socketManager.bidOnSong(handleBid);

  return (
    <>
      <h1>Music queue</h1>
      {
        queue.length !== 0 &&
        <>
          <h2>Currently Playing...</h2>
          {
            queue.map(song => {
              return (
                <Form key={song.songId} onSubmit={(e) => handleBid(e, song)}>
                  <Form.Text>{song.name} by {song.artist}</Form.Text>
                  <Form.Group className="mb-3" controlId="bid">
                    <Form.Label>Bid</Form.Label>
                    <Form.Control type="number" placeholder="bid"/>
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