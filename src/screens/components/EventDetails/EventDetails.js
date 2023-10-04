import AboutSection from "./EventAbout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dashboard_Header from "../Dashboard_Header";
import EventTeams from "./EventTeams";
import Pagination from "../Pagination";
import { getTeamsByEvent } from "../../../api";
import EventStudents from "./EventStudents";
import Results from "./Results";
import { fetchOneEvent } from "../../../api";
import Navbar from "../Navbar";
import Footer from "../Footer";
import HomeNav from "../../containers/Home/homeNav";
export default function EventDetails() {
  const [tabActive, setTab] = useState("About");
  ////console.log("Event Called");
  const params = useParams();
  const eventName = params.id;
  const tab = params.tab;
  const event = useSelector((state) => state.auth.events);
  ////console.log(event);
  const type = useSelector((state) => state.auth.curruser.profile.type);
  //make it dynamic
  // const type = "eventAdmin";
  const [currevent, setEvent] = useState();

  const token = useSelector((state) => state.auth.curruser.token);
  ////console.log(token);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(1);
  useEffect(() => {
    if (tab == 1 || tabActive == "Registered Teams") {
      ////console.log("get teams by event", token);
      getTeamsByEvent(
        eventName,
        token,
        currentPage,
        setCurrentRecords,
        setNpage
      );
    }

    //api call for reg studetnts ;
    ////console.log("get results by event"); //api call for results ;
  }, [tabActive]);
  useEffect(() => {
    if (tab == 1) setTab("Registered Teams");
    if (tab == 2) setTab("Results");
    fetchOneEvent(setEvent, eventName)
      .then((res) => {
        ////console.log("Event Fetched");
        setEvent(res);
      })
      .catch((err) => {
        alert(err);
      });
    ////console.log("API Called");
  }, []);
  ////console.log(currentRecords);
  ////console.log(Pages);
  const SuperAdmintabs = ["About", "Registered Teams"];
  const EventAdminTabs = ["About", "Registered Teams", "Results"];
  const SuperAdminPaginate = () => {
    return (
      <Pagination
        nPages={Pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        apiCall={(pageNo) => {
          getTeamsByEvent(
            eventName,
            token,
            pageNo,
            setCurrentRecords,
            setNpage
          );
        }}
      />
    );
  };
  // const EventStudnetsPaginate = () => {
  //   return (
  //     <Pagination
  //       nPages={Pages}
  //       currentPage={currentPage}
  //       setCurrentPage={setCurrentPage}
  //       apiCall={() => {}}
  //       // apiCall={(pageNo) => {
  //       //   getTeamsByEvent(
  //       //     currevent._id,
  //       //     token,
  //       //     pageNo,
  //       //     setCurrentRecords,
  //       //     setNpage
  //       //   );}
  //     />
  //   );
  // };

  // const EventResultPaginate = () => {
  //   return (
  //     <Pagination
  //       nPages={Pages}
  //       currentPage={currentPage}
  //       setCurrentPage={setCurrentPage}
  //       apiCall={() => {}}
  //       // apiCall={(pageNo) => {
  //       //   getTeamsByEvent(
  //       //     currevent._id,
  //       //     token,
  //       //     pageNo,
  //       //     setCurrentRecords,
  //       //     setNpage
  //       //   );}
  //     />
  //   );
  // };
  const currPagePaginate = () => {
    if (tabActive == "Registered Teams") return SuperAdminPaginate();
    // if (tabActive == "Registered Students") return EventStudnetsPaginate();
    // if (tabActive == "Results") return EventResultPaginate();
  };
  const Tabs = ["Home", "Events", "Profile"];
  const [currTab, setCurrTab] = useState("");
  ////console.log("cuurent tab");
  ////console.log(tabActive);
  return (
    <div style={{ background: "white" }}>
      <div style={{ background: "black" }}>
        {" "}
        <HomeNav setCurrTab={setCurrTab} currTab={currTab} Tabs={Tabs} />
      </div>
      <div className="space-top"></div>
      {currevent && (
        <Dashboard_Header
          settab={setTab}
          tabactive={tabActive}
          title={currevent.name}
          tabs={type == "superAdmin" ? SuperAdmintabs : EventAdminTabs}
          excel={
            tabActive == "Registered Teams" ||
            tabActive == "Registered Students"
              ? true
              : false
          }
          addBtnBool={
            tabActive == "Registered Teams" ||
            tabActive == "Registered Students"
              ? true
              : false
          }
          dashBool={
            tabActive == "Registered Teams" ||
            tabActive == "Registered Students"
              ? true
              : false
          }
          paginate={typeof Pages != "undefined" ? currPagePaginate() : <></>}
        />
      )}
      {currevent && type == "superAdmin" ? (
        <div className="desktop14-sections">
          {
            {
              About: (
                <section className="desktop14-about">
                  <AboutSection event={currevent} />
                </section>
              ),
              "Registered Teams": (
                <EventTeams currentRecords={currentRecords} />
              ),
            }[tabActive]
          }
        </div>
      ) : currevent ? (
        <div className="desktop14-sections">
          {
            {
              About: (
                <section className="desktop14-about">
                  <AboutSection event={currevent} />
                </section>
              ),
              "Registered Teams": (
                <EventStudents currentRecords={currentRecords} />
              ),
              Results: <Results event={currevent} />,
            }[tabActive]
          }
        </div>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
}
