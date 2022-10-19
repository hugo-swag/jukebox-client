import SocketManager from './SocketManager';


class Relay {
  constructor() {
    this.socketManager = new SocketManager();
  }

  createRoom(oldRoom, name){
    this.socketManager.createRoom(oldRoom, name);
  }

  joinRoom(room) {
    this.socketManager.joinRoom(room, '');
  }

}

export default Relay;