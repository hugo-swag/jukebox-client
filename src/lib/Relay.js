import SocketManager from './SocketManager';


class Relay {
  constructor() {
    this.socketManager = new SocketManager();
  }

  createRoom(newRoom, oldRoom){
    const name = newRoom.name
    const oldRoomName = oldRoom.name
    this.socketManager.createRoom(name, oldRoomName);
  }

  joinRoom(room) {
    this.socketManager.joinRoom(room, '');
  }

  onRoomList(fn) {
    this.socketManager.onRoomList(fn);
  }

}

export default Relay;