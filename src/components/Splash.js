import Auth from '../components/Auth'
import Logo from '../img/jukebox.png';
import '../styles/Splash.css';

function Splash() {
  return (
    <>
      <body class="text-center">
        <main class="form-signin">
          <form>
            <img class="mb-4" src={Logo} alt="" width="128" height="128" />
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            {/* <div class="form-floating">
              <input type="text" class="form-control" id="floatingInput" placeholder="Your User Name" />
              <label for="floatingInput">User Name</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Password</label>
            </div> */}
            <div>
              <Auth></Auth>
            </div>
            <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
          </form>
        </main>
      </body>
    </>
  );
}

export default Splash;
