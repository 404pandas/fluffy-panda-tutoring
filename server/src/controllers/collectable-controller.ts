import { Request, Response } from 'express';
import { User } from '../models/user.js';

export const getCollectables = async (_req: Request, res: Response) => {
    try {
        const collectables = await User.findAll({
            attributes: ['username', 'collectables']
        });
        res.status(200).json(collectables);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

}

export const getCollectablesByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const collectables = await User.findByPk(id, { attributes: ['username', 'collectables'] });

        if(collectables){
            res.json(collectables);
        } else{
            res.status(404).json({message: 'No collectables found'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
}

export const updateCollectable = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const data = req.body;
    try{
        const user = await User.findByPk(id,{attributes:['id','username','collectables']});
        if(user){
           if(user.collectables !== undefined){
            if(user.collectables){
                user.collectables.push(data)
            }
           }
           
            await user.save({fields:['collectables']});
            res.json(user);
        } else{
            res.status(404).json({ message: 'collectable not found.' });
        }
    } catch(error: any){
        res.status(500).json({message: error.message});
    }
}