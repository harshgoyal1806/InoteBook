import {React,useContext} from "react";
import Notes from "./Notes";
const Home = ({showAlert,authenticated}) => {
  
  return (
    <div>
      <div className="container my-3">
        <Notes showAlert ={showAlert} authenticated={authenticated}/>
      </div>
    </div>
  );
};

export default Home;
