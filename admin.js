"use strict"

const url = "https://emp-mngmnt.vercel.app/getdata"

const getempdata = async()=>{
    try {
        const responnse = await fetch(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await responnse.json()
        console.log(data)
        return{
            status: responnse.status,
            data: data
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
        return {
            status: 500,
            error: 'Failed to fetch employee data'
        };
    }
}

export default getempdata;