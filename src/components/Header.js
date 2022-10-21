// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
// import User from '../img/user.png';
// import Brand from '../img/jukebox.png';
// import Masthead from '../img/juke_mast.jpg';
import '../styles/Header.css'

function Header() {
  return (
    <>
      <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Jukebox Hero</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="/sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <div class="navbar-nav">
          <div class="nav-item text-nowrap">
            <a class="nav-link px-3" href="/">Sign out</a>
          </div>
        </div>
      </header>
      <div class="masthead p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Welcome to Your Party</h1>
          <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
          <input class="flex-md-nowrap p-3 my-3 form-control form-control-dark w-100" type="text" placeholder="Create a Room" aria-label="Search" />
          <button class="btn btn-primary btn-lg" type="button">Create</button>
        </div>
      </div>

    </>
  );
}

export default Header;
