import { Typography } from "antd";
import ResponsiveAppBar from "./components/appbar.js";
import Box from "@mui/material/Box";
import SwiperFunction from "./components/swiper.js";

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      {/* <div
        className="webpage"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "91vh",
        }}
      >
        <Box
          height={500}
          width={650}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{
            border: "2px solid grey",
            borderRadius: 2,
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography>AHHHHHH</Typography>
          </div>
        </Box>
      </div> */}
      <SwiperFunction />
    </>
  );
}
