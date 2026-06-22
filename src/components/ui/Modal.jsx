import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

export default function Modal() {
  const { modal, closeModal } = useModal();
  const { isOpen, component: Component, title, props } = modal;

  return (
    <AnimatePresence>
      {isOpen && Component && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
              <button
                onClick={closeModal}
                className="modal-close"
                aria-label="Close modal"
                data-cursor="pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <Component {...props} onClose={closeModal} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
