import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import UserContext from '../user-context';
import './RoomQueue.css';

export default function RoomQueue({changeUri}) {
  const context = useContext(UserContext);

  const [queue, setQueue] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({})


  useEffect(
    () => {
      function handleUpdateQueue(updatedQueue) {
        setQueue(updatedQueue.songList);
      }
      function handlePlayAndUpdateQueue(updatedQueue) {
        if(updatedQueue?.songList[0]) {
          setQueue(updatedQueue.songList);
          setNowPlaying(updatedQueue.songList[0]);
          changeUri(updatedQueue.songList[0].uri);
        } else {
          setNowPlaying(null);
        }
      }
      context.relay.socketManager.onUpdateQueue(handleUpdateQueue);
      context.relay.socketManager.onUpdatePlayingAndQueue(handlePlayAndUpdateQueue);
    // eslint-disable-next-line
    }, [context.relay.socketManager]
  )

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
          <div>
          {
            queue.map((song) => {
              return (
                <Form className="playlist" key={song.songId} onSubmit={(e) => handleBid(e, song)}>
                  <Form.Text>{song.name} by {song.artist}</Form.Text>
                  <Form.Group className="mb-3 playlist-bid" controlId="bid">
                    <Form.Label>Bid</Form.Label>
                    <Form.Control type="number" placeholder="bid"/>
                    <Button variant='primary' type='submit'>Bid</Button>
                  </Form.Group>
                </Form>
              )
            })
          }
          </div>
        </>
      }
    </>
  )
}