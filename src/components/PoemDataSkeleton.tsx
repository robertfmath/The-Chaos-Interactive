import { Box, Skeleton } from "@mui/material";

const PoemDataSkeleton = () => {
  const lineWidthsPixels = [
    202, 229, 194, 320, 190, 272, 240, 232, 220, 261, 263, 206, 259, 235, 237,
    238, 229, 264, 217, 313,
  ];
  return (
    <Box data-testid="poem-data-skeleton">
      {Array.from({ length: 5 }).map((_, outerIndex) => (
        <Box key={outerIndex} sx={{ mb: "2rem" }}>
          {Array.from({ length: 4 }).map((_, innerIndex) => (
            <Box key={innerIndex} sx={{ py: "0.5rem", width: "429px" }}>
              <Skeleton
                height={24}
                width={`${(lineWidthsPixels[outerIndex * 4 + innerIndex] / 429) * 100}%`}
                sx={{
                  ml: innerIndex === 2 || innerIndex === 3 ? "2em" : undefined,
                }}
                data-testid="line-data-skeleton"
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default PoemDataSkeleton;
