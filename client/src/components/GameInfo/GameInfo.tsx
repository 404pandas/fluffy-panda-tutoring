import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { UserData } from "../../interfaces/UserData";
import { HighscoreDetails } from "../../interfaces/HighscoreDetails";

interface GameInfoProps {
  user: UserData;
  game: HighscoreDetails;
}

const GameInfo: React.FC<GameInfoProps> = ({ user }) => {
  const knockedDown = true;
  const hasntPlayedRecently = true;

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Grid container spacing={2}>
        {/* Left: Game Image */}
        <Grid size={3}>
          <Box
            component='img'
            src={`/path/to/${user.highScores[0]?.gameImage}`} // Display first game image
            alt={`${user.highScores[0]?.gameName}`}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
          <Typography variant='h6' fontWeight='bold'>
            {user.highScores[0]?.gameName}
          </Typography>
        </Grid>

        {/* Right: Top Scores */}
        <Grid size={9}>
          <Typography variant='h6' fontWeight='bold'>
            Top Scores
          </Typography>
          <Box>
            {user.highScores.map((score, index) => (
              <Typography key={index} variant='body2'>
                #{score.rank} - {score.totalScore} (on {score.date})
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Conditional Row: Knocked Down */}
        {knockedDown && (
          <Grid size={12}>
            <Box
              sx={{
                padding: 2,
                backgroundColor: "warning.light",
                borderRadius: 2,
                textAlign: "center",
                boxShadow: 2,
              }}
            >
              <Typography variant='body2'>
                Uh Oh! You've been knocked down from #1 to #3!{" "}
                <Link
                  to='/domtraversal'
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  Play again?
                </Link>
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Conditional Row: Hasn’t Played Recently */}
        {hasntPlayedRecently && (
          <Grid size={12}>
            <Box
              sx={{
                padding: 2,
                backgroundColor: "info.light",
                borderRadius: 2,
                textAlign: "center",
                boxShadow: 2,
              }}
            >
              <Typography variant='body2'>
                Uh Oh! It looks like you haven't played this game since 10/1/24.{" "}
                <Link
                  to='/domtraversal'
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  Play again?
                </Link>
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default GameInfo;
