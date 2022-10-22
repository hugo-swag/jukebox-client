import Rooms from './Rooms';
import withAuth from '../withAuth';
import '../styles/Header.css';

const RoomsWithAuth = withAuth(Rooms);

function Header() {
  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Jukebox Hero</a>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="/">Sign out</a>
          </div>
        </div>
      </header>
      <div className="masthead p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to Your Party</h1>
          <p className="col-md-8 fs-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <a type="button" className="btn btn-success btn-lg mb-2" href="#rooms">Get Started ⬇️</a>
        </div>
      </div>
    </>
  );
}

export default Header;
