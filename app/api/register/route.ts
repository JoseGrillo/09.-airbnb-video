import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

// Creo que deberia ser asi con typescript
type bodyProps = {
  email: string;
  name: string;
  password: string;
};

export async function POST(request: Request) {
  const body: bodyProps = await request.json();
  const { email, name, password } = body;

  //falta verificar email
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    //console.log("debe generar error");
    return NextResponse.json({ error: `El Email ya existe` }, { status: 422 });
    //throw new Error("Invalid credentials EL CORREO YA EXISTE");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { email, name, password } = body;

//   const hashedPassword = await bcrypt.hash(password, 12);

//   const user = await prisma.user.create({
//     data: {
//       email,
//       name,
//       hashedPassword,
//     },
//   });

//   return NextResponse.json(user);
// }
