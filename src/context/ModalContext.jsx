import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({ isOpen: false, component: null, title: '', props: {} });

  const openModal = useCallback((component, title = '', props = {}) => {
    setModal({ isOpen: true, component, title, props });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, component: null, title: '', props: {} });
    document.body.style.overflow = '';
  }, []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
