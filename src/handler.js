"use strict";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getdata = async (req, res) => {
  const body = req.body;
  console.log("body of the data is : line : ", body);

  const { name, email, department, salary, entryTime, exitTime, position, workingOn } = body;

  try {
    if (!name || !email || !department || !salary || !entryTime || !position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const method = req.method.toLowerCase();

    if (method === 'post') {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          department,
          salary: Number(salary),
          entryTime: new Date(entryTime),
          exitTime: exitTime ? new Date(exitTime) : null,
          position,
          workingOn,
        },
      });

      console.log("User created successfully:", user);
      return res.status(201).json(user);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: 'Failed to create user' });
  } finally {
    await prisma.$disconnect();
  }
};

export default getdata;

