import PassDetailCard from "./PassDetailCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PassUsers from "./PassUsers";
import { Dashboard } from "@mui/icons-material";
import Dashboard_Header from "../../../../components/Dashboard_Header";
import Pagination from "../../../../components/Pagination";
import { getUsersByPass } from "../../../../../api";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

export default function PassDetail() {
  const params = useParams();
  const passName = params.id;
  const passes = useSelector((state) => state.auth.allpasses);
  const passNames = {
    "First Day": "Cleopetra Pass",
    "Second Day": "Cleopetra Pass",
    "Third Day": "Cleopetra Pass",
    "Golden Pass": "Cleopetra Pass",
  };
  const currpass = passes.find((x) => x.name === passName);

  console.log(passName);
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
    console.log(currpass._id);
    getUsersByPass(
      currpass._id,
      token,
      currentPage,
      setCurrentRecords,
      setNpage
    );
  }, []);
  console.log(currentRecords);
  console.log(Pages);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="desktop27-main">
        <div className="space-top"></div>
        <Dashboard_Header
          settab={setTab}
          tabactive={tabActive}
          title={passName + ": " + passNames[passName]}
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
                    currentPage,
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
              <PassUsers pass={currpass} setCurrentPage={setCurrentPage} />
            ),
          }[tabActive]
        }
      </div>
      <Footer />
    </div>
  );
}
