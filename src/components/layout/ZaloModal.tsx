import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, X } from 'lucide-react';
import { PixelButton } from '../pixel/PixelButton';
import { PixelPanel } from '../pixel/PixelPanel';

type ZaloModalProps = {
  imageSrc: string;
  onClose: () => void;
};

export function ZaloModal({ imageSrc, onClose }: ZaloModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Zalo QR"
    >
      <button
        type="button"
        aria-label="Close Zalo modal"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(4,1,11,0.82)] backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="relative z-[1] w-full max-w-md"
      >
        <PixelPanel
          tone="pink"
          className="p-6 sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-pixel text-[0.56rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Scan & Connect
              </p>
              <h3 className="mt-2 flex items-center gap-2 font-display text-2xl font-semibold text-[var(--text-primary)]">
                <QrCode
                  size={22}
                  className="text-[var(--accent-primary)]"
                />
                Zalo QR
              </h3>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="pixel-cut inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.04] text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 rounded-[1rem] border border-white/8 bg-[rgba(255,255,255,0.03)] p-4">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10">
              <img
                src={imageSrc}
                alt="Zalo QR Code"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
            Mở ứng dụng Zalo và quét mã QR để kết nối. Đây là cách giữ CTA rõ ràng mà không làm phần liên hệ bị quá tải.
          </p>

          <div className="mt-6">
            <PixelButton
              variant="secondary"
              onClick={onClose}
            >
              Đóng
            </PixelButton>
          </div>
        </PixelPanel>
      </motion.div>
    </motion.div>
  );
}
