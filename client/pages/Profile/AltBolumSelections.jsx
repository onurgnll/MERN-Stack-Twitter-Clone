/* eslint-disable react/prop-types */
function AltBolumSelections({ showWhat, setshowWhat }) {
    return (
        <div className="selections d-flex justify-content-around">
            <div className="cp" onClick={() => setshowWhat("Tweetlerin")}>
                <div className={showWhat == "Tweetlerin" ? "fw-bold" : "solgun"}>Tweetlerin</div>
                <div className={showWhat == "Tweetlerin" ? "justify-self-end cizgi w-100" : ""}></div>
            </div>
            <div className="cp" onClick={() => setshowWhat("Retweetler")}>
                <div className={showWhat == "Retweetler" ? "fw-bold" : "solgun"}>Retweetler</div>
                <div className={showWhat == "Retweetler" ? "justify-self-end cizgi w-100" : ""}></div>

            </div>
            <div className="cp" onClick={() => setshowWhat("Beğenilenler")}>

                <div className={showWhat == "Beğenilenler" ? "fw-bold" : "solgun"}>Beğenilenler</div>
                <div className={showWhat == "Beğenilenler" ? "justify-self-end cizgi w-100" : ""}></div>
            </div>
        </div>

    );
}

export default AltBolumSelections;