import React, { useState, useEffect } from "react";

import styles from "./TeamCard.module.css";

import phone from "../../../images/socials/phone.svg"
import facebook from "../../../images/socials/facebook.svg"
import instagram from "../../../images/socials/instagram.svg"

function TeamCard({ card }) {
    const {
        name,
        group,
        color,
        description,
        picture,
        socials,
    } = card;

    return (
        <div style={{ borderColor: color }} className={styles.container}>

            <div style={{ color: color }} className={styles.scrolling}>
                <p>{(group + " ").repeat(5)}</p>
            </div>

            <div style={{ borderColor: color }} className={styles.card}>

                <div className={styles.image}>
                    <img style={{ borderColor: color }} src={picture} />
                </div>

                <div style={{ borderColor: color }} className={styles.details}>
                    <h1>{name.replace(" ", "\n")}</h1>
                    <p>{description}</p>

                    <div className={styles.socials}>
                        <a href={socials.phone}>
                            <img alt="phone icon" src={phone} />
                        </a>
                        <a href={socials.instagram}>
                            <img alt="instagram icon" src={instagram} />
                        </a>
                        <a href={socials.facebook}>
                            <img alt="facebook icon" src={facebook} />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TeamCard;
