import { Link, Outlet} from "react-router-dom"
import Header from "./header"
import NetworkReport from "./users/networkReport"
import Alert from "./alert"

function Index() {
  return (
    <div className="bigwrapper">
    <Header/>
   
    <p className="seperator"></p>
    {/* <NetworkReport /> */}
    <Alert/>
    <main>
    <Outlet/>
    </main>

    <footer>
    <p>All right reserved</p>
    <div id='socials'>
      <Link ><img className="facebook" src={require("../css/socials/facebook.png")} alt="facebook" /></Link>
      <Link ><img className="instagram" src={require("../css/socials/instagram.png")} alt="instagram" /></Link>
      <Link ><img className="twitter" src={require("../css/socials/twitter.png")} alt="twitter" /></Link>
      <Link ><img className="whatsapp" src={require("../css/socials/whatsapp.png")} alt="whatsapp" /></Link>
    </div>
    </footer>
    </div>
  )
}

export default Index
