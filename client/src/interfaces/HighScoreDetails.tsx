export interface HighscoreDetails {
  baseScore: number;
  difficultyFactors: {
    lanes: number;
    obstacleType: {
      static: number;
      animated: number;
    };
    obstacleSpeedBonus: number;
  };
  successfulMoves: number;
  codeComplexityBonus: number;
  alternateDirectionsBonus: number;
  totalScore: number;
}
