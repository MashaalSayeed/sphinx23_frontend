import { allEventsAdminData, pastEventsAdminData } from "./EventsAdminData"
import "./desktop14.css";
import "./desktop24.css";
import "./desktop26.css";
import "./desktop27.css";
import './App.css';
import SidebarSuperAdmin from '../Sidebar';


import EventCard from "./EventCard";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function EventsAdmin() {
    const Sdata = {
        title: "Event Admin Login",
        options: ["Profile", "Events", "Complaints", "Team"],
    };
    const [inAllEventTab, setInAllEventTab] = useState(true);
    const [inPastEventTab, setInPastEventTab] = useState(false);
    const allEventCardElements = allEventsAdminData.map((oneEvent) => {
        return (
            <EventCard
                key={oneEvent.eventId}
                image={oneEvent.eventPoster}
                id={oneEvent.eventId}
            />);
    })
    const pastEventCardElements = pastEventsAdminData.map((oneEvent) => {
        return (
            <EventCard
                key={oneEvent.eventId}
                image={oneEvent.eventPoster}
            />);
    })

    function changeToPastEventTab() {
        setInPastEventTab(true);
        setInAllEventTab(false);
    }
    function changeToAllEventTab() {
        setInPastEventTab(false);
        setInAllEventTab(true);
    }
    return (
        <div>
            <div className="space-top"></div>
            <SidebarSuperAdmin data={Sdata} />
            <div className="desktop24-main">


                <h3 className="desktop24-head">Tech Events</h3>

                <div className="desktop13-btns">

                    <div className="desktop24-tabChangebtn" >
                        <button className="desktop24-btn" onClick={changeToAllEventTab} style={{ color: !inAllEventTab ? "rgba(0,0,0,0.6)" : "" }} ><div className="tabChange-btn-inner">All Events{inAllEventTab && <img src="images/borderHiglight.png"></img>}</div></button>
                        <button className="desktop24-btn" onClick={changeToPastEventTab} style={{ color: !inPastEventTab ? "rgba(0,0,0,0.6)" : "" }}><div className="tabChange-btn-inner">Past Events{inPastEventTab && <img src="images/borderHiglight.png"></img>}</div></button>
                    </div>


                </div>
                <div className="desktop24-border"></div>
                <div className="desktop24-events">

                    {inAllEventTab && <section className="desktop24-allEvents">
                        {allEventCardElements}
                    </section>}
                    {inPastEventTab && <section className="desktop24-pastEvents">
                        {pastEventCardElements}
                    </section>}
                </div>

            </div>

        </div>
    );

}