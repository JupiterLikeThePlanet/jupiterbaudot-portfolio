import { useState, useEffect, useCallback, useRef } from 'react';
import type { ModalId } from '../types';

interface UseModalReturn {
  activeModal: ModalId | null;
  isClosing: boolean;
  openModal: (id: ModalId, triggerEl?: HTMLElement) => void;
  closeModal: () => void;
}

export function useModal(): UseModalReturn {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeModal = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
      triggerRef.current?.focus();
      triggerRef.current = null;
    }, 140);
  }, []);

  const openModal = useCallback((id: ModalId, triggerEl?: HTMLElement) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsClosing(false);
    if (triggerEl) triggerRef.current = triggerEl;
    setActiveModal(id);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeModal, closeModal]);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  return { activeModal, isClosing, openModal, closeModal };
}
