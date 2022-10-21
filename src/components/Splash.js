import Auth from '../components/Auth'
import Logo from '../img/jukebox.png';
import '../styles/Splash.css';

function Splash() {
  return (
    <>
        <main className="form-signin">
          <form>
            <img className="mb-4" src={Logo} alt="" width="128" height="128" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="Your User Name" />
              <label htmlFor="floatingInput">User Name</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div>
              <Auth></Auth>
              {/* <button class="w-100 btn btn-lg btn-primary m-1" type="submit">Sign in</button>
              <button class="w-100 btn btn-lg btn-primary m-1" type="submit">Sign up</button> */}
            </div>
            <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
          </form>
        </main>
    </>
  );
}

export default Splash;
