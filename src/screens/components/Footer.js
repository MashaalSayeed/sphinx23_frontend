import React from "react";
import mnitLogo from "../../images/mnitlogo.png";
import { Link } from "react-router-dom";

// Links
let exploreLinks = [
	{
		name: "Home",
		to: "#",
	},
	{
		name: "About Us",
		to: "#",
	},
	{
		name: "Contact Us",
		to: "#",
	},
	{
		name: "Our Team",
		to: "#",
	},
];
let blogLinks = [
	{
		name: "Newsroom",
		to: "#",
	},
	{
		name: "R&D News",
		to: "#",
	},
	{
		name: "Research",
		to: "#",
	},
	{
		name: "Downloads",
		to: "#",
	},
];
let followLinks = [
	{
		name: "Instagram",
		to: "#",
	},
	{
		name: "Twitter",
		to: "#",
	},
	{
		name: "LinkedIn",
		to: "#",
	},
	{
		name: "Dribble",
		to: "#",
	},
];

//Child Components
function FooterLinks(props) {
	return (
		<Link to={props.to} className="footer-contents-links">
			{props.name}
		</Link>
	);
}
function FooterSeprator() {
	return (
		<div className="footer-seprator-wrapper">
			<div className="footer-seprator"></div>
			<div className="footer-seprator-shadow"></div>
		</div>
	);
}
function FooterExplore() {
	let exploreLinksDisp = exploreLinks.map((x, i) => {
		return <FooterLinks name={x.name} to={x.to} />;
	});
	return (
		<div className="footer-content-section">
			<div className="footer-contents-titles">Explore</div>
			{exploreLinksDisp}
		</div>
	);
}
function FooterBlogs() {
	let blogLinksDisp = blogLinks.map((x, i) => {
		return <FooterLinks name={x.name} to={x.to} />;
	});
	return (
		<div className="footer-content-section">
			<div className="footer-contents-titles">Blogs</div>
			{blogLinksDisp}
		</div>
	);
}
function FooterFollow() {
	let followLinksDisp = followLinks.map((x, i) => {
		return <FooterLinks name={x.name} to={x.to} />;
	});
	return (
		<div className="footer-content-section">
			<div className="footer-contents-titles">Follow</div>
			{followLinksDisp}
		</div>
	);
}

//Main Component
function Footer() {
	return (
		<div className="footer-container">
			<div className="footer-contents">
				<div className="footer-logo">
					<img src={mnitLogo} className="footer-logo-img" />
					<div className="footer-logo-text">
						MNIT Jaipur Malaviya National Institue of Technology, Jawahar Lal Nehru
						Marg, Jaipur(302017) INDIA.
					</div>
				</div>
				<FooterSeprator />
				<FooterExplore />
				<FooterSeprator />
				<FooterBlogs />
				<FooterSeprator />
				<FooterFollow />
			</div>
			<div className="footer-credits">© 2022 Designed By Subhranshu Shekhar</div>
		</div>
	);
}

export default Footer;