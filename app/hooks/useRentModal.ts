import { create } from "zustand"; //3.37.10

interface RentModalStore {
  isOpen: boolean;
  onOpen: () => void; //si una función no devuelve ningún valor, puede especificar void como tipo de devolución
  onClose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
