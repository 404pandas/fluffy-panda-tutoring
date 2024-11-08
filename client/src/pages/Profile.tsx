import React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import GameInfo from "../components/GameInfo";
import { UserData } from "../interfaces/UserData";

const userData: UserData = {
  username: "JohnDoe123",
  userSince: "10/1/2024",
  profilePicture: "/path/to/profile-picture.jpg",
  gameStats: [
    {
      gameName: "DOM Traversal",
      timesPlayed: 45,
      timesWon: 20,
      shortestMoves: 10,
      mostRows: 15,
      highestRank: 1,
      scoreAtRank: 1500,
    },

    {
      gameName: "CSS Selectors",
      timesPlayed: 30,
      timesWon: 10,
      shortestMoves: 5,
      mostRows: 10,
      highestRank: 1,
      scoreAtRank: 1400,
    },
    {
      gameName: "Data Types",
      timesPlayed: 25,
      timesWon: 5,
      shortestMoves: 3,
      mostRows: 5,
      highestRank: 1,
      scoreAtRank: 1300,
    },
    {
      gameName: "DOM Tree",
      timesPlayed: 20,
      timesWon: 5,
      shortestMoves: 5,
      mostRows: 10,
      highestRank: 1,
      scoreAtRank: 1200,
    },
  ],
};

const ProfilePage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={2}>
        {/* Left Side: Game Info */}
        <Grid item xs={12} md={9}>
          <Typography variant='h4' gutterBottom>
            Games
          </Typography>
          {userData.highScores.map((game, index) => (
            <GameInfo key={index} game={game} />
          ))}
        </Grid>

        {/* Vertical Divider */}
        <Divider
          orientation='vertical'
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />

        {/* Right Side: Profile Info */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              src={userData.profilePicture}
              alt={userData.username}
              sx={{ width: 120, height: 120, marginBottom: 2 }}
            />
            <Typography variant='h5' fontWeight='bold'>
              {userData.username}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              User Since {userData.createdAt}
            </Typography>
            <Typography variant='h6' marginTop={2} marginBottom={1}>
              Game Stats
            </Typography>
            {userData.highScores.length > 0 && (
              <>
                <Typography variant='body2'>
                  Favorite Game: {userData.highScores[0].gameName}
                </Typography>
                <Typography variant='body2'>
                  Total Games Played:{" "}
                  {userData.highScores[0].reduce(
                    (total, game) => total + game.timesPlayed,
                    0
                  )}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
