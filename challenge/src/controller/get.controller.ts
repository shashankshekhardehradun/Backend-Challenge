import { Request, Response } from "express";
import { sequelize, Users, Cars, Quotes, CarQuotes } from "../config/db";

export const fetchBestThreeQuotes = async (req: Request, res: Response) => {
    try{
        const vin = req.query.vin as string; 
        const carInstance = await Cars.findOne({ attributes: ['id'], where: { vin }});
        const carQuotesInstance = await CarQuotes.findAll({ attributes: ['QuoteId'],  
                    where: {CarId: carInstance.dataValues.id}});

        const quoteIds = carQuotesInstance.map(value => value.dataValues.QuoteId);

        const quotes = await Quotes.findAll({ 
            where: { id: quoteIds },
            order: [['premium', 'ASC']],
            limit: 3
        });
                       
        return res.status(200).json(quotes);

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Invalid Car or User data"});
    }
}