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