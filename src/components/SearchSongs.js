import { Form, Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import userContext from '../user-context';
import SearchResults from './SearchResults';

export default function SearchSong() {

  const context = useContext(userContext);

  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  function handleSearchResults(results) {
    setSearchResults(results);
    setShowResults(true);
  }
  context.relay.socketManager.onReceiveSearchResults(handleSearchResults);

  function handleSongSearch(e) {
    e.preventDefault();
    const songData = {
      name: e.target.songName.value,
      artist: e.target.artist.value,
    }
    context.relay.searchSong(songData);

    e.target.songName.value = '';
    e.target.artist.value = '';
  }

  return (
    <>
      <Form onSubmit={handleSongSearch}>
        <Form.Group className="mb-3" controlId="songName">
          <Form.Label>Song Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Song Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="artist">
          <Form.Label>Artist</Form.Label>
          <Form.Control type="text" placeholder="Enter Artist" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {
        showResults &&
        <SearchResults
          searchResults={searchResults}
          showSearchResults={showResults}
          setShowResults={setShowResults}
        />
      }
    </>
  )
}