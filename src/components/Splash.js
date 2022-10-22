import Auth from '../components/Auth'
import Logo from '../img/jukebox.png';
import '../styles/Splash.css';

function Splash() {
  return (
    <>
        <main className="form-signin">
          <h1>Welcome to Hugo's Jukebox. Home of the swag.</h1>
          <form>
            <img className="mb-4" src={Logo} alt="" width="128" height="128" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            {/* <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="Your User Name" />
              <label for="floatingInput">User Name</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Password</label>
            </div> */}
            <div>
              <Auth></Auth>
            </div>
            <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
          </form>
        </main>
    </>
  );
}

export default Splash;
