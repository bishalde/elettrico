import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { getDatabase, ref, onValue, update } from "firebase/database";
import { app } from "../../firebase/Firebase";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  document.title = "Dashboard | Elettrico";
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [loading, setLoading] = useState(true);
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

    const dataRef = ref(getDatabase(app), "ELETTRICO/K001");

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        setDataKeys(Object.keys(snapshot.val()));
        setLoading(false);
      } else {
        alert("No data available");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSNoChange = (element, newValue) => {
    // Update the SNo value in the local state
    setData((prevData) => ({
      ...prevData,
      [element]: {
        ...prevData[element],
        SNo: newValue,
      },
    }));

    const dataRef = ref(getDatabase(app), `ELETTRICO/K001/${element}`);
    update(dataRef, { SNo: newValue }).catch((error) => {
      console.error("Firebase update error:", error);
    });
  };

  return (
    <>
      <section className="main">
        <Navbar />
        <section className="dashmain">
          <div className="dashboard">
            <table>
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>CAN Data (MAIN BOARD)</th>
                  <th>Status</th>
                  <th>Override</th>
                  <th>Export</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <p className="loader">Loading...</p>
                ) : (
                  dataKeys.map((element) => (
                    <tr key={element}>
                      <td>
                        <input
                          type="text"
                          value={data[element].SNo}
                          onChange={(e) =>
                            handleSNoChange(element, e.target.value)
                          }
                        />
                      </td>
                      <td className="CANdata">
                        {Object.keys(data[element]).map(
                          (value) =>
                            value !== "SNo" && (
                              <p key={value}>
                                {value} : {data[element][value]}{" "}
                              </p>
                            )
                        )}
                      </td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>
                        <button>{element}</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
};

export default Dashboard;
