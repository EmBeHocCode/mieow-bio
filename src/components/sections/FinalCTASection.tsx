import { MessageCircleMore, Rocket } from 'lucide-react';
import { ctaActions } from '../../data/site';
import { getSocialIcon } from '../layout/socialIcons';
import { PixelButton } from '../pixel/PixelButton';
import { PixelPanel } from '../pixel/PixelPanel';

type FinalCTASectionProps = {
  onOpenZalo: () => void;
};

export function FinalCTASection({ onOpenZalo }: FinalCTASectionProps) {
  return (
    <section
      id="cta"
      className="py-20 sm:py-24"
    >
      <div className="page-shell">
        <PixelPanel
          tone="pink"
          className="p-6 sm:p-8 lg:p-12"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center pixel-cut border border-[var(--accent-border)] bg-[rgba(255,92,214,0.14)] text-[var(--accent-primary)] shadow-neon-soft">
              <Rocket size={22} />
            </div>

            <h2 className="mt-6 font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              Sẵn sàng bắt đầu dự án?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              Nếu bạn đang tìm một người có thể cùng học, cùng làm và triển khai project nghiêm túc từng bước, mình sẵn sàng trao đổi.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {ctaActions.map((action, index) =>
                action.action === 'zalo' ? (
                  <PixelButton
                    key={action.label}
                    onClick={onOpenZalo}
                    variant={index === 0 ? 'primary' : 'secondary'}
                    leftIcon={getSocialIcon(action.icon)}
                    size="lg"
                  >
                    {action.label}
                  </PixelButton>
                ) : (
                  <PixelButton
                    key={action.label}
                    href={action.href}
                    external={!action.href.startsWith('mailto:')}
                    variant={index === 0 ? 'primary' : 'secondary'}
                    leftIcon={getSocialIcon(action.icon)}
                    size="lg"
                  >
                    {action.label}
                  </PixelButton>
                )
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
              <MessageCircleMore size={16} />
              <span>Rep nhanh, trao đổi rõ, ưu tiên quy trình gọn.</span>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  );
}
