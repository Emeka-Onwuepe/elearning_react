import { Outlet} from "react-router-dom"
import Nav from "./nav"
import NetworkReport from "./users/networkReport"
import Alert from "./alert"

function Index() {
  return (
    <div className="bigwrapper">
    <header>
    <Alert/>
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
