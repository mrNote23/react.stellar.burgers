import { useCallback, useState } from "react";

export const useModal = (status: boolean) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(status);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return { isModalOpen, openModal, closeModal };
};
