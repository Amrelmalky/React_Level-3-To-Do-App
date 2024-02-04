// @ts-nocheck
import { Helmet } from "react-helmet-async";
import React, { useState } from "react";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import "../../theme.css";
import "./SignIn.css";

// importh auth menthod from firbase config file
import { auth } from "../../firebase/config";


// signIn Metod
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";

// use Authentication state hook
import { useAuthState } from "react-firebase-hooks/auth";

// Import useNavigate hook from react router
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  // Handel Error and appear paragarph
  const [hasError, setHasError] = useState(false);
  // Show Firebase error message
  const [firebaseErrorMsg, setFirebaseErrorMsg] = useState("");



  const [useModal, setModal] = useState(false);

  const showForgetFormHandler = () => {
    setModal(true)
  }

  const showSignInFormHandler = () => {
    setModal(false)
  }
  
  





  const [showRestMsg, setshowRestMsg] = useState(true);

  // use useNavigate to go to another componednt
  const navigate = useNavigate();


  const submitHandler = (eo) => {
    // prvent default submittion for form
    eo.preventDefault();
    // apply auth method
    const auth = getAuth();
    // apply sign in method
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        // if user return true / Naviagte User to home page
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setHasError(true);

        // switch case for firebase errors
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


  const restPassHandler = (eo) => {
    eo.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {

        // ..
      });


  }

  const verificationHandler = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setshowRestMsg(true)
      console.log("Email verification sent!");
    });
  }



  //! 1st user Signed Up ( did't verified his email or verified his email )
  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet
            // @ts-ignore
            Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          <Header />
          <main>
            <h2 className="hidenContent">
              <p>
                Hello {user.displayName} <span>🧡</span>
              </p>
              <p>
                Verification Mail Sent , Pleae check your Inbox to verify ..
              </p>
            </h2>
            <button
              onClick={() => {
                verificationHandler()
              }}
              className="delete"
            >
              Send Again
            </button>
          </main>
          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      navigate("/");
    }
  }

  //! 1st user Not Signed in
  if (!user) {
    return (
      <>
        <Helmet>
          <title >Sign In Page</title>
          <meta name="description" content="sign in" />
        </Helmet>
        <Header />
        <main>



          {useModal &&

          <div className="modal-background">
              <form  className="forget-form">
                <i
                  className="close fa-solid fa-xmark"
                  onClick={() => {
                    showSignInFormHandler()
                    
                  }}
                ></i>
            
            
            
                <input
               onChange={(eo) => {
                    setEmail(eo.target.value);
                  }}
                  type="text"
                  id="nameOrEmail"
                  name="nameOrEmail"
                  value={email}
                  required=""
                  placeholder="Email:"
                />
                <button
                  className="delete"
                  onClick={
                    (eo) => {
                      restPassHandler(eo)
                      setshowRestMsg(true)
                      setEmail("")
                    }
                  }
                >
                  Rest Now
                </button>
                {/* 
              {(email==="") && (showRestMsg===false) &&  (<p className="forget"> "pls insert your email"</p>)}
            
              {(showRestMsg=== true) && (email !== "") && (<p className="forget"> Pls check you Email , In order to reset your password "</p>  )} */}
            
            
              </form>
          </div>
          }



          {!useModal &&


            <form id="signInForm">
              <p className="mtt"> Please Sign in :</p>

              <input
                onChange={(eo) => {
                  setEmail(eo.target.value);
                }}
                type="text"
                id="nameOrEmail"
                name="nameOrEmail"
                required=""
                placeholder="insert your email"
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

              <button
                onClick={(eo) => {
                  submitHandler(eo)
                }}
                className="active"
                type="button"
                to="/"
              >
                Sign In
              </button>

              {hasError && <p className="error">{firebaseErrorMsg}</p>}
              <p
                className="forget"
                onClick={() => {
                  
                  showForgetFormHandler()
                }}
              >
                Forget Password !
              </p>
            </form>
          }


        </main>

        <Footer />
      </>
    );
  }
};

export default SignIn;
