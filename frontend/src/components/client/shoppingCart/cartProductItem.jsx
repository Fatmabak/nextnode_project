"use client";
import React,{ useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useShoppingCart } from "use-shopping-cart" ;
const CartProductItem= ({product})=> {
const { addItem } = useShoppingCart();
const [quantity, setQuantity] = useState(1);
const decreaseQuantity = () => {
if (quantity > 1) {
setQuantity(quantity - 1);
}
};
const increaseQuantity = () => {
setQuantity(quantity + 1);
};
const addToCart = (product) => {
const target = {
id:product._id,
title: product.designation,
image: product.imageart,
price : product.prix
};
if(quantity<product.qtestock){
addItem(target, { count: quantity }).then((()=>{
console.log('Item added to cart:', target);
setQuantity(1)
})).catch((err)=>{console.log(err)})
}
else window.alert("Not Enough Stock")
};
return (
<article className="col-sm-3 mt-5">
<div className="card">
<img
src={product?.imageart}
className="card-img-top p-5"
alt={product.designation}
/>
</div>
<div className="text-center">
<div>{product.designation.substr(0,20)} ...</div>
<div>Prix : {product.prix} TND </div>
<div className="flex flex-col items-center justify-center">
<div className="flex"> <Rating style={{ maxWidth: 100 }} value={5} />
</div>
</div>
</div>
<div className="text-center">
<button className="mr-5"
onClick={decreaseQuantity}
>
-
</button>
<span>{quantity}</span>
<button className="ml-5"
onClick={increaseQuantity}
>
+
</button>
</div>
<div className="text-center">
<button className="btn btn-warning" disabled={product.qtestock <= 1}
onClick={() => addToCart(product)}>
Add to cart
</button>
</div>
</article>
);
}
export default CartProductItem;
