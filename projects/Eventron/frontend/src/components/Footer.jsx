import  { React} from "react";
import { Link } from "react-router";
// import './Footer.css' 
function Footer(){

return <>
<footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Eventrom Event <br/> Management</h3>
          <p>Making every event unforgettable with<br/>professional planning and execution.</p>
          <p>Contact Us: .......... | events@masai.com</p> 
          </div>
        
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <Link to={"/"}><li>Home</li></Link>
            <Link to={"/about us"}><li>About Us</li></Link>
            <Link to={"/"}><li>Events</li></Link>
            
            
          </ul>
        </div>
        <div className="footer-column">
          <h3>Subscribe</h3>
          <ul>
            
            <li>
              <form className="subscribe-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="subscribe-input"
                />
                <button type="submit" className="subscribe-button">
                  Subscribe
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </footer>
</>
}

export default Footer