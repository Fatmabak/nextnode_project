const ORDER_API="/orders/"

export const addOrder=async(objectOrder)=> {
const res = await fetch(process.env.API_URL+ORDER_API, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(objectOrder),
});
const response = await res.json();
return response;
}
export const fetchArticles=async()=> {
    const res = await fetch(process.env.API_URL+ARTICLE_API, { cache: 'no-store'
    })
    const response=await res.json()
    return response;
    }
    export const fetchOrders = async () => { // Ajout de la fonction fetchOrders
        const res = await fetch(process.env.API_URL + ORDER_API);
        const response = await res.json();
        return response;
      };
export const updateOrder=async(id,status) =>{
        const res = await fetch(process.env.API_URL+ORDER_API+`${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"status":status}),
        });
        const response = await res.json();
        return response;
        }
export const deleteOrder=async(id) =>{
            const res = await fetch(process.env.API_URL+ORDER_API+`${id}`,{
            method: 'DELETE'
            });
            const response = await res.json();
            return response;
            }
