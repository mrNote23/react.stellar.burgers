import { FC, ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"
import ModalOverlay from "./modal-overlay/modal-overlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./modal.module.css"

type TModalProps = {
  children?: ReactNode
  visible: boolean
  setVisible: (value: boolean) => void
  title?: string
}

const Modal: FC<TModalProps> = ({ children, visible, setVisible, title = "" }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.key === "Escape" && setVisible(false)
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [setVisible])

  return createPortal(
    <>
      {visible && (
        <ModalOverlay onClose={() => setVisible(false)}>
          <div className={`${styles.modal} p-4`}>
            <div className={styles.header}>
              <p className='text text_type_main-large pl-5'>{title}</p>
              <button className={styles.closeBtn} onClick={() => setVisible(false)}>
                <CloseIcon type='primary' />
              </button>
            </div>
            {children}
          </div>
        </ModalOverlay>
      )}
    </>,
    document.getElementById("modal-window") as HTMLElement
  )
}

export default Modal
