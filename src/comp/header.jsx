import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { useContext } from "react";
import DataContext from "../context/ThemeContext.js";

// use Authentication state hook
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config.js";

// To sign out a user, call signOut:
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);
  const { theme, toggleThemeMode } = useContext(DataContext);
  return (
    <div className="myheader">
      <header className="hide-when-mobile ali ">
        {/* Logo */}

        <h1>
      
          <a  href="https://www.facebook.com/profile.php?id=100093991665420"  > <div className="amr logo">Amr Dev. <span><i class="fa-solid fa-heart"></i></span></div>  </a>

        
    
        </h1>

        <i
            onClick={() => {
              toggleThemeMode(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-sun"
          ></i>
        
          <i
            onClick={() => {
              toggleThemeMode(theme === "Light" ? "Dark" : "Light");
            }}
            className="fa-solid fa-moon"
          ></i>

    

        <ul>
          {/* if user did not sign up show below desgin for navbar  */}
          {!user && (
            <ul>
              <li className="main-list">
                <NavLink className="main-link" to="/signin">
                  Sign-In
                </NavLink>
              </li>

              <li className="main-list">
                <NavLink className="main-link" to="/signup">
                  Sign-Up
                </NavLink>
              </li>
            </ul>
            
          )}

          {/* if user signed up show below desgin for navbar  */}
          {user && (
            <li
              onClick={() => {
                const auth = getAuth();
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    console.log("sign out 100 %");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <NavLink className="main-link" to="/signin">
                Sign-Out
              </NavLink>
            </li>




          )}

          {/* if user varibale returned true the web page will be appeared  */}
          {user && (
            <ul>
              <li className="main-list">
                <NavLink className="main-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="main-list">
                <NavLink className="main-link" to="/Profile">
                  Profile
                </NavLink>
              </li>
            </ul>
          )}

  



        </ul>

      

      
      


      </header>

    </div>
  );
};

export default Header;
