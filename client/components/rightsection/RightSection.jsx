/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "../style.css"
import "./RightSection.css"
import SearchIcon from '@mui/icons-material/Search';
import { fetchTrends } from "../../src/features/tweet/tweetSlice";
import { useDispatch, useSelector } from "react-redux";
function RightSection() {

    const {trends} = useSelector((state) => state.tweet)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchTrends());
    }, [])


    return (
        <div className="pagecomponent3 col-3">
            <div className="asad">
                <div className="search d-flex justify-content-center align-items-center">
                    <SearchIcon style={{ color: "gray" }}></SearchIcon>
                    <input placeholder="Arama" type="text" />
                </div>


                <div className="trends d-flex flex-column">
                    
                <h4 className="text-center trendss">Trendler</h4>
                    {trends.slice(0, 6).map((element) => {
                        return (
                            <div key={element._id} className=" p-2 geneltrend">
                                <span className="trend">
                                    Trend
                                </span>
                                <div className="trendTitle">
                                    {element.title}

                                </div>
                                <span className="trendPostAmount">
                                    {element.tweets.length} Gönderi

                                </span>

                            </div>

                        )
                    })}
                </div>

            </div>
        </div>
    );
}

export default RightSection;