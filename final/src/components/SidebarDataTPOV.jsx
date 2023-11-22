import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/teacherHomepage"
    },
      {
        title: "My Profile",
        icon: <AccountCircleIcon />,
        link: "/teacherInfoTeacher"
    },
    {
        title: "Class List",
        icon: <SchoolIcon />,
        link: "/classListTeacher"
    },
    {
        title: "Attendance Tracker",
        icon: <PlaylistAddCheckCircleIcon />,
        link: "/attendanceTracker"
    }
  
]