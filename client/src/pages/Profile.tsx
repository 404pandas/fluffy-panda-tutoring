import React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import GameInfo from "../components/GameInfo/GameInfo";
import { UserData } from "../interfaces/UserData";

const userData: UserData = {
  id: 1,
  username: "JohnDoe123",
  avatar: "/path/to/profile-picture.jpg",
  createdAt: "2024-10-01",
  highScores: [
    {
      gameName: "DOM Traversal",
      gameImage: "/path/to/dom-traversal-image.jpg",
      totalScore: 1500,
      rank: 1,
      date: "2024-09-30",
    },
    {
      gameName: "CSS Selectors",
      gameImage: "/path/to/css-selectors-image.jpg",
      totalScore: 1400,
      rank: 1,
      date: "2024-08-15",
    },
    {
      gameName: "Data Types",
      gameImage: "/path/to/data-types-image.jpg",
      totalScore: 1300,
      rank: 2,
      date: "2024-07-10",
    },
    {
      gameName: "DOM Tree",
      gameImage: "/path/to/dom-tree-image.jpg",
      totalScore: 1200,
      rank: 3,
      date: "2024-06-25",
    },
  ],
  collectables: [
    {
      collectableName: "Golden Key",
      collectableImage: "/path/to/golden-key.jpg",
      collectableAltDescription: "A key symbolizing mastery of DOM Traversal.",
      dateEarned: 20240620,
      gameName: "DOM Traversal",
      details:
        "Awarded for completing all levels of DOM Traversal in record time.",
    },
    {
      collectableName: "CSS Champion Badge",
      collectableImage: "/path/to/css-champion.jpg",
      collectableAltDescription: "Badge of excellence in CSS Selectors.",
      dateEarned: 20240815,
      gameName: "CSS Selectors",
      details: "Achieved by reaching rank 1 in CSS Selectors.",
    },
  ],
};

const ProfilePage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {/* Left Side: Game Info */}
      <Grid size={9}>
        <Typography variant='h4' gutterBottom>
          Games
        </Typography>
        <Typography variant='h5' gutterBottom>
          DOM Traversal
        </Typography>
        {userData.highScores.map((game, index) => (
          <GameInfo key={index} game={game} user={userData} />
        ))}
      </Grid>

      {/* Right Side: Profile Info */}
      <Grid size={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            src={userData.avatar}
            alt={userData.username}
            sx={{ width: 120, height: 120, marginBottom: 2 }}
          />
          <Typography variant='h5' fontWeight='bold'>
            {userData.username}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            User Since {userData.createdAt}
          </Typography>
          {/* todo- insert horizontal rule */}
          <Grid size={12}>
            <Typography variant='h6' fontWeight='bold' sx={{ marginTop: 2 }}>
              Collectables
            </Typography>
            <Grid container spacing={1}>
              {userData.collectables.map((collectable, index) => (
                // todo- turn into component
                <Grid key={index} size={4}>
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
                      src={`/path/to/${collectable.collectableImage}`}
                      alt={collectable.collectableAltDescription}
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    />
                    {/* todo- turn into tooltip */}
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {collectable.collectableName}
                    </Typography>
                    <Typography variant='body2'>
                      Earned on: {collectable.dateEarned}
                    </Typography>
                    <Typography variant='body2'>
                      {collectable.details}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
