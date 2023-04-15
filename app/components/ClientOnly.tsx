"use client";
//lo llama layout  ||  /app/listings/[listingId]/page.tsx
//(es para evitar errores del cliente y el servidor)
//quita errores de hidratacion
// ``comprueba si estamos del lado del servidor o no``

import React, { useState, useEffect } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; //SI NO SE HA MONTADO

  return <>{children}</>;
};

export default ClientOnly;
