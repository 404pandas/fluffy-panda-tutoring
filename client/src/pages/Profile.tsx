import React from "react";
import { useEffect, useLayoutEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import GameInfo from "../components/GameInfo/GameInfo";
import ErrorPage from "./ErrorPage";

import { JwtPayload } from "jwt-decode";
// interfaces
import { UserData } from "../interfaces/UserData";

// needed api calls
import { retrieveUser } from "../api/userAPI";

import auth from "../utils/auth";
import CollectableComponent from "../components/Collectable/Collectable";
import TooltipComponent from "../components/ToolTip/ToolTip";

interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
}

const ProfilePage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] =
    React.useState<CustomJwtPayload | null>(null);
  const [userData, setUserData] = React.useState<UserData>({
    id: 0,
    username: "",
    avatar: "",
    createdAt: "",
    highScores: [],
    collectables: [],
  });
  const [error, setError] = React.useState(false);
  const [loginCheck, setLoginCheck] = React.useState(false);

  // Check login status and set user profile
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  // UseEffect to run only when loggedInUser changes
  useEffect(() => {
    if (loggedInUser?.username) {
      console.log("test");
      fetchUserInfo(loggedInUser.username);
    }
  }, [loggedInUser]);

  // Function to check login status
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
      const userProfile = auth.getProfile();
      if (userProfile) {
        setLoggedInUser(userProfile as CustomJwtPayload);
        console.log("Logged in user: ", userProfile);
        console.log(loggedInUser);
      } else {
        console.error("Invalid user profile data: ", userProfile);
      }
    }
  };

  // Function to fetch user information
  const fetchUserInfo = async (username: string) => {
    try {
      const data = await retrieveUser(username);
      console.log(data);
      setUserData(data);
      console.log(userData);
    } catch (err) {
      console.error("Failed to retrieve user data:", err);
      setError(true);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

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
        {userData.highScores?.map((game, index) => (
          <GameInfo key={index} game={game} user={userData} />
        ))}
        <Typography variant='h5' gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant='body2' gutterBottom>
          Stay tuned for more games!
        </Typography>
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
            <Typography variant='body2' color='text.secondary'>
              General
            </Typography>
            <Grid container spacing={1}>
              {userData.collectables?.map((collectable, index) => (
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
                    <TooltipComponent title={collectable.collectableName}>
                      <CollectableComponent
                        image={collectable.collectableImage}
                        altDescription={collectable.collectableAltDescription}
                        name={collectable.collectableName}
                        dateEarned={collectable.dateEarned}
                        details={collectable.collectionDetails}
                      />
                    </TooltipComponent>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant='body2' color='text.secondary'>
              DOM Trav
            </Typography>
            <Grid container spacing={1}>
              {userData?.collectables?.map((collectable, index) => (
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
                      {collectable.collectionDetails}
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
