import { Router } from "express";
//import controllers
import { getCollectables,getCollectablesByID, updateCollectable } from "../../controllers/collectable-controller.js";

const router = Router();

//GET all user Collectables /collectables
router.get('/', getCollectables);
//GET user collectables by id
router.get('/:id',getCollectablesByID);

//Add new collectable to user
router.put('/:id',updateCollectable)


export default router;