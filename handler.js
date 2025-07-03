// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const {
//         name,
//         email,
//         department,
//         salary,
//         entryTime,
//         exitTime,
//         position,
//         workingOn,
//       } = req.body;

//       const user = await prisma.user.create({
//         data: {
//           name,
//           email,
//           department,
//           salary: Number(salary),
//           entryTime: new Date(entryTime),
//           exitTime: exitTime ? new Date(exitTime) : null,
//           position,
//           workingOn,
//         },
//       });

//       res.status(201).json(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to create user' });
//     } finally {
//       await prisma.$disconnect();
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }


const getdata = async(req,res)=>{
  const body = req.body
  console.log("body of the data is : line : ",body)
  const { name, email, department, salary, entryTime, exitTime, position, workingOn } = body;
  try {
    if(!name || !email || !department || !salary || !entryTime || !position){
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const method = req.method
    if(method === 'post'){
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
      res.status(201).json(user);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
module.exports = getdata;