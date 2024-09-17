/* eslint-disable react/no-children-prop */
import { Outlet } from "react-router-dom";
import DisplayComponent from "../components/DisplayComponent";
import { Box } from "@mui/material";
const AppPageLayout = () => {
  return (
    <Box>
      <DisplayComponent children={<Outlet />} />
    </Box>
  );
};
export default AppPageLayout;
