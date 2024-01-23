import { Helmet } from "react-helmet-async";
import Header from "../comp/header";
import Footer from "../comp/Footer";


import Loading from "../comp/Loading";

import { Link } from "react-router-dom";


// use Authentication state hook
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

import { sendEmailVerification } from "firebase/auth";



const Home = () => {
  const [user, loading] = useAuthState(auth);



  const verificationEmailHandler = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Email verification sent amr!");
      });
  }


  




  //! 1  loading
  //! 2 if user did't signed up
  //! 3 if user signed up but did't verified his email
  //! 4 if user signed up and verified his email

  //!_____________ 4 Cases __________



  // //! 1  loading
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  //! 2 if user did't have an account signed up
  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <meta name="description" content="HOMEEEEEEEEEEEE" />
        </Helmet>

        <Header />

        <main>
          <h2 className="hidenContent">
            If you have an account please <Link to={"/signin"}>Sign-In   <i className="fa-solid fa-arrow-right-to-bracket"></i></Link>

          </h2>

          <h2 className="hidenContent">
            If you not have an account please<Link to={"/signup"}>Sign-Up
              <i className="fa-solid fa-user-plus"></i>
            </Link>{" "}

          </h2>


        </main>
        <Footer />
      </>
    );
  }

  //! 3 if user signed up but did't verified his email
  //! 4 if user signed up and verified his email

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
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
            <button onClick={() => {
              verificationEmailHandler()
            }}
              className="delete"> Sent Again </button>

          </main>
          <Footer />
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          <Header />
          <main>
            <h2 className="hidenContent">
              Welcome to my website {user.displayName} <span>🧡</span>
            </h2>
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default Home;
