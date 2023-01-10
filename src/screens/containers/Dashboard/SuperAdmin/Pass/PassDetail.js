import PassDetailCard from "./PassDetailCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PassUsers from "./PassUsers";
import { Dashboard } from "@mui/icons-material";
import Dashboard_Header from "../../../../components/Dashboard_Header";

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
  const passNo = 0;

  const [tabActive, setTab] = useState("About");
  return (
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
      />

      {
        {
          About: <PassDetailCard pass={currpass} />,
          "Registered Students": <PassUsers pass={currpass} />,
        }[tabActive]
      }
    </div>
  );
}
