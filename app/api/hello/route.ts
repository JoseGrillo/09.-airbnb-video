export async function GET(request: Request) {
  return new Response("Hello, Next.js And GOYO!");
}

// import { NextResponse } from "next/server";
// export async function GET() {
//   return NextResponse.json({ message: "Hello, Next.js!" });
// }

// import { NextResponse } from "next/server";
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const obj = Object.fromEntries(searchParams.entries());
//   //return NextResponse .json( { name, instrument )
//   return NextResponse.json(obj);
// }

// import { NextResponse } from "next/server";
// type Feedback = {
//   name?: string;
//   email?: string;
//   message?: string;
// };

// export async function POST(request: Request) {
//   const data: Feedback = await request.json();
//   console.log("data : ", data);
//   const { name, email, message } = data;
//   return NextResponse.json({ name, email, message });
// }
