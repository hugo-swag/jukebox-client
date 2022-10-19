import { Component } from "react";

function Room(props) {
  return ( <span>{props.room.name}</span> );
}

class Rooms extends Component {
  constructor(props) {
    super(props);
    // this.socketManager = props.socketManager;
    this.relay = props.relay;
    this.state = {
      rooms: this.props.rooms || [],
    };
    this.onChange = this.onChange.bind(this);
    this.onClickCreateRoom = this.onClickCreateRoom.bind(this);
  }

  componentDidMount() {
    const mainRoom = 'main'
    this.relay.joinRoom(mainRoom);
    this.setState({...this.state, currentRoom: {name: mainRoom}});
  }

  onChange(e){
    const changed = e.target.value;
    const name = e.target.name;
    this.setState({...this.state, [name]: changed});
  }

  createRoom(){
    this.relay.createRoom("old room", this.state.newRoomName);
  }

  onClickCreateRoom(e){
    e.preventDefault();
    this.createRoom();
  }

  render() { 
    return ( 
      <div>
      <h2>Rooms</h2>
      <form id="createRoomForm">
        <label htmlFor="roomName">Room Name: </label>
        <input type="text" id="roomName" name="newRoomName" onChange={this.onChange}/>
        <input type="submit" onClick={this.onClickCreateRoom} id="createRoomSubmit"/>
      </form>
      <h3 id="currentRoom">Current Room Main</h3>
      <ul id="rooms">
        {
          this.state.rooms.map((room) => (
            <li key={room.id}><Room room={room}></Room></li>
          ))
        }
      </ul>
    </div>
    );
  }
}
 
export default Rooms;