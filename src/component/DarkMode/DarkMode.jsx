import React, { useState } from "react";
import "./DarkMode.css";
import Sun from "./Sun.svg?react";
import Moon from "./Moon.svg?react";

const DarkMode = () => {
    const [isLight, setIsLight] = useState(false);

    const handleThemeChange = () => {
        const newTheme = !isLight;
        setIsLight(newTheme);

        document.documentElement.setAttribute(
            "data-theme",
            newTheme ? "light" : "dark"
        );
    };

    return (
        <div className="dark_mode">
            <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                checked={isLight}
                onChange={handleThemeChange}
            />

            <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;