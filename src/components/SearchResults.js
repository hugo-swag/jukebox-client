import { ListGroup } from 'react-bootstrap';
import React, { useContext } from 'react';
import UserContext from './../user-context';

export default function SearchResults({ setShowResults, searchResults, room }) {

  const context = useContext(UserContext);

  function handleAddSong(song) {
    setShowResults(false);
    song.bid = 0;
    song.room = room;
    song.songLength = 30000;
    context.relay.addSong(song);
  }

  return (
    <ListGroup>
      {
        searchResults.map(song => {
          return (
            <>
              <ListGroup.Item key={song.songId} action onClick={() => handleAddSong(song)}>
                {song.name} by {song.artist}
              </ListGroup.Item>
            </>
          )
        })
      }
    </ListGroup>
  )
}
