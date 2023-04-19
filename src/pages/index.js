import { NavLink, Outlet} from "react-router-dom"

function Index() {
  return (
    <div className="bigwrapper">
    <header>
    <div className="logo">Get Light</div>
    <nav className="navs">
    <NavLink to="login">Login</NavLink>
    </nav>
    </header>

    <main>
    <Outlet/>
    </main>

    <footer>
    <p>All right reserved</p>
    </footer>
    </div>
  )
}

export default Index
