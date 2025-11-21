// // app/api/create-subscription/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]/route"; // adjust path if needed
// import Stripe from "stripe";
// import fetch from "node-fetch";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Not signed in" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { paymentMethod } = body;

//     if (!paymentMethod) {
//       return NextResponse.json({ error: "Payment method required" }, { status: 400 });
//     }

//     // Example: $5/month subscription
//     const priceInCents = 500;

//     if (paymentMethod === "stripe") {
//       // Create Stripe Checkout session
//       const stripeSession = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "subscription",
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: "Exclusive Membership",
//               },
//               unit_amount: priceInCents,
//               recurring: { interval: "month" },
//             },
//             quantity: 1,
//           },
//         ],
//         customer_email: session.user.email,
//         success_url: `${req.headers.get("origin")}/membership/success`,
//         cancel_url: `${req.headers.get("origin")}/membership/cancel`,
//       });

//       return NextResponse.json({ url: stripeSession.url });
//     }

//     if (paymentMethod === "paypal") {
//       // Create PayPal subscription
//       const authResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
//         method: "POST",
//         headers: {
//           "Authorization": `Basic ${Buffer.from(
//             `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
//           ).toString("base64")}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: "grant_type=client_credentials",
//       });

//       const authData = await authResponse.json();
//       const accessToken = authData.access_token;

//       // Create subscription
//       const paypalResponse = await fetch(
//         "https://api-m.sandbox.paypal.com/v1/billing/subscriptions",
//         {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             plan_id: process.env.PAYPAL_PLAN_ID, // create a recurring plan in PayPal dashboard first
//             subscriber: {
//               name: {
//                 given_name: session.user.name || "User",
//                 surname: "Member",
//               },
//               email_address: session.user.email,
//             },
//             application_context: {
//               brand_name: "TeachTudor",
//               user_action: "SUBSCRIBE_NOW",
//               return_url: `${req.headers.get("origin")}/membership/success`,
//               cancel_url: `${req.headers.get("origin")}/membership/cancel`,
//             },
//           }),
//         }
//       );

//       const paypalData = await paypalResponse.json();
//       return NextResponse.json({ url: paypalData.links.find(l => l.rel === "approve").href });
//     }

//     return NextResponse.json({ error: "Unsupported payment method" }, { status: 400 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


//code 2  preliminary
// import Stripe from "stripe";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
//     }

//     const body = await req.json();
//     const { paymentMethod, email } = body;

//     // Stripe (Credit/Debit + PIX)
//     if (paymentMethod === "stripe") {
//       const checkoutSession = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "subscription",
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: { name: "Exclusive Membership" },
//               unit_amount: 500, // $5.00 in cents
//               recurring: { interval: "month" },
//             },
//             quantity: 1,
//           },
//         ],
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//         customer_email: email,
//       });

//       return new Response(JSON.stringify({ url: checkoutSession.url }), { status: 200 });
//     }

//     // PayPal (redirect)
//     if (paymentMethod === "paypal") {
//       // You would normally use the PayPal SDK here
//       // For now, simulate redirect to a PayPal payment page
//       const paypalLink = "https://www.paypal.com/ncp/payment"; // placeholder
//       return new Response(JSON.stringify({ url: paypalLink }), { status: 200 });
//     }

//     // Western Union / Other — manual handling
//     if (paymentMethod === "western" || paymentMethod === "other") {
//       // Here you can send an email with instructions
//       return new Response(
//         JSON.stringify({
//           message: "Payment instructions will be sent to your email shortly.",
//         }),
//         { status: 200 }
//       );
//     }

//     return new Response(JSON.stringify({ error: "Invalid payment method" }), { status: 400 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
//   }
// }


//code 3 WHEN YOU GET THOSE VIEWS ACTIVATE THIS CODE:
// import Stripe from "stripe";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import paypal from "@paypal/checkout-server-sdk";

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Initialize PayPal environment
// const payPalClient = new paypal.core.PayPalHttpClient(
//   new paypal.core.SandboxEnvironment(
//     process.env.PAYPAL_CLIENT_ID,
//     process.env.PAYPAL_CLIENT_SECRET
//   )
// );

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
//     }

//     const body = await req.json();
//     const { paymentMethod, email } = body;

//     // Stripe (Credit/Debit + PIX)
//     if (paymentMethod === "stripe") {
//     //   const checkoutSession = await stripe.checkout.sessions.create({
//     //     payment_method_types: ["card"],
//     //     mode: "subscription",
//     //     line_items: [
//     //       {
//     //         price_data: {
//     //           currency: "usd",
//     //           product_data: { name: "Exclusive Membership" },
//     //           unit_amount: 500, // $5.00 in cents
//     //           recurring: { interval: "month" },
//     //         },
//     //         quantity: 1,
//     //       },
//     //     ],
//     //     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//     //     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//     //     customer_email: email,
//     //   });
//         try {
//             const checkoutSession = await stripe.checkout.sessions.create({
//                 payment_method_types: ["card"],
//                 mode: "subscription",
//                 line_items: [
//                 {
//                     price_data: {
//                     currency: "usd",
//                     product_data: { name: "Exclusive Membership" },
//                     unit_amount: 500,
//                     recurring: { interval: "month" },
//                     },
//                     quantity: 1,
//                 },
//                 ],
//                 success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//                 cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//                 customer_email: email,
//             });
//             return new Response(JSON.stringify({ url: checkoutSession.url }), { status: 200 });
//         } catch (err) {
//             console.error("Stripe error:", err);
//             return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
//         }
//       return new Response(JSON.stringify({ url: checkoutSession.url }), { status: 200 });
//     }

//     // PayPal (create order)
//     if (paymentMethod === "paypal") {
//       const request = new paypal.orders.OrdersCreateRequest();
//       request.prefer("return=representation");
//       request.requestBody({
//         intent: "CAPTURE",
//         purchase_units: [
//           {
//             amount: {
//               currency_code: "USD",
//               value: "5.00", // $5.00
//             },
//             description: "Exclusive Membership",
//           },
//         ],
//         application_context: {
//           brand_name: "Your Website",
//           return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//           cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//         },
//       });

//       const order = await payPalClient.execute(request);
//       const approvalUrl = order.result.links.find(link => link.rel === "approve")?.href;

//       return new Response(JSON.stringify({ url: approvalUrl }), { status: 200 });
//     }

//     // // Western Union / Other — manual handling
//     // if (paymentMethod === "western" || paymentMethod === "other") {
//     //   return new Response(
//     //     JSON.stringify({ message: "Payment instructions will be sent to your email shortly." }),
//     //     { status: 200 }
//     //   );
//     // }

//     return new Response(JSON.stringify({ error: "Invalid payment method" }), { status: 400 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
//   }
// }
