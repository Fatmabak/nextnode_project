import { NextResponse} from "next/server";
import {headers} from "next/headers";
import Stripe from 'stripe';
if (!process.env.STRIPE_SECRET_KEY) {
throw new Error('STRIPE_TEST_SECRET_KEY is missing. Please set the environment variable.');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req, res) {
const headersList = headers();
const {cartDetails} = await req.json();
const cartDetailsArray= Object.values(cartDetails);
const transformedItems = cartDetailsArray.map((item) => ({
price_data: {
currency: "usd",
product_data: {
name: item.title,
images: [item.image],
},
unit_amount: item.price * 100,
},
quantity: item.quantity,
}))
try {
const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
line_items: transformedItems,
mode: "payment",
success_url: `${headersList.get("origin")}/client/success`,
cancel_url: `${headersList.get("origin")}/`,
});
return NextResponse.json({url: session.url,sessionId: session.id });
} catch (err) {
console.log(err)
return NextResponse.json({error: "Error creating checkout session"});
}
}