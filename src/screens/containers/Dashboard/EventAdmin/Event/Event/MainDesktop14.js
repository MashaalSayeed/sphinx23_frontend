import { DataDesktop14 } from "./DataDesktop14";
import AboutSection from "./AboutSection";
import "./desktop14.css";
import ResultsSection from "./ResultsSection";
import './App.css';
import SidebarSuperAdmin from '../Sidebar';


import { useState } from "react";
import ParticipatedStudentTab from "./ParticipatedStudent/participatedStudentTab";
export default function MainDestop14(props) {
    const Sdata = {
        title: "Event Admin Login",
        options: ["Profile", "Events", "Complaints", "Team"],
    };
    const [inAboutTab, setInAboutTab] = useState(true);
    const [inParticipatedStudentTab, setInParticipatedStudentEventTab] = useState(false);
    const [inResultTab, setInResultTab] = useState(false);

    // const allAboutCardElements = DataDesktop14.map((oneAbout) => {
    //     return (
    //         <AboutSection
    //             key={oneAbout.Id}
    //             image={oneAbout.Poster}
    //             detail={oneAbout.Data}
    //         />);
    // })


    function changeToParticipatedStudentTab() {
        setInParticipatedStudentEventTab(true);
        setInAboutTab(false);
        setInResultTab(false);
    }
    function changeToAboutTab() {
        setInParticipatedStudentEventTab(false);
        setInAboutTab(true);
        setInResultTab(false);
    }
    function changeToResultTab() {
        setInParticipatedStudentEventTab(false);
        setInAboutTab(false);
        setInResultTab(true);
    }

    const evntHead = DataDesktop14[props.id].Head;
    return (
        <div className="desktop14-main">
            <SidebarSuperAdmin data={Sdata} />
            <h3 className="desktop14-head">{evntHead}</h3>

            <div className="desktop14-btns">

                <div className="desktop24-tabChangebtn" >
                    <button className="desktop14-btn" onClick={changeToAboutTab} style={{ borderBottom: inAboutTab ? "2px solid blue" : "none", color: inAboutTab ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)" }} >About</button>

                    <button className="desktop14-btn" onClick={changeToParticipatedStudentTab} style={{ borderBottom: inParticipatedStudentTab ? "2px solid blue" : "none", color: inParticipatedStudentTab ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)" }}>Participated Students</button>

                    <button className="desktop14-btn" onClick={changeToResultTab} style={{ borderBottom: inResultTab ? "2px solid blue" : "none", color: inResultTab ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)" }}>Results</button>
                </div>


            </div>
            <div className="desktop14-border"></div>
            <div className="desktop14-sections">

                {inAboutTab && <section className="desktop14-about">
                    <AboutSection
                        key={DataDesktop14[props.id].Id}
                        image={DataDesktop14[props.id].Poster}
                        detail={DataDesktop14[props.id].Data}
                    />
                </section>}
                {inParticipatedStudentTab && <section className="desktop14-part-students">
                    <ParticipatedStudentTab />
                </section>}
                {inResultTab && <section className="desktop14-results">
                    <ResultsSection id={props.id} DataDesktop14={DataDesktop14} />
                </section>}
            </div>

            {/* {DataDesktop14.map((e, id) => {
                return 
            })} */}


        </div>
    );

}