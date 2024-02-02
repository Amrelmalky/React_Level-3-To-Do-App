import React from "react";

import { Helmet } from "react-helmet-async";
import Header from "../comp/Header";
import Footer from "../comp/Footer";


import Loading from "../comp/Loading"

//React component for the moment date library.

import "../theme.css";

// importauth menthod from firbase config file
import { auth } from "../firebase/config";

import { getAuth, deleteUser } from "firebase/auth";

// use Authentication state hook
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });

const deletAccountHandler = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  deleteUser(user)
    .then(() => {
      // User deleted.
      console.log("user deleted ")
    })
    .catch((error) => {
      // An error ocurred
      // ...
      console.log(error.message)
    });
}


  // 3 Cases for connection with Firebase   {  Loading   , Error , showing data }
  //! 1) case of loading data
  if (loading) {
    return (
      <main>
      <Loading/>
      </main>
    );
  }

  //! 2) case having error
  if (error) {
    return (
      <main>
        <h2>
          <p>
            {error} ....<span>🤢 </span>{" "}
          </p>
        </h2>
      </main>
    );
  }

  //! 3) case user signed up but we have to check if he verified his email or not to show his info
  if (user) {
    if (user.emailVerified)
      return (
        <>
          <Helmet>
            <title> Profile Page </title>
            <meta name="description" content="Profile page"></meta>
            <style type="text/css">{`
            .info-card{
              display: flex;
              flex-direction: column;
              border: 1px soild red;
              /* border: 3px solid red; */
              align-content: flex-start;
              align-items: flex-start;
              margin: auto;
              width: fit-content;
                    }      
        
            `}</style>
          </Helmet>

          <Header />
          {/* checking if user not created ( user = false) show up below .. */}

          <main>

  < div className="info-card">
              <h6 className="hidenContent">User Name :{user.displayName}</h6>
              <h6 className="hidenContent">User email :{user.email}</h6>
              <h6 className="hidenContent">
                Account Created :
                <Moment
                  className="hidenContent"
                  fromNow
                  date={user.metadata.creationTime}
                />
              </h6>
              <h6 className="hidenContent">
            
                Last Sign-in :{" "}
                <Moment
                  className="hidenContent"
                  fromNow
                  date={user.metadata.lastSignInTime}
                />
              </h6>
              <button
                onClick={() => {
                deletAccountHandler()
                }}
                className="delete"
              >
                Delete account
              </button>
  </ div>
          </main>

          <Footer />
        </>
      )
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Profile Page</title>
            <meta name="description" content="Profile" />
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
            <button className="delete">Send Again</button>
          </main>
          <Footer />
        </>
      )
    }
  }
}

export default Profile;
