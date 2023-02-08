import React from "react"

import styles from "./footer.module.css"

import pyramid from "../../../images/footer/pyramid.svg"
import logo from "../../../images/footer/logo.png"
import mysterybox from "../../../images/footer/mysterybox.png"

function StayInLoop() {
    return (
        <div className={styles.col1}>
            <img className={styles.logo} src={logo} />
            <h1>Stay In Loop</h1>
            <img className={styles.mysterybox} src={mysterybox} />
        </div>
    )
}

function QuickLinks() {
    const links = {
        "Events": "#",
        "Dashboard": "#",
        "Schedule": "#",
        "FAQs": "#",
        "Our Team": "#",
        "Campus ambassador": "#",
        "Sponsors": "#",
        "About us": "#",
    }

    return (
        <div className={styles.col2}>
            <img src={pyramid} />
            <div>
                <h1>Quick Links</h1>
                <ul>
                    {Object.keys(links).map((link, i) => (
                        <li key={i}><a href={links[link]}>{link}</a></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function GetInTouch() {
    return (
        <div className={styles.col3}>
            <div className={styles.getintouch}>
                <h1>Get In Touch</h1>
                <p>sphinx@mnit.ac.in</p>
            </div>
            <div className={styles.scanit}>
                Scan it To know it
            </div>
        </div>
    )
}

function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <StayInLoop />
                <QuickLinks />
                <GetInTouch />
            </div>
            <div className={styles.credits}>
                <p>Designed by SUBU</p>
            </div>
        </div>
    );
}

export default Footer;