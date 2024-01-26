import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useState } from "react";
import Header from "../comp/Header";
import Footer from "../comp/Footer";
import "../theme.css";
import { Link } from "react-router-dom";

// use Authentication state hook
import { useAuthState } from "react-firebase-hooks/auth";

// import auth form firebase config
import { auth } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

// import usenavigate
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  // Handel Error and appear paragarph
  const [hasError, setHasError] = useState(false);
  // Show Firebase error message
  const [firebaseErrorMsg, setFirebaseErrorMsg] = useState("");

  const [user, loading, error] = useAuthState(auth);


  const submintHandler = (eo) => {
      //! 1. Prevent the default behaviour to loading..
      eo.preventDefault();
      //! 2. Apply Authentication function once clicked
      const auth = getAuth();

      //! 3. Stage  { (A) createUserWithEmailAndPassword , (B) updateProfile , (C)sendEmailVerification  }

      //! (A) create user with email and password function
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user; // ...

          //!  (C) sendEmailVerification
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            // ...
            console.log("Email verification sent!");
          });

          //! (B) update user Profile
          updateProfile(auth.currentUser, {
            displayName: userName,
          })
            .then(() => {
              // Navigate to home page Route (/)
              console.log(user);
              navigate("/");
            })
            .catch((error) => {
              // An error occurred
              console.log(error.message);
            });
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message; // ..
          console.log(errorMessage);
          setHasError(true);

          // {/*!Showing our custom error message* /}
          switch (errorCode) {
            case "auth/missing-email":
              setFirebaseErrorMsg("pls insert your email.. 🧡");
              break;

            case "auth/invalid-email":
              setFirebaseErrorMsg("pls insert correct email.. 🧡");
              break;

            case "auth/missing-password":
              setFirebaseErrorMsg("pls insert your pass.. 🧡");
              break;
            case "auth/invalid-credential":
              setFirebaseErrorMsg(
                " inserted email or passward invalid pls try again 🧡"
              );
              break;

            case "auth/too-many-requests":
              setFirebaseErrorMsg("pls try again late 🧡");
              break;

            default:
              setFirebaseErrorMsg(errorMessage);
              break;
          }
        });
  }


  //!_________________________ We have 4 designs here in Sign Up Page __________________ //

  
  //! 1st user Not Signed Up  create form with 3 inputs to sign up
  if (!user) {
    return (
      <>
        <Helmet>
          <title> Sign up Page </title>
          <meta name="description" content="Sign up page"></meta>
          <style type="text/css">{`
            
          `}</style>
        </Helmet>
        <Header />

        <main>
          <form id="signUpForm">
            <p> Sign Up :</p>

            <input
              onChange={(eo) => {
                setUserName(eo.target.value);
              }}
              type="text"
              id="username"
              name="username"
              required
              placeholder="insert your UserName."
            />

            <input
              onChange={(eo) => {
                setEmail(eo.target.value);
              }}
              type="text"
              id="Email"
              name="Email"
              required=""
              placeholder="insert your Email."
            />

            <input
              onChange={(eo) => {
                setPassword(eo.target.value);
              }}
              type="password"
              id="password"
              name="password"
              required=""
              placeholder="insert pass"
            />

            {/* Submittion Button for sign up  */}
            <button
              onClick={(eo) => {
              submintHandler(eo)
              }}
              className="active"
              type="button"
              to="/"
            >
              Sign Up
            </button>

            {/* if no error  hasErro = false */}
            {!hasError && (
              <p className="account">
                If you already have an account pls
                <Link to="/signin"> Sign-In </Link>
              </p>
            )}
            {/* if we have error  hasErro = true */}
            {hasError && <p className="error">{firebaseErrorMsg}</p>}
          </form>
        </main>

        <Footer />
      </>
    );
  }

  //! 2nd  Loading
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <h2 className="hidenContent">
            Loading Data ....<span>🤖 </span>{" "}
          </h2>
        </main>
        <Footer />
      </>
    );
  }

  //! 3rd user signed up but still not verify his email address  {user.emailVerified = false }
  //! 4th user signed up band verify his email address  {user.emailVerified = true } avigate him to home page
  if (user) {
      //if user signed up and did't verified his email 
    if (!user.emailVerified) {
      return (
        <>
          <Header />
          <main>
            <h2 className="hidenContent">
              we send mail to you to verify your account....<span> 🚀 </span>{" "}
            </h2>
            <button className="delete">Send Again</button>
          </main>
          <Footer />
        </>
      );
    }

    //if user signed up and verified his email navigate him to home page ..
    if (user.emailVerified) {
      navigate("/");
    }
  }
};

export default SignUp;
