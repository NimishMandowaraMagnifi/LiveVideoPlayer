import React from 'react';
import { useHistory } from "react-router-dom";

function ErrorComponent() {

  const navigation = useHistory();

  const goHome = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");

    navigation.push("./")
  }

  return (
    <div style={{textAlign:"center",marginTop:"30px"}}>
      <h1>Something Went Wrong!</h1>
      <button className="btn btn-outline-secondary" onClick={() => goHome()}>
        Go to Home
      </button>
    </div>
  );
}

export default ErrorComponent