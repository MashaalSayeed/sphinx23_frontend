import PassDetailCard from "./PassDetailCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PassUsers from "./PassUsers";
import { Dashboard } from "@mui/icons-material";
import Dashboard_Header from "../../../../components/Dashboard_Header";
import Pagination from "../../../../components/Pagination";
import { getUsersByPass, fetchOnePass } from "../../../../../api";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastStyle = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export default function PassDetail() {
  const params = useParams();
  const passName = params.id;
  const tab = params.tab;
  ////console.log("Tab", tab);
  const passes = useSelector((state) => state.auth.allpasses);
  const passNames = {
    "First Day": "Cleopetra Pass",
    "Second Day": "Cleopetra Pass",
    "Third Day": "Cleopetra Pass",
    "Golden Pass": "Cleopetra Pass",
    "Platinum Pass":"Cleopetra Pass"
  };
  const [currpass, setPass] = useState();

  ////console.log(passName);
  const token = useSelector((state) => state.auth.curruser.token);
  const [tabActive, setTab] = useState("About");
  const [currentRecords, setCurrentRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(1);
  // const [recordsPerPage] = useState(1);
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  useEffect(() => {
    ////console.log(passName);
    if (tab == 1) {
      setTab("Registered Students");
    }
    ////console.log("Pass Called");
    fetchOnePass(setPass, passName)
      .then((res) => {
        ////console.log("Fetched PAss", currpass);
      })
      .catch((err) => {
        // alert(err);
        toast.error(err, toastStyle);
      });

    getUsersByPass(passName, token, currentPage, setCurrentRecords, setNpage)
      .then((res) => {
        ////console.log("Users Fetched");
      })
      .catch((err) => {
        // alert(err);
        toast.error(err, toastStyle);
      });
  }, []);
  ////console.log(currentRecords);
  ////console.log(Pages);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {currpass && (
        <div className="desktop27-main">
          <div className="space-top"></div>
          <Dashboard_Header
            settab={setTab}
            tabactive={tabActive}
            title={currpass.name}
            tabs={["About", "Registered Students"]}
            excel={tabActive == "Registered Students" ? true : false}
            addBtnBool={tabActive == "Registered Students" ? true : false}
            dashBool={tabActive == "Registered Students" ? true : false}
            paginate={
              typeof Pages != "undefined" ? (
                <Pagination
                  nPages={Pages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  apiCall={(pageNo) => {
                    getUsersByPass(
                      currpass._id,
                      token,
                      pageNo,
                      setCurrentRecords,
                      setNpage
                    );
                  }}
                />
              ) : (
                <></>
              )
            }
          />

          {
            {
              About: <PassDetailCard pass={currpass} />,
              "Registered Students": (
                <PassUsers
                  pass={currpass}
                  setCurrentPage={setCurrentPage}
                  users={currentRecords}
                />
              ),
            }[tabActive]
          }
        </div>
      )}
      <Footer />
    </div>
  );
}
