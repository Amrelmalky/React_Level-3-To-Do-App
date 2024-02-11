 
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

     1st we will import <Modal>


     2nd using useState
     const [useModal, setModal] = useState(false);
     useModal his initial value is false

     {useModal && </Modal> }

     3rd By using children props , we can chnage designs for each page
         Now will  import modal/ use it by write open and close tag not self close tag

