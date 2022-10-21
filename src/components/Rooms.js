import { Component } from "react";
import RoomQueue from "./RoomQueue";
import SearchSongs from "./SearchSongs";

function Room(props) {
  return ( 
    <>
      <span onClick={()=>props.handleChangeRoom(props.room)}>{props.room.name}</span>
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
    this.setState({...this.state, currentRoom: {name: mainRoom}});
  }

  onRoomListSent(roomList) {
    const rooms = roomList.map((name, id) => ({name, id}));
    this.setState({...this.state, rooms});
  }

  handleChange(e){
    const changed = e.target.value;
    const name = e.target.name;
    this.setState({...this.state, [name]: changed});
  }

  createRoom(){
    this.audio.pause();
    const newRoom = {
      name: this.state.newRoomName,
      causeId: null
    }
    this.setState({...this.state, currentRoom: newRoom});
    this.relay.createRoom(newRoom, this.state.currentRoom);
  }

  handleClickCreateRoom(e){
    e.preventDefault();
    this.createRoom();
  }

  handleChangeRoom(newRoom) {
    this.audio.pause();
    this.relay.joinRoom({currentRoom: this.state.currentRoom.name, newRoom: newRoom.name});
    this.setState({...this.state, currentRoom: newRoom});
  }

  changeUri(uri) {
    this.setState({uri: uri});
    this.audio = new Audio(uri);
    this.audio.play();
  }
  

  render() { 
    return ( 
      <div>
      <h2>Rooms</h2>
      <form id="createRoomForm">
        <label htmlFor="roomName">Room Name: </label>
        <input type="text" id="roomName" name="newRoomName" onChange={this.handleChange}/>
        <input type="submit" onClick={this.handleClickCreateRoom} id="createRoomSubmit"/>
      </form>
      <h3 id="currentRoom">Current Room {this.state.currentRoom?.name}</h3>
      <ul id="rooms">
        {
          this.state.rooms.map((room) => (
            <li key={room.id}><Room room={room} handleChangeRoom={this.handleChangeRoom}></Room></li>
          ))
        }
      </ul>
      <SearchSongs room={this.state.currentRoom?.name}/>
      <RoomQueue changeUri={this.changeUri}/>
    </div>
    );
  }
}
 
export default Rooms;