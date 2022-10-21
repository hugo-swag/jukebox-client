import { Component } from "react";
import RoomQueue from "./RoomQueue";
import SearchSongs from "./SearchSongs";

function Room(props) {
  return (
    <>
      <div onClick={() => props.handleChangeRoom(props.room)}>{props.room.name}</div>
    </>
  );
}


class Rooms extends Component {
  constructor(props) {
    super(props);
    /*
    for(let fn of [this.onRoomListSent, this.handleChange, this.handleClickCreateRoom, this.handleChangeRoom]) {
      this[fn.name] = fn.bind(this);
    }
    */
    // this.socketManager = props.socketManager;
    this.relay = props.relay;
    this.audio = new Audio();
    this.state = {
      rooms: this.props.rooms || [],
      uri: '',
    };
    this.onRoomListSent = this.onRoomListSent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.handleClickCreateRoom = this.handleClickCreateRoom.bind(this);
    this.changeUri = this.changeUri.bind(this);
    this.relay.onRoomList(this.onRoomListSent);
  }

  componentDidMount() {
    const mainRoom = 'main'
    this.relay.joinRoom(mainRoom);
    this.setState({ ...this.state, currentRoom: { name: mainRoom } });
  }

  onRoomListSent(roomList) {
    const rooms = roomList.map((name, id) => ({ name, id }));
    this.setState({ ...this.state, rooms });
  }

  handleChange(e) {
    const changed = e.target.value;
    const name = e.target.name;
    this.setState({ ...this.state, [name]: changed });
  }

  createRoom() {
    this.audio.pause();
    const newRoom = {
      name: this.state.newRoomName,
      causeId: null
    }
    this.setState({ ...this.state, currentRoom: newRoom });
    this.relay.createRoom(newRoom, this.state.currentRoom);
  }

  handleClickCreateRoom(e) {
    e.preventDefault();
    this.createRoom();
  }

  handleChangeRoom(newRoom) {
    this.audio.pause();
    this.relay.joinRoom({ currentRoom: this.state.currentRoom.name, newRoom: newRoom.name });
    this.setState({ ...this.state, currentRoom: newRoom });
  }

  changeUri(uri) {
    this.setState({ uri: uri });
    this.audio = new Audio(uri);
    this.audio.play();
  }


  render() {
    return (
      <div>
        <div>
          <hr class="mb-5" />
          <h1 class="text-center text-monospace">Create Your Room</h1>
        </div>
        <form class="d-flex my-5" id="createRoomForm">
          <input
            class="flex-md-nowrap form-control form-control-dark w-100 shadow p-3"
            placeholder="enter room name"
            type="text"
            id="roomName"
            name="newRoomName"
            onChange={this.handleChange} />
          <input
            type="submit"
            value="Add"
            class="btn btn-primary btn-lg shadow px-5"
            onClick={this.handleClickCreateRoom} id="createRoomSubmit" />
        </form>
        <h3 class="mb-3" id="currentRoom">Current Room: {this.state.currentRoom?.name}</h3>
        <div class="d-flex justify-content-between">
          <ul class="list-group d-grid col-4" id="rooms">
            {
              this.state.rooms.map((room) => (
                <button type="button" class="list-group-item list-group-item-action" key={room.id}>< Room room={room} handleChangeRoom={this.handleChangeRoom}></ Room></button>
              ))
            }
          </ul>
          <div class="d-flex flex-column col-5">
            <SearchSongs room={this.state.currentRoom?.name} />
            <RoomQueue changeUri={this.changeUri} />
          </div>
        </div>
      </div >
    );
  }
}

export default Rooms;
