import io from 'socket.io-client';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
console.log(SOCKET_URL)

class SocketManager {
  constructor(token) {
    this.token = token;
    this.socket = io(SOCKET_URL, {
        auth: {
          token: this.token,
        },
      });
      this.setupListeners();
  }

  setupListeners(){
    this.socket.on('room-list', (payload) => {
      if (this.onRoomListCallback) {
        this.onRoomListCallback(payload);
      }
    });
    this.socket.on('update-playing-and-queue', (payload) => {
      if (this.onUpdatePlayingAndQueueCallback) { this.onUpdatePlayingAndQueueCallback(payload); }
    });
    this.socket.on('update-queue', (payload) => {
      if (this.onUpdateQueueCallback) {
        this.onUpdateQueueCallback(payload);
      }
    });
    this.socket.on('search-results', (payload) => {
      if (this.onReceiveSearchResultsCallback) {
        this.onReceiveSearchResultsCallback(payload);
      }
    });

  }

  resetSocketManager(token) {
    this.token = token;
    this.socket = io(SOCKET_URL, {
        auth: {
          token: this.token,
        },
      });
    this.setupListeners();

  }

  // create or join
  createRoom(newRoomName, oldRoomName, causeForRoom ) {
    const payload = {
      currentRoom: oldRoomName, newRoom: newRoomName, causeForRoom
    };
    console.log(payload);
    this.socket.emit('create-room', payload);
  }

  joinRoom(room) {
    this.socket.emit('join-room', { currentRoom: room.currentRoom, newRoom: room.newRoom });
  }

  // song object
  // const song = {
  //   clientId: socket.id,
  //   name: name,
  //   artist: artist,
  //   bid: bid,
  //   uri: uri,
  //   songLength: songLength,
  //   room: currentRoom,
  // };

  searchSong(song) {
    this.socket.emit('search-song', song);
  }

  addSong(song) {
    song.clientId = this.socket.id;
    this.socket.emit('add', song);
  }

  bidOnSong(song) {
    this.socket.emit('bid', song);
  }

  onRoomList(fn) {
    this.onRoomListCallback = fn;
  }

  onUpdatePlayingAndQueue(fn) {
    this.onUpdatePlayingAndQueueCallback = fn;
  }

  onUpdateQueue(fn) {
    this.onUpdateQueueCallback = fn;
  }

  onReceiveSearchResults(fn) {
    this.onReceiveSearchResultsCallback = fn;
  }
}

export default SocketManager;