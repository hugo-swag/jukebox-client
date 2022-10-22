import Card from 'react-bootstrap/Card';

import { Component } from "react";
import RoomQueue from "./RoomQueue";
import SearchSongs from "./SearchSongs";

function Room(props) {
  return (
    <>
      <span onClick={()=>props.handleChangeRoom(props.room)}>{props.room.name} (Raising funds for: {props.room.causeForRoom})</span>
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
      newRoomName: '',
      newCauseName: '',
      uri: ''
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
    // const rooms = roomList.map((name, id) => ({name, id}));
    this.setState({...this.state, rooms: roomList});
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
      causeForRoom: this.state.newCauseName,
      causeId: null
    }
    this.setState({...this.state, currentRoom: newRoom, newRoomName: '', newCauseName: ''});
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


      <div className="masthead p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to Your Party</h1>
          <p className="col-md-8 fs-4">Create a new Room here. Or select one from below.</p>
          <input className="flex-md-nowrap p-3 my-3 form-control form-control-dark w-100" type="text" placeholder="Create a Room" aria-label="Create a room" id="roomName" name="newRoomName" value={this.state.newRoomName} onChange={this.handleChange} />
          <input className="flex-md-nowrap p-3 my-3 form-control form-control-dark w-100" type="text" placeholder="A good cause" aria-label="A good cause" id="roomName" name="newCauseName" value={this.state.newCauseName} onChange={this.handleChange} />
          <button className="btn btn-primary btn-lg" type="button" onClick={this.handleClickCreateRoom} id="createRoomSubmit">Create</button>
          <hr/>
          <div className="container">
            <Card style={{backgroundColor: "black"}}>
              <Card.Body>
                <h3 id="currentRoom">Current Room {this.state.currentRoom?.name}</h3>
                <ul id="rooms">
                  {
                    this.state.rooms.map((room) => (
                      <li key={room.id}><Room room={room} handleChangeRoom={this.handleChangeRoom}></Room></li>
                    ))
                  }
                </ul>
                <div className="container">
                  <SearchSongs room={this.state.currentRoom?.name}/>
                  <RoomQueue changeUri={this.changeUri}/>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Rooms;
