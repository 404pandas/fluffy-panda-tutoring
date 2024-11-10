import { Request, Response } from 'express';
import { User } from '../models/user.js';

export const getHighscores = async (_req: Request, res: Response) => {
  try {
    const highscores = await User.findAll({
      attributes: ['username', 'highscoreDetails']
    });
    res.json(highscores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const getHighscoreById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const highscore = await User.findByPk(id, {
        attributes: ['username', 'highscoreDetails']
        });
        if (highscore) {
        res.json(highscore);
        } else {
        res.status(404).json({ message: 'Highscore not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
 }

 export const updateHighscore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { highscoreDetails } = req.body;
    try {
        const highscore = await User.findByPk(id, {
          attributes: ['id','username', 'highscoreDetails', 'oldHighscores']
          });
        if (highscore) {
            const oldHighscore = highscore.highscoreDetails;
            highscore.highscoreDetails = highscoreDetails;
            if(oldHighscore !== undefined) {
              if (highscore.oldHighscores) {
                highscore.oldHighscores.push(oldHighscore);
              }
            }

            await highscore.save({fields: ['highscoreDetails', 'oldHighscores']});
            res.json({highscore});
        } else {
        res.status(404).json({ message: 'Highscore not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

