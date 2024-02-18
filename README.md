 
To Do List App  pseudocode  👩‍🚀

(1) Designed Home Page & Edite Page .
(2) ReDesgin Component Modal ( Forget Pass form && Add New Task +)
              
  _ Try to Rewrite/ forget password form
  _ Create The Modal component
  _ Use the reuseable component ( Modal)  
    
    * A) Create shared folder ( Modal.jsx & its style by using Style css in Helmet 😊)
    * b) share Modal in Sign In page ( upon cliked on forget password)
    * c) share Modal in Home Page ( Upon Cliked on Add New tasks)

 ➡  In Sign In page , we will using useState to manage state of my modal 
     then  using { }

     1) we will import <Modal>


     2) using useState
     const [useModal, setModal] = useState(false);
     useModal his initial value is false

     {useModal && </Modal> }

     3) By using children props , we can chnage designs for each page
         Now will  import modal/ use it by write open and close tag not self close tag

     4)Rendering Array of Data [subtasks]
         By using useState , Empty array , push() method to add item  , map() to walk on  each item and show it on my design.

     5)Send data to firstore data base


