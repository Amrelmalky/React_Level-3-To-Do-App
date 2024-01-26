// @ts-nocheck
import { Helmet } from "react-helmet-async";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import { Link } from "react-router-dom";

import "./Home.css"


// use Authentication state hook
import { auth } from "../../firebase/config";
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
          <meta name="description" content="HOME" />
        </Helmet>

        <Header />

        <main>


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
            <meta name="description" content="HOME" />
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
      )
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOME" />
          </Helmet>
          <Header />
          <main>
            {/* Main Section contain 3 parts */}
            {/* Part1️⃣ Arrange Data Options // filter Data */}
            <section className="Parent-of-btns mttt flex">
              <button>Newest First</button>
              <button>Oldest First </button>
              <select id="tasks">
                <option value="">All Tasks</option>
                <option value="">Task one ..</option>
                <option value="">Task two..</option>
                <option value="">Task two..</option>
              </select>
            </section>

            {/* Part2️⃣ Show The All Tasks */}
            <section className="All-Task flex mtt">

              <article  dir="auto" className="mt" >
                <ul>
                  <h2>New Task</h2>
                  <li>sub task 1</li>
                  <li>sub task 2</li>
                  <p className="time"> A Day Ago</p>
                </ul>
              </article>
              <article dir="auto" className="mt">
                <ul>
                  <h2>New Task</h2>
                  <li>sub task 1</li>
                  <li>sub task 2</li>
                  <p className="time "> A Day Ago</p>
                </ul>
              </article>
              <article dir="auto" className="mt">
                <ul>
                  <h2>مهمة جديدة</h2>
                  <li>شراء جوافة من كارفور</li>
                  <li> غسيل العربية</li>
                  <p className="time "> A Day Ago</p>
                </ul>
              </article>
            </section>
            {/* Part3️⃣ Add New Butto  */}

            <section className=" mt flex">


              <button className="Add-New-Task"> Add New Task </button>
            </section>


          </main>
          <Footer />
        </>
      )
    }
  }
}

export default Home;
