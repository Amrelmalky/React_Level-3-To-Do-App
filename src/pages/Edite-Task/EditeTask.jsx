
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

      <Header />

      {/* Edite Task */}
      <div className="edite-task " >
        {/* Part1️⃣  Title of the Main Task */}

        <section className="task-title center mttt">

          <input value={" Welcome to Tasks"} className="task-title-input center" type="text" />
          <i className="fa-solid fa-pen-to-square"></i>
        </section>

        {/* Part2️⃣ The Sub-tasks */}

        <section className="sub-tasks">
          {/* creted p & check box */}
          <div className='parent-fo-time'>
            <p className="time">Craeted 6 days ago </p>
            <div>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox"> Completed  </label>
            </div>
          </div>
          {/* sub task */}
          <div className="task-card">
            <ul >
              <li className='task flex'>
                <p>Task One </p>
                <i class="fa-solid fa-trash"></i>

              </li>
            </ul>
          </div>
          <div className="task-card">
            <ul >
              <li className='task flex'>
                <p>Task two </p>
                <i class="fa-solid fa-trash"></i>


              </li>
            </ul>
          </div>
          <div className="task-card">
            <ul >
              <li className='task flex'>
                <p>Task two </p>
                <i class="fa-solid fa-trash"></i>


              </li>
            </ul>
          </div>

          <div className="task-card">
            <ul >
              <li className='task flex'>
                <p>Task two </p>
                <i class="fa-solid fa-trash"></i>


              </li>
            </ul>
          </div>
        

    
      
            </section>


        {/* Part3️⃣ add & delete buttons */}

        <section className='tasks-btns flex'>
        
          <button className='add'>Add +</button>
        
        <button className='delete mttt'>Delete</button>
        </section>


      </div>

      <Footer />



    </>
  )
}

export default EditeTask