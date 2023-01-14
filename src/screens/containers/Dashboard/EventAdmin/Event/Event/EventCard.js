import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function EventCard(props) {
    console.log("/event" + (props.id));
    const func2 = () => {
        return '/event' + (props.id);
    }
    return (
        <NavLink to="/event1">
            <div className="eventCard-main">
                <img className="eventCard-img" src={props.image}>

                </img>
            </div>
        </NavLink>
    );
}