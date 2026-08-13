import React from "react";
import "./Navbar.css";
import DarkMode from "../DarkMode/DarkMode";
import Fire from "../../assets/fire.png";
import Star from "../../assets/star.png";
import Upcoming from "../../assets/upcoming.png";

const Navbar = () => {
    return (
        <nav className='navbar'>
            <h1>Catch A Break</h1>

            <div className='navbar_links'>
                <DarkMode />
                <a href='#popular'>
                    Popular{" "}
                    <img src={Fire} alt='fire emoji' className='navbar_emoji' />
                </a>
                <a href='#top_rated'>
                    Top Rated{" "}
                    <img src={Star} alt='star emoji' className='navbar_emoji' />
                </a>
                <a href='#upcoming'>
                    Upcoming{" "}
                    <img
                        src={Upcoming}
                        alt='upcoming emoji'
                        className='navbar_emoji'
                    />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;