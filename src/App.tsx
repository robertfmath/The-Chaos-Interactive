import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import { Stanza as StanzaType } from "./types";
import { Box } from "@mui/material";
import Stanza from "./components/Stanza";
import Navbar from "./components/Navbar";
import Inputs from "./components/Inputs";
import ApplicationInfo from "./components/ApplicationInfo";
import PoemDataSkeleton from "./components/PoemDataSkeleton";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

function App() {
  const [poemData, setPoemData] = useState<StanzaType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPoemData = async () => {
      try {
        const response = await fetch("./poem.json");
        const json = (await response.json()) as StanzaType[];
        setPoemData(json);
      } catch (error) {
        console.error("Error loading poem JSON:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPoemData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "800px", xl: "auto" },
            width: { xs: "auto", xl: "600px" },
            position: { xl: "absolute", top: "6rem", left: "30px" },
          }}
        >
          <ApplicationInfo />
        </Box>
        <Box
          sx={{
            minWidth: "350px",
            maxWidth: "800px",
            width: { xl: "400px" },
            position: { xl: "fixed" },
            top: "6rem",
            right: "100px",
          }}
        >
          <Inputs />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ ml: { xl: "5rem" }, pt: "8px" }}>
            {!loading && poemData ? (
              poemData?.map((stanza, index) => (
                <Stanza lines={stanza.lines} key={index} />
              ))
            ) : (
              <PoemDataSkeleton />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
