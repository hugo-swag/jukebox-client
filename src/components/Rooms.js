import { Component } from "react";

function Room(props) {
  return ( <span onClick={()=>props.handleChangeRoom(props.room)}>{props.room.name}</span> );
}


class Rooms extends Component {
  constructor(props) {
    super(props);
    const bindIt = (fn) => {
      this[fn.name] = fn.bind(this);
    }
    bindIt(this.onRoomListSent);
    bindIt(this.handleChange);
    bindIt(this.handleClickCreateRoom);
    bindIt(this.handleChangeRoom);
    // this.socketManager = props.socketManager;
    this.relay = props.relay;
    this.state = {
      rooms: this.props.rooms || [],
    };
    this.relay.onRoomList(this.onRoomListSent);
    //this.onChange = this.onChange.bind(this);
    //this.onClickCreateRoom = this.onClickCreateRoom.bind(this);
  }

  componentDidMount() {
    const mainRoom = 'main'
    this.relay.joinRoom(mainRoom);
    this.setState({...this.state, currentRoom: {name: mainRoom}});
  }

  onRoomListSent(roomList) {
    console.log(roomList);
    const rooms = roomList.map((name, id) => ({name, id}));
    console.log(rooms)
    this.setState({...this.state, rooms});
  }

  handleChange(e){
    const changed = e.target.value;
    const name = e.target.name;
    this.setState({...this.state, [name]: changed});
  }

  createRoom(){
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
    this.setState({...this.state, currentRoom: newRoom});
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
    </div>
    );
  }
}
 
export default Rooms;