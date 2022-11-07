import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import { useStore } from "../hooks/useStore";

export function Navbar() {
  const { page, setPage } = useStore();

  return (
    <BottomNavigation
      showLabels
      value={page}
      onChange={(event, newValue) => {
        setPage(newValue);
      }}
    >
      <BottomNavigationAction icon={<PhotoCameraIcon />} />
      <BottomNavigationAction icon={<VideoLibraryIcon />} />
      <BottomNavigationAction icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}
