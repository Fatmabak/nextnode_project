import React from "react";
import CartProductItem from
'@/components/client/shoppingCart/cartProductItem';
import {fetchArticles} from "@/services/ArticleService";
async function getProducts(){
const data=await fetchArticles()
return data;
}
const CartProductsPage= async ()=> {
const products = await getProducts();
return (
<>
<div className="row">
{products && products?.map((product) => (
<CartProductItem key={product?._id} product={product} />
))}
</div>
</>
)
}
export default CartProductsPage;