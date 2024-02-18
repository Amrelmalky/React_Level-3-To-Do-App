import { Helmet } from "react-helmet-async";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import { Link } from "react-router-dom";

//level 3
import Modal from "../../shared/Modal";
import "./Home.css"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config.js";




// use Authentication state hook
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";



const Home = () => {
  //! level 3 Rendering Array of data

  const [arrayOfSubTasks, setarrayOfSubTask] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [mainTaskTiltle, setmainTaskTiltle] = useState("");



  const addSubTaskHandler = () => {
    arrayOfSubTasks.push(subTask)
    console.log(arrayOfSubTasks)
    setsubTask("")
  }



  const [user, loading] = useAuthState(auth);

  // using useState to manage state of modal
  const [useModal, setModal] = useState(false);



  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }




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

            <style type="text/css">{`
            .add-new-task{
              background-color: #cddfa9;
              display: flex;
              flex-direction: column;
            }            
            .modal-background input {
              width: 210px
            }`}</style>

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

            <style type="text/css">{`
          form button.submit {
            padding: 5px 10px;
            background-color: #DFA527;
            color: black;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 15px;
            margin: 20px 0;
            font-weight: bolder;
            font-family: 'system-ui'
}
 
            form button.Add-task{
            padding: 9px 10px;
            background-color: #DFA527;
            color: black;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            margin: 20px 10px;
            font-weight: bolder;
            font-family: 'system-ui';
            }`}</style>
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

              <Link to={"/editepage"}>
                <article dir="auto" className="mt" >
                  <ul>
                    <h2>New Task</h2>
                    <li>sub task 1</li>
                    <li>sub task 2</li>
                    <p className="time"> A Day Ago</p>
                  </ul>
                </article>
              </Link>


            </section>
            {/* Part3️⃣ Add New Butto  */}

            <section className=" mt flex">

              <button className="Add-New-Task"
                onClick={
                  () => {
                    openModal()
                  }
                }
              > Add New Task + </button>
            </section>


            {useModal &&
              <div className="modal-background">
                <Modal closeModal={closeModal}>


                  <div style={{
                    "display": "flex",
                    "flex-direction": "column",
                    "backgroundcolor": "chocolat",

                  }}>


                    <input
                      onChange={
                        (eo) => {
                          setmainTaskTiltle(eo.target.value)

                        }
                      }
                      value={mainTaskTiltle}
                      type="text"
                      name="task title"
                      placeholder="The Main Task"
                      required />

                    <div className="sub-task">
                      <input

                        onChange={(eo) => {
                          setsubTask(eo.target.value)
                        }
                        }
                        type="text"
                        id="nameOrEmail"
                        name="nameOrEmail"
                        value={subTask}
                        required
                        placeholder="sub-task....."
                      />


                      <button className="Add-task"
                        onClick={
                          (eo) => {
                            eo.preventDefault()
                            addSubTaskHandler()
                          }
                        }
                      >
                        Add
                      </button>
                    </div>

                    <ul>
                      {arrayOfSubTasks.map((item) => (
                        <li key={item} >{item}</li>

                      ))}

                    </ul>


                  </div>
                  <button
                    className="submit"
                    onClick={async (eo) => {
                      eo.preventDefault()
                      console.log('waiting.......😜')

                      const taskId = new Date().getTime();
                      const userUid = user.uid
                      await setDoc(doc(db, userUid, `${taskId}`), {
                        Title:  mainTaskTiltle ,
                        ThesubTask: arrayOfSubTasks ,
                        id:taskId

                      });
                      console.log('Done......✌')
                      setmainTaskTiltle("")
                      setarrayOfSubTask([])
                    }
                    }
                  >
                    Submit
                  </button>


                </Modal>


              </div>
            }

          </main>
          <Footer />
        </>
      )
    }
  }
}

export default Home;
