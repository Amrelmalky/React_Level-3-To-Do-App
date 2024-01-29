
import { Helmet } from 'react-helmet-async'

import React from 'react'
import Header from '../../comp/Header'
import Footer from '../../comp/Footer'

import "./EditeTask.css"

function EditeTask() {
  return (
    <>

      <Helmet>
        <title>HOME Page</title>
        <meta name="description" content="EditeTask" />
      </Helmet>

      <Header/>

      {/* Edite Task */}
      <div className="edite-task " >
      {/* Part1️⃣  Title of the Main Task */}

      <section className="task-title center mttt">

        <input value={" Edite task title"} className="task-title-input center" type="text" />
        <i className="fa-solid fa-pen-to-square"></i>
      </section>

      {/* Part2️⃣ The Sub-tasks */}

<section className="sub-tasks">
  <div></div>
  <div></div>
  <div></div>

</section>





      {/* Part3️⃣ add & delete buttons */}




      </div>

      <Footer/>



    </>
  )
}

export default EditeTask