"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  console.log("label", label);

  return (
    <div
      onClick={onClick}
      className={` 
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
        ${
          label === "Logout"
            ? "text-rose-700 text-center hover:bg-rose-500 hover:text-black hover:text-center"
            : ""
        }
        `}
    >
      {label}
    </div>
  );
};

export default MenuItem;

// { label === ("Logout") ? "text-rose-500" : ""}
