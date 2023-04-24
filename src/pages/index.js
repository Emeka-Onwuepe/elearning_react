import { Outlet} from "react-router-dom"
import Nav from "./nav"

function Index() {
  return (
    <div className="bigwrapper">
    <header>
    <div className="logo">Get Light</div>
    <Nav/>
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
