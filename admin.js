// "use strict"

// const url = "https://emp-mngmnt.vercel.app/getdata"

// const getempdata = async()=>{
//     try {
//         const responnse = await fetch(url,{
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//         const data = await responnse.json()
//         console.log(data)
//         return{
//             status: responnse.status,
//             data: data
//         }
//     } catch (error) {
//         console.error("Error fetching employee data:", error);
//         return {
//             status: 500,
//             error: 'Failed to fetch employee data'
//         };
//     }
// }

// export default getempdata;

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getempdata = async (req, res) => {
  if (req.method.toLowerCase() === 'get') {
    try {
      const employees = await prisma.user.findMany();
      return res.status(200).json(employees);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      return res.status(500).json({ error: 'Failed to fetch employee data' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default getempdata;
