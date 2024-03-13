import { Request, Response } from "express";
import { fetchQuotes } from "../src/controller/post.controller";
import {fetchBestThreeQuotes} from "../src/controller/get.controller"
import { sequelize, Users, Cars, Quotes, CarQuotes } from "../src/config/db";


beforeAll(async() => {
  await sequelize.authenticate()
});


describe("fetchQuotes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save User, Car, and Quotes data", async () => {
    const req: Request = {
      body: {
        email: "johndoe@gmail.com",
        fullName: "John Doe",
        dob: "1990-01-01",
        driveStartDate: "2020-01-01",
        carMake: "Toyota",
        carModel: "Camry",
        vin: "123456789",
        milesDriven: "0-10,000",
      },
    } as any;

    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    
    await fetchQuotes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User, Car and Quotes data has been saved',
    });

  });

  it("should return not saved", async () => {
    const req: Request = {
      body: {
      },
    } as any;

    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    
    await fetchQuotes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Could not save data',
    });

  });


    it("should save user and car info, but not quotes", async () => {
      const req: Request = {
        body: {
          email: "johndoe@gmail.com",
          fullName: "John Doe",
          dob: "1990-01-01",
          driveStartDate: "2020-01-01",
          carMake: "Toyota",
          carModel: "Camry",
          vin: "123456789",
          milesDriven: "x"
        },
      } as any;
  
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;
  
      
      await fetchQuotes(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Could not save Quotes',
      });
  
  });

  
});


describe("fetchBestThreeQuotes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return best 3 quotes", async () => {
    const req: Request = {
      query: {
        vin: '123456789'
      },
    } as any;

    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    
    await fetchBestThreeQuotes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return invalid data", async () => {
    const req: Request = {
      query: {
        vin: 'x'
      },
    } as any;

    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    
    await fetchBestThreeQuotes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid Car or User data',
    });

  });
  
});
