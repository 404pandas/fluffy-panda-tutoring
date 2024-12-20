import { HighscoreDetails } from "./HighScoreDetails";
import { CollectableDetails } from "./CollectableDetails";
export interface UserData {
  id: number;
  username: string;
  avatar: string;
  highScores: HighscoreDetails[];
  collectables: CollectableDetails[];
  createdAt: string; // ISO date string
}
