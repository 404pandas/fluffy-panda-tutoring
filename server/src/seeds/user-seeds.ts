import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password', highscoreDetails: { baseScore: 0, difficultyFactors: { lanes: 0, obstacleType: { static: 0, animated: 0 }, obstacleSpeedBonus: 0 }, successfulMoves: 0, codeComplexityBonus: 0, alternateDirectionsBonus: 0, totalScore: 0 } },
    { username: 'SunnyScribe', password: 'password', highscoreDetails: { baseScore: 0, difficultyFactors: { lanes: 0, obstacleType: { static: 0, animated: 0 }, obstacleSpeedBonus: 0 }, successfulMoves: 0, codeComplexityBonus: 0, alternateDirectionsBonus: 0, totalScore: 0 } },
    { username: 'RadiantComet', password: 'password', highscoreDetails: { baseScore: 0, difficultyFactors: { lanes: 0, obstacleType: { static: 0, animated: 0 }, obstacleSpeedBonus: 0 }, successfulMoves: 0, codeComplexityBonus: 0, alternateDirectionsBonus: 0, totalScore: 0 } },
  ], { individualHooks: true });
};
