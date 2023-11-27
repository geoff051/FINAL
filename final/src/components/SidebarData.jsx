import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';


export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/adminHomepage"
    },
    {
        title: "Class List",
        icon: <SchoolIcon />,
        link: "/classListAdmin"
    },
    {
        title: "Students",
        icon: <Diversity3Icon />,
        link: "/studentListAdmin"
    },
    {
        title: "Teacher",
        icon: <SupervisorAccountIcon />,
        link: "/teacherList"
    },
    {
        title: "Admin registration",
        icon: <AdminPanelSettingsIcon />,
        link: "/createAdminAccount"
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        onClick: () => {
            // Your logout logic here
            localStorage.removeItem('token');
            window.location.pathname = "/"; // Redirect to the login page
        }
    }
]