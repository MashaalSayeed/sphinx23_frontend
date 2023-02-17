import React from "react";
import style from "../../../styles/amb.module.css";
import intro from "../../../images/ambMain.png";
import { useState } from "react";
import HomeNav from "./homeNav";
import share from "../../../images/ambShare.png";
import grp from "../../../images/ambGrp.png";
import reg from "../../../images/ambReg.png";
import Footer from "../../components/Footer/footer";
import { useSelector } from "react-redux";
import { editUser } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CardsData = [
  {
    name: "Promotion",
    data: "Become a central figure at your school and help spread the word about Sphinx by sharing postings on social media and promoting content.",
    img: share,
  },
  {
    name: "Conducts",
    data: "Support in organising the elimination of teams or individual performances for a variety of competitions at Sphinx.",
    img: grp,
  },
  {
    name: "Registration",
    data: "The number of registrations the Ambassador is capable of bringing will also be taken into account while evaluating his or her performance.",
    img: reg,
  },
];

const Points = [
  {
    name: "Take Charge",
    data: "As you assist in planning one of India's greatest Techno- Management fest, represent your college.",
  },
  {
    name: "Networking",
    data: "Have the opportunity to converse with prominent people from various fields and celebrities.",
  },
  {
    name: "Certification",
    data: "Have the opportunity to converse with prominent people from various fields and celebrities.",
  },
  {
    name: "Goods & Merchandise",
    data: "Free Sphinx merchandise as well as rewards for excellence",
  },
  {
    name: "Passes",
    data: "Receive complimentary tickets to pronites and celebrity events, too.",
  },
  {
    name: "The Top Chart",
    data: "Based on the work they have completed, a Leaderboard will be available. Additionally, our Sphinx Team will give an unique prize to the leader of the scoreboard.",
  },
];

function Sec1() {
  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const user = useSelector((state) => state.auth.curruser);
  const handleSubmit = () => {
    //console.log("Called");
    if (user == null) {
      toast.error("Please Login First", toastStyle);
      window.location.href = "/login";
      return;
    } else {
      if (user.profile.isMnit) {
        toast.error("This is not for MNIT Students", toastStyle);

        return;
      }
      if (user.profile.isAmbassador) {
        toast.error("You are already a Ambassador", toastStyle);

        return;
      }
    }

    let body = { isAmbassador: true };
    //console.log(body);
    editUser(body)
      .then((res) => {
        //console.log(res);
        toast.info(res, toastStyle);
        window.location.href = "/ambassador";
      })
      .catch((err) => {
        toast.error(err, toastStyle);
      });
  };
  return (
    <div className={style.sec1}>
      <div className={style.bottomGrad}></div>
      <div className={style.mainImg}>
        <img src={intro}></img>
      </div>
      <div className={style.intro}>
        <div className={style.introHead}>
          Campus<br></br>Ambassadors
        </div>
        <div className={style.introSub}>
          There will be multiple students from each college chosen for this position,
          who will be in charge of the entire contingent from that college.
        </div>
        {/* <div className={style.introBtn}>
          <button
            className={style.introLog}
            disabled={user != null && user.profile.isAmbassador}
            onClick={handleSubmit}
          >
            {user != null && user.profile.isAmbassador
              ? "Already a ambassador"
              : "Sign Up"}
          </button> */}
        {/* <button className={style.introExp}>EXPLORE</button> */}
        {/* </div> */}
      </div>

      <div className={style.cardsCon}>
        <div className={style.introHead}>What should you do</div>
        <div className={style.cardsSec}>
          {CardsData.map((value, i) => {
            return <Cards data={{ ...value }} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Pcard(props) {
  const { data } = props;
  return (
    <div className={style.point}>
      <div className={style.Pindex}>{data.index}</div>
      <div className={style.Pcon}>
        <div className={style.Pname}>{data.name}</div>
        <div className={style.Pinfo}>{data.data}</div>
      </div>
    </div>
  );
}

function Sec2() {
  return (
    <div className={style.sec2}>
      <div className={style.sec2Head}>
        {" "}
        The appointed Campus Ambassadors will enjoy the following benefits:
      </div>
      <div className={style.pointsCon}>
        {Points.map((value, i) => {
          return <Pcard data={{ index: i + 1, ...value }} key={i} />;
        })}
      </div>
    </div>
  );
}

function Cards(props) {
  const { data } = props;
  return (
    <div className={style.Card}>
      <div className={style.Mcard}>
        <img className={style.Mimg} alt="" src={data.img}></img>
        <div className={style.Mtitle}>{data.name}</div>
        <div className={style.Msub}>{data.data}</div>
      </div>
      <div className={style.Bcard}></div>
    </div>
  );
}

function AmbassadorM() {
  const Tabs = ["Home", "Events", "Contact"];
  const [currTab, setCurrTab] = useState("AMBASSADOR");
  // //console.log(currTab);
  return (
    <div className={style.main}>
      <HomeNav
        setCurrTab={setCurrTab}
        currTab={currTab}
        Tabs={Tabs}
        notanimation={true}
        landing={false}
        setLand={() => {}}
      />
      <Sec1 />
      <Sec2 />
      <Footer setCurrTab={() => {}} />
    </div>
  );
}

export default AmbassadorM;
