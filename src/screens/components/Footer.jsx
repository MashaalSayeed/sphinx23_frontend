import React from 'react';
import "./footer.css";

function Footer() {
    return (<footer>
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <img className="footer_mnitlogo" src={require("../../images/mnitlogo.png")} alt="mnitlogo" />
                        <p className="footer_mnit_adress">
                            MNIT Jaipur
                            Malaviya National Institue of Technology, Jawahar Lal Nehru Marg, Jaipur(302017) INDIA.
                        </p>
                    </div>
                    <img className="footer_line1" src={require("../../images/footer_line1.png")} alt="footer_line1" />
                    <div className="footer-col">
                        <h4>Explore</h4>
                        <ul>
                            <li> <a href="#">Home</a></li>
                            <li> <a href="#">About us</a></li>
                            <li> <a href="#">Our Team</a></li>
                            <li> <a href="#">Contact us</a></li>
                        </ul>
                    </div>
                    <img className="footer_line1" src={require("../../images/footer_line1.png")} alt="footer_line1" />
                    <div className="footer-col">
                        <h4>Blogs</h4>
                        <ul>
                            <li> <a href="#">Newsroom</a></li>
                            <li> <a href="#">R&D News</a></li>
                            <li> <a href="#">Research</a></li>
                            <li> <a href="#">Download</a></li>
                        </ul>
                    </div>
                    <img className="footer_line1" src={require("../../images/footer_line1.png")} alt="footer_line1" />
                    <div className="footer-col">
                        <h4>Follow</h4>
                        <ul>
                            <li> <a href="#">Instagram</a></li>
                            <li> <a href="#">Twitter</a></li>
                            <li> <a href="#">Linkedin</a></li>
                            <li> <a href="#">Dribble</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
};

export default Footer;