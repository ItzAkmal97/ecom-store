import SignupPage from "../components/SignupPage"
import { NavLink } from "react-router-dom"
function LoginPage() {
  return (
    <div>
        <h1>Log In</h1>
        <form>
            <input type="email" placeholder="Email" className=""/>
            <input type="password" placeholder="Password" />
            <button type="submit">Sign In</button>
        </form>
    </div>
    
  )
}

export default LoginPage