import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

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
    }
]