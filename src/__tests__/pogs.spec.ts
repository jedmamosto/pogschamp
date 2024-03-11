import { PrismaClient } from '@prisma/client';
import supertest from 'supertest';

const prisma = new PrismaClient();

const apiURL = process.env.POSTGRES_HOST ?? 'http://localhost:3000';
const app = supertest(apiURL);

describe("Pogs", () => {
  it("should fail because these are duplicates - it bypasses the unique identifier in the schema", async () => {
    try {
      await prisma.pogs.createMany({
        data: [
          {
            name: "pogger",
            ticker_symbol: "POG",
            price: 1000,
            color: "red"
          },
          {
            name: "nobber",
            ticker_symbol: "NOOB",
            price: 10,
            color: "gray"
          },
          {
            name: "robber",
            ticker_symbol: "ROBB",
            price: 9990,
            color: "green"
          },
        ]
      });

      const res = await app.get('/api/pogs');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3);

      await prisma.pogs.deleteMany();
    } catch (error) {

      console.error('Test failed:', error);
      throw error;
    }
  }, 100000);

  it("should succeed", async () => {
    try {
      await prisma.pogs.createMany({
        data: [
          {
            name: "ruby",
            ticker_symbol: "RUB",
            price: 20,
            color: "red"
          },
          {
            name: "doby",
            ticker_symbol: "DOB",
            price: 100,
            color: "pink"
          },
          {
            name: "kobe",
            ticker_symbol: "KOB",
            price: 908,
            color: "green"
          },
        ]
      });

      const res = await app.get('/api/pogs');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3);

      await prisma.pogs.deleteMany();
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  }, 100000);
});
