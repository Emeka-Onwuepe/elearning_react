import { Outlet} from "react-router-dom"
import Nav from "./nav"
import Error from "./error"
import NetworkReport from "./users/networkReport"

function Index() {
  return (
    <div className="bigwrapper">
    <header>
    <Error/>
   <NetworkReport />
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
