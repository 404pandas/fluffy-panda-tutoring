import { HighscoreDetails } from "../interfaces/HighScoreDetails";
import Auth from "../utils/auth";

// all highscores for everyone
const retrieveHighscores = async () => {
  try {
    const response = await fetch("/api/highscore/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

// highscore by user id
const retrieveHighScoresByUser = async (
  userId: number | null
): Promise<HighscoreDetails> => {
  try {
    const response = await fetch(`/api/highscore/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Could not invalid API response, check network tab!");
    }
    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return Promise.reject("Could not fetch highscores by user");
  }
};

//  update highscore by user id
const updateHighscore = async (
  userId: number,
  body: HighscoreDetails
): Promise<HighscoreDetails> => {
  try {
    const response = await fetch(`/api/highscore/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.error("Update did not work", err);
    return Promise.reject("Update did not work");
  }
};

export { retrieveHighScoresByUser, retrieveHighscores, updateHighscore };
