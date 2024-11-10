export interface HighscoreDetails {
  baseScore: number;
  difficultyFactors: DifficultyFactors;
  successfulMoves: number;
  codeComplexityBonus: number;
  alternateDirectionsBonus: number;
  gameName: string;
  gameImage: string;
  totalScore: number;
  rank: number;
  date: string;
}

export interface DifficultyFactors {
  lanes: number;
  obstacleType: ObstacleType;
  obstacleSpeedBonus: number;
}

export interface ObstacleType {
  static: number;
  animated: number;
}
