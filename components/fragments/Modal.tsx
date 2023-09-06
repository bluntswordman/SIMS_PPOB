"use client";

import { FC, ReactNode } from "react";

interface ModalProps {
  children?: ReactNode;
  className?: string;
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}

const Modal: FC<ModalProps> = ({ children, isShow, setIsShow, className }) => {
  return (
    <section
      className={`bg-gray-700 absolute w-full h-screen inset-0 overflow-hidden bg-opacity-40 flex items-center justify-center ${
        !isShow && "hidden"
      }`}
    >
      <div className={className}>{children}</div>
    </section>
  );
};

export default Modal;
