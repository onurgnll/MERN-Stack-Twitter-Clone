/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import "../style.css"
import "./MiddleSection.css"

function MiddleSection({showWhoTweets, setshowWhoTweets}) {

    const {logged} = useSelector(state => state.auth)


    return (
        <div className="pagecomponent2 stickyy">
            <div className="d-flex flex-column bac">

                <div className="p-2 baa">

                    <h3 className="cp">Anasayfa</h3>
                </div>

                {logged? 
                <div className="d-flex w-100 h-100 bbb">
                    <a  onClick={() => setshowWhoTweets("Senin İçin")} href="#" className="linkk w-50 abbb d-flex flex-column justify-content-center align-items-center">
                        <div className={showWhoTweets == "Senin İçin" ? `` : "solgun"}>Senin İçin</div>
                        <div className={showWhoTweets == "Senin İçin" ? "justify-self-end cizgi" : "" }></div>

                    </a>
                    <a onClick={() => setshowWhoTweets("Takip Edilenler")} href="#" className="linkk w-50 d-flex abbb flex-column justify-content-center align-items-center">
                        <div className={!(showWhoTweets == "Senin İçin") ? `` : "solgun"}>Takip Edilenler</div>
                        <div className={!(showWhoTweets == "Senin İçin") ? "justify-self-end cizgi" : "" }></div>

                    </a>
                </div>
                : 
                <div className="d-flex w-100 h-100 bbb">
                    <a  onClick={() => setshowWhoTweets("Senin İçin")} href="#" className="linkk w-100 abbb d-flex flex-column justify-content-center align-items-center">
                        <div className={showWhoTweets == "Senin İçin" ? `` : "solgun"}>Senin İçin</div>
                        <div className={showWhoTweets == "Senin İçin" ? "justify-self-end cizgi" : "" }></div>

                    </a>
                </div>
                
                }

            </div>
        </div>
    );
}

export default MiddleSection;