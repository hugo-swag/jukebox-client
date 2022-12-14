import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const INDEX_URL = () => `${SERVER_URL}/api/v1/causes`;
const CREATE_URL = () => `${SERVER_URL}/api/v1/causes/new`;
// const GET_URL = (id) => `${SERVER_URL}/api/v1/causes/${id}`;
const DELETE_URL = (id) => `${SERVER_URL}/api/v1/causes/${id}`;

class CausesController {

  constructor(user) {
    this.user = user;
  }

  async getCauses() {
    const resp = await axios.get(INDEX_URL());
    return resp.data;
  }

  async createCause(causeObj) {
    const resp = await axios.post(CREATE_URL(), causeObj);
    return resp.data;
  }

  async deleteCause(cause) {
    const resp = axios.delete(DELETE_URL(cause.id));
    return resp.data;
  }

}

class Cause extends Component {
  constructor(props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  state = {}
  onClickDelete(e) {
    e.preventDefault();
    this.props.onDeleteCause(this.props.cause);
  }
  render() {
    return (
      <div >
        Cause: {this.props.cause.name} <a href="#delete-cause" onClick={this.onClickDelete}>X</a>
      </div>
    );
  }
}

class Causes extends Component {

  constructor(props) {
    super(props);
    this.controller = new CausesController();
    this.onClickNewCause = this.onClickNewCause.bind(this);
    this.onClickCreateCause = this.onClickCreateCause.bind(this);
    this.onDeleteCause = this.onDeleteCause.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    const causes = await this.controller.getCauses();
    this.setState({ ...this.state, causes });
  }

  async onClickCreateCause() {
    console.log('create cause', this.state.newCause);

    const newCause = await this.controller.createCause({ name: this.state.newCause });
    this.setState({ ...this.state, addCauseOpen: false, causes: this.state.causes.concat([newCause]) });
  }

  onClickNewCause() {
    this.setState({ ...this.state, addCauseOpen: true })
  }

  async onDeleteCause(cause) {
    await this.controller.deleteCause(cause);
    const causes = this.state.causes;
    const idx = causes.findIndex((c) => c.id === cause.id);
    causes.splice(idx, 1);
    this.setState({ ...this.state, causes });
  }

  onChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ ...this.state, [name]: value });
  }

  state = { causes: [] }

  render() {
    return (<div>
      <h1>My Causes</h1>
      <ul>
        {this.state.causes.map(cause => (<Cause key={cause.id} onDeleteCause={this.onDeleteCause} cause={cause} />))}
        {this.state.addCauseOpen ?
          <><input type='text' onChange={this.onChange} name='newCause' placeholder='My Cause' /><button onClick={this.onClickCreateCause}> Submit </button></>
          : <li onClick={this.onClickNewCause}> New Cause +</li>
        }
      </ul>
    </div>);
  }

}
/* 
class Causes extends Component {
  state = {  } 
  render() { 
    return (<div>hello from causes</div>);
  }
}
*/

export default Causes;
