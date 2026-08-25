import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* Ultrawide screenshots are unreadable at phone width — a 2.44:1 capture in a
 * 337px column is a 138px strip. This shows the image at full height and lets
 * it scroll sideways, so the detail is actually legible on the device most
 * people will open the site on. */

export function Lightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    // Shell ignores keys while a modal is present, so this handler does not
    // have to win a propagation race with it.
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      restoreRef.current?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt}>
      <div className="lightbox-bar">
        <span className="mono lightbox-caption">{caption ?? alt}</span>
        <button ref={closeRef} type="button" className="mono lightbox-close" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="lightbox-scroll">
        <img src={src} alt={alt} />
      </div>
    </div>,
    document.body,
  );
}
