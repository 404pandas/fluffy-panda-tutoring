import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CollectableProps {
  image: string;
  altDescription: string;
  name: string;
  dateEarned: number;
  details: string;
}
const CollectableComponent: React.FC<CollectableProps> = ({
  image,
  altDescription,
  name,
  dateEarned,
  details,
}) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        padding: 2,
        textAlign: "center",
        boxShadow: 2,
      }}
    >
      <Box
        component='img'
        src={`/path/to/${image}`}
        alt={altDescription}
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 2,
          boxShadow: 1,
        }}
      />
      {/* todo- turn into tooltip */}
      <Typography variant='subtitle1' fontWeight='bold'>
        {name}
      </Typography>
      <Typography variant='body2'>Earned on: {dateEarned}</Typography>
      <Typography variant='body2'>{details}</Typography>
    </Box>
  );
};

export default CollectableComponent;
