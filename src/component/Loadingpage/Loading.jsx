import React, { useEffect, useState } from "react";
import "./Loading.css";

const LoadingPage = ({ onEnter }) => {

    const [progress, setProgress] = useState(0);
    const [finished, setFinished] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setFinished(true);
                    }, 700);

                    return 100;
                }
                return prev + 1;
            });
        }, 35);
        return () => clearInterval(interval);
    }, []);


    // How many dots remain
    const dotsRemaining = Math.max(
        0,
        5 - Math.floor(progress / 20)
    );
    return (
        <div className="loading-page">

            <h1 className="loading-logo">
                KRecomms
            </h1>
            {!finished ? (
                <>
                    <div className="loading-animation">
                        <div className="dots">
                            {[...Array(dotsRemaining)].map((_, index) => (
                                <span key={index}></span>
                            ))}
                        </div>
                        <div
                            className="butterfly"
                            style={{
                                left: `${Math.min(progress, 95)}%`
                            }}
                        >
                            🦋
                        </div>
                    </div>
                    <p className="loading-text">
                        loading your movies...
                    </p>
                    <div className="percentage">
                        {progress}%
                    </div>
                </>
            ) : (

                <div className="enter-section">
                    <div className="big-butterfly">
                        🦋
                    </div>
                    <button
                        className="enter-button"
                        onClick={onEnter}
                    >
                        ENTER Krecomms
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoadingPage;