import React, { useCallback, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Modal from "react-modal";
import { Container, Top } from "./styles";

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: () => void;
  width?: number;
  height?: number;
  closeOnOverlay?: boolean;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  isOpen,
  setIsOpen,
  children,
  width,
  height,
  closeOnOverlay,
}) => {
  const [opened, setOpened] = useState(isOpen);

  useEffect(() => {
    setOpened(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  return (
    <Modal
      isOpen={opened}
      onRequestClose={setIsOpen}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={{
        content: {
          width,
          height,
          position: "relative",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          border: "none",
          borderRadius: 10,
          padding: 0,
        },
        overlay: {
          backgroundColor: "#07f7",
        },
      }}>
      <Container>
        <Top>
          <div>
            {!closeOnOverlay && (
              <FiArrowLeft size={25} onClick={handleClose} color="white" />
            )}
          </div>

          <h3>{title}</h3>
        </Top>
        {children}
      </Container>
    </Modal>
  );
};

export default ModalComponent;
