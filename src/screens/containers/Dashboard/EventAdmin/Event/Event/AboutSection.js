export default function AboutSection(props){
    return(
    <div className="aboutSection">
        <div className="aboutSec-img-btn">
            <img src={props.image} className = "aboutSec-img"/>
            <button className = "desktop14-edit-btn">
                    <div className="desktop14-btn-inner">
                        <img src="images/edit.png"></img>
                        <p>Edit</p>
                    </div>
            </button>
        </div>
        <p className="aboutSec-p">{props.detail}</p>
        
    </div>
    );

}