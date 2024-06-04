import React from "react";
import spinner from "../../assert/img/spinner2.gif";
import loading from "../../assert/img/loading-.gif"
import runman from "../../assert/img/run.gif"

const Spinner = () => {
  return (
    <>
     <div>
        <img src={loading} alt="spinner"className="d-block m-auto mt-2 mb-2" style={{width : 150}} />
        {/* <img src={runman} alt="spinner"className="d-block m-auto mt-2 mb-2" style={{width : 150}} /> */}
     </div>
    </>
  );
};
export default Spinner;
