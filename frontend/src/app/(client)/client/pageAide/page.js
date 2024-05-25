import React from 'react'
async function getData() { 
 const res = await 
fetch('https://apigenerator.dronahq.com/api/reUmzrE7/questionsReponses')
 
 if (!res.ok) { 
 throw new Error('Failed to fetch data') 
 } 
 
 return res.json() 
 } 
const page = async() => { 
 const data = await getData() 
 return ( 
 <>
 <h1>Questions fréquentes</h1>
 {data && data.length>0 && data.map((res,i)=> <div className="p-3 border 
bg-light" key={i}>
 <div className="card">
 <div className="card-header"> {res.question}</div> 
 <div className="card-body"> {res.reponse}</div> 
 </div>
 </div>
 )}
 </>
 ) 
} 
export default page