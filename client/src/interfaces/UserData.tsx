import { HighscoreDetails } from "./HighScoreDetails";
export interface UserData {
  id: number;
  username: string;
  highScores: [HighscoreDetails];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  profilePicture: string;
}
