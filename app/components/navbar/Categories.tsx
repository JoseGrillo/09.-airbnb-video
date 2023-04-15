"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "¡Esta propiedad está cerca de la playa!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "¡Esta propiedad tiene molinos de viento!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "¡Esta propiedad es moderna!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "¡Esta propiedad está en el campo!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "¡Esta propiedad tiene una hermosa piscina!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "¡Esta propiedad está en una isla!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "¡Esta propiedad está cerca de un lago!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "¡Esta propiedad tiene actividades de esquí!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "¡Esta propiedad es un antiguo castillo!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "¡Esta propiedad está en una cueva espeluznante!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "¡Esta propiedad ofrece actividades de campamento!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "¡Esta propiedad se encuentra en un ambiente ártico!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "¡Esta propiedad está en el desierto!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "¡Esta propiedad está en un granero!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "¡Esta propiedad es nueva y lujosa!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname(); //ruta  3:00:49
  const isMainPage = pathname === "/"; //nonbre de la ruta

  if (!isMainPage) {
    //NO esta en la pagina principal
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label} //saber si se selecciona o NO
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
