import { AppBar, Box, Button, Typography, Link } from "@mui/material";
import { alpha } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";

const Navbar = () => {
  console.log(window.innerWidth);
  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({
        diplay: "flex",
        padding: "0.5rem",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.background.default, 0.7),
        backdropFilter: "blur(8px)",
      })}
    >
      <Typography
        component="h1"
        sx={{
          width: "100%",
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "1.5rem", xl: "2rem" },
          color: "text.primary",
        }}
      >
        The Chaos — Interactive
      </Typography>
      <Box sx={{ position: "absolute", right: "20px" }}>
        <Link
          href="https://www.github.com/robertfmath/The-Chaos-Interactive"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              padding: { xs: "3px", xl: "6px" },
              minWidth: "0",
              minHeight: "0",
              color: "text.primary",
              borderColor: "text.primary",
              borderRadius: "8px",
            }}
          >
            <GitHubIcon />
          </Button>
        </Link>
      </Box>
    </AppBar>
  );
};

export default Navbar;
