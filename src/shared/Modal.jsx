// @ts-nocheck
import { Helmet } from 'react-helmet-async';
import { Children } from "react"


function Modal({ closeModal, children }) {
  return (
    <>
      <Helmet>

        <title>Form Modal</title>

        <meta name="description" content="Modal" />
        <style type="text/css">{`
.Form-Modal {
  background-color: #EDBD5D; 
  position: fixed;
  height: 310px;
  margin-left: auto;
  animation: mymove 1.5s 1;
  overflow-y:scroll
}

.Form-Modal button:hover{
  background-color: orange;


}

/* 
Modal Animation  
==========================
*/
@keyframes mymove {
  0% {
    scale: 0;
  }
  100% {
    scale: 1
  }
}

/* 

*/

.Form-Modal p.forget {
  color: #EDBD5D;
  font-size: 50PX;
}

.fa-xmark {
  color: #dc3545;
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 25px;
}

.fa-xmark:hover {
  transform: rotate(360deg);
  transition: 2s;
  cursor: pointer;
}

.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #1e1c1c77;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

    `}</style>
      </Helmet>

      <form className="Form-Modal">
        <i
          className="close fa-solid fa-xmark"
          onClick={() => {
            closeModal()
          }}
        ></i>

        {children} 


      </form>


    </>
  )
}

export default Modal




