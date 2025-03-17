import "../styles/display.scss";
import Button from "./button";
import Scarecrow from "../../../../assets/Scarecrow.png";

function Display() {
    return (
        <div className="display">
            <div className="display__img">
                <img src={Scarecrow} alt="404-Scarecrow" />
            </div>
            <div className="display__content">
                <h2 className="display__content--info">I have bad news for you</h2>
                <p className="display__content--text">
                    The page you are looking for might be removed or is temporarily
                    unavailable
                </p>
                <Button className="btn">Back to homepage</Button>
            </div>
        </div>
    );
}

export default Display;
