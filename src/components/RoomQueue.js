import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import UserContext from '../user-context';

export default function RoomQueue() {
  const context = useContext(UserContext);

  const [queue, setQueue] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({})

  function handleUpdateQueue(updatedQueue) {
    setQueue(updatedQueue.songList);
  }
  context.relay.socketManager.onUpdateQueue(handleUpdateQueue);

  function handlePlayAndUpdateQueue(updatedQueue) {
    setQueue(updatedQueue.songList);
    if(updatedQueue.songList[0]) {
      setNowPlaying(updatedQueue.songList[0]);
      let audio = new Audio(updatedQueue.songList[0].uri);
      audio.muted = false;
      audio.play();
    } else {
      setNowPlaying(null);
    }

  }
  context.relay.socketManager.onUpdatePlayingAndQueue(handlePlayAndUpdateQueue);

  function handleBid(e, song) {
    e.preventDefault();
    song.bid += e.target.bid.value;
    context.relay.bidOnSong(song);
  }

  return (
    <>
      <h1>Music queue</h1>
      {
        queue.length !== 0 &&
        <>
          {
            nowPlaying ?
            <h2>Currently Playing {nowPlaying.name} by {nowPlaying.artist}</h2>
            :
            <h2>Add Songs to the Queue to Play Music</h2>
          }
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