import { ListGroup, Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import UserContext from './../user-context';

export default function SearchResults({setShowResults, searchResults, room}) {

  const context = useContext(UserContext);

  function handleAddSong(song) {
    setShowResults(false);
    song.bid = 0;
    console.log(room);
    song.room = room;
    console.log(song);
    context.relay.addSong(song);
  }

  return (
    <ListGroup>
      {
        searchResults.map(song => {
          return (
            <>
              <ListGroup.Item key={song.songId} onClick={() => handleAddSong(song)}>
                {song.name} by {song.artist}              
              </ListGroup.Item>
            </>
          )
        })
      }
    </ListGroup>
  )
}