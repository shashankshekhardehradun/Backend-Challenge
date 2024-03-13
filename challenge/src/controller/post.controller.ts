import { Request, Response } from "express";
import { sequelize, Users, Cars, Quotes, CarQuotes } from "../config/db";

export const fetchQuotes = async (req: Request, res: Response) => {
    const { email, fullName, dob, driveStartDate, carMake, carModel, vin, milesDriven } = req.body;

    try {
        let [userInstance, createdUser ] = await Users.findOrCreate({
            where: { email },
            defaults: { fullName, dob, driveStartDate }
        });

        let [ carInstance, createdCar ] = await Cars.findOrCreate({
            where: { vin },
            defaults: { carMake, carModel, milesDriven, userId: userInstance.dataValues.id}
        })

        try{
            const mockResponse = await fetch(`http://localhost:4000/${milesDriven}`);
            const results = await mockResponse.json();

            for (const result of results) {
                let [ quoteInstance, createdQuote ] = await Quotes.findOrCreate({
                    where: { uniqueID: result.uniqueID },
                    defaults: { insuranceCompany: result.insuranceCompany, 
                        coverageType: result.coverageType, 
                        limit: result.limit,
                        deductible: result.deductible, 
                        premium: result.premium }
                });

                await CarQuotes.findOrCreate({
                    where: {
                        CarId: carInstance.dataValues.id,
                        QuoteId: quoteInstance.dataValues.id
                    },
                    defaults: {
                        CarId: carInstance.dataValues.id,
                        QuoteId: quoteInstance.dataValues.id
                    }
                    
                });
            }
            return res.status(200).json({ message: 'User, Car and Quotes data has been saved' });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Could not save Quotes' });

        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Could not save data' });
    }
}