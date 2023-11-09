import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "../../firebase/Firebase";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  document.title = "Dashboard | Elettrico";
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const navigate = useNavigate();

  const getCookie = async () => {
    try {
      const user = await Cookies.get("user");
      if (user === undefined) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error while getting the user cookie:", error);
    }
  };

  useEffect(() => {
    getCookie();

    // Create a reference to the specific data location in Firebase
    const dataRef = ref(getDatabase(app), "ELETTRICO/K001");

    // Set up a listener for real-time updates
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        console.log(snapshot.val());
        setDataKeys(Object.keys(data));
        // dataKeys.forEach((key) => {
        //   console.log(key);
        //   const subKey = Object.keys(data[key]);

        //   subKey.forEach((subkey) => {
        //     console.log(subkey, ":", data[key][subkey]);
        //   });
        //   console.log(" ************************** ");
      } else {
        alert("No data available");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setDataKeys(Object.keys(data));
  }, [data]);

  return (
    <>
      <section className="main">
        <Navbar />
        <section className="dashmain">
          <div className="dashboard">
            <div className="main_div">
              <div className="header">
                <p>Seriol No.</p>
                <p id="bigblock">CAN Data (MAIN BOARD) </p>
                <p>Status</p>
                <p>Override</p>
                <p>Export</p>
              </div>
              {dataKeys.map((element) => (
                <div className="data" key={element}>
                  <p>{element}</p>
                  <p className="massData" id="massData">
                    {Object.keys(data[element]).map((value) => (
                      <h1 className="datasegment" id="datasegment" key={value}>
                        {value} : {data[element][value]}{" "}
                      </h1>
                    ))}
                  </p>
                  <p>Loading..</p>
                  <p>Loading...</p> 
                  <p>
                    <a href="#">button</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Dashboard;
