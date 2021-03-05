import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"

import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"

import MainComponent from './MainComponent'

function App() {
 
   
  return (
    <Router>
      <Route path="/" exact>
          <Redirect to="/login"/>
        </Route>       
        <Route path="/login" exact> 
         <LoginForm/>
        </Route>
        <Route path="/register" exact> 
          <RegisterForm/>
        </Route>
        <Route path="/app" >
          <MainComponent/>
        </Route>
    </Router>
  );
}

export default App;
