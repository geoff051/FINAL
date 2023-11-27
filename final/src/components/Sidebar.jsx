// Sidebar.jsx
import React from "react";
import "./Sidebar.css"
import { SidebarData } from "./SidebarData";

function Sidebar() {
    const handleItemClick = (link, onClick) => {
        window.location.pathname = link;
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarData.map((val, key) => (
                    <li
                        key={key}
                        className="row"
                        id={window.location.pathname === val.link ? "active" : ""}
                        onClick={() => handleItemClick(val.link, val.onClick)}
                    >
                        <div id="icon">{val.icon}</div>
                        <div id="title">{val.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
