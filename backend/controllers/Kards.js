import Kard from '../models/KardModel.js';

export const getKards = async(req, res) => {
    try {
        const kards = await Kard.findAll();
        res.status(200).json(kards);
    } catch (error) {
        console.log(error.message);
    }
}