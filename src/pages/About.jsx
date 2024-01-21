import { Helmet } from "react-helmet-async";
import Header from "../comp/header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";

import Loading from "../comp/Loading";

import { useEffect } from "react";

import { Link } from "react-router-dom";

// use Authentication state hookto check user state  if user signe in  or not
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

// import usenavigate
import { useNavigate } from "react-router-dom";

const About = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate(); 

  useEffect(() => {
  
    if (!user && !loading)
    {
      navigate("/")
    }
    
  }, );

  
  //! 1  loading
  if (loading) {
    return (
      <main>
    <Loading/>
      </main>
    );
  }

  //! 2   user did't have an account
  if (!user) {
    return (
      <>
        <Helmet>
          <title>About Page</title>
          <meta name="description" content="About" />
        </Helmet>

        <Header />

        <main>
          <h2 className="hidenContent">
            If you have an account please <Link to={"/signin"}>Sign-In </Link>
            First ..<span>🧡</span>
          </h2>

          <h2 className="hidenContent">
            If you not have an account please<Link to={"/signup"}>Sign-Up</Link>{" "}
            ..😊
          </h2>
        </main>
        <Footer />
      </>
    );
  }

  //! 3 user have accont sign up { check if he verified his email or not}

  if (user) {
    if (!user.emailVerified) {
      navigate("/");
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About Page</title>
            <meta name="description" content="About" />
          </Helmet>

          <Header />
          <main>
          
            <MainContent pageName="About Page" />
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default About;
