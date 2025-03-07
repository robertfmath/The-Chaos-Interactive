import { Box, Link, List, ListItem, Paper, Typography } from "@mui/material";

const ApplicationInfo = () => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: "1rem", borderRadius: "10px" }}
      data-testid="application-info"
    >
      <Box data-testid="introduction">
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography component="span" sx={{ fontStyle: "italic" }}>
            The Chaos
          </Typography>
          <Typography component="span">
            {" "}
            by Gerard Nolst Trenité is a poem that humorously highlights the
            many irregularities and inconsistencies in English pronunciation.
            For more information, see{" "}
            <Link
              href="https://ncf.idallen.com/english.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </Link>
            .
          </Typography>
        </Box>
        <Typography sx={{ marginBottom: "1rem" }}>
          In this interactive version of the poem, you can click on any blue
          word and hear its pronunciation. Hovering over the word reveals a
          button that links to its definition in the Merriam-Webster dictionary.
        </Typography>
      </Box>

      <Box data-testid="notes">
        <Typography sx={{ marginBottom: "0.5rem" }}>A few notes:</Typography>
        <List sx={{ listStyle: "decimal", pl: 4 }}>
          <ListItem sx={{ display: "list-item", pl: 1 }}>
            <Typography>
              Due to the interactive nature of this website, it is best
              experienced on a monitor rather than a phone or tablet.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 1 }}>
            <Typography>
              Words are pronounced using the browser&apos;s Web Speech API,
              which has limitations. To ensure accurate pronunciation, some
              words have been replaced with phonetic equivalents behind the
              scenes (e.g.,{" "}
              <Typography component="span" sx={{ fontStyle: "italic" }}>
                wind
              </Typography>{" "}
              was mapped to{" "}
              <Typography component="span" sx={{ fontStyle: "italic" }}>
                wined
              </Typography>
              ). These adjustments follow General American English.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 1 }}>
            <Typography>
              Because of these phonetic substitutions, using voices from other
              dialects (e.g., British English) may lead to inaccurate
              pronunciations. In fact, this application was validated
              exclusively with the &quot;Google US English&quot; voice, so
              accuracy with any other voice cannot be guaranteed. The Google US
              English voice is typically available on desktop Chrome browsers.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 1 }}>
            <Typography>
              Some words could not be correctly pronounced by the Google US
              English voice, even with phonetic tweaks. These words are
              underlined with a dotted red line; hovering over them will display
              a phonemic respelling from their Merriam-Webster dictionary entry.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 1 }}>
            <Typography>
              Some speakers, particularly Bluetooth speakers, may cut off the
              beginning of each word&apos;s pronunciation due to audio latency.
              If this occurs, consider using an alternative audio source (such
              as headphones).
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
};

export default ApplicationInfo;
