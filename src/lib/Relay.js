import SocketManager from './SocketManager';


class Relay {
  constructor(token) {
    this.socketManager = new SocketManager(token);
  }

  resetRelay(token) {
    this.socketManager.resetSocketManager(token);
  }

  createRoom(newRoom, oldRoom){
    const name = newRoom.name
    const oldRoomName = oldRoom.name
    this.socketManager.createRoom(name, oldRoomName, newRoom.causeForRoom);
  }

  joinRoom(room) {
    console.log(room);
    this.socketManager.joinRoom(room);
  }

  onRoomList(fn) {
    this.socketManager.onRoomList(fn);
  }

  searchSong(song) {
    this.socketManager.searchSong(song);
  }

  addSong(song) {
    this.socketManager.addSong(song);
  }

  bidOnSong(song) {
    this.socketManager.bidOnSong(song);
  }

}

export default Relay;