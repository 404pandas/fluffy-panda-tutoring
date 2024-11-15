import { Request, Response } from 'express';
import { User } from '../models/user.js';

export const getCollectables = async (_req: Request, res: Response) => {
    try {
        const collectables = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(collectables);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }

}

export const getCollectablesByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const collectables = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

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
    console.log("data");
    try{
        console.log(data);
        const user = await User.findByPk(id,{
            attributes: { exclude: ['password'] }
        });
        if(user){
            console.log(user.collectables);
           if(user.collectables !== undefined){
                console.log('collectables not undefined');
                user.collectables.push(data)
                user.changed('collectables', true);
           }         
            await user.save();
            res.json(user);
        } else{
            res.status(404).json({ message: 'collectable not found.' });
        }
    } catch(error: any){
        res.status(500).json({message: error.message});
    }
}