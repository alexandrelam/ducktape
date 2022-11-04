import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  page: number;
  setPage: (value: number) => void;
};
export function Navbar({ page, setPage }: Props) {
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
