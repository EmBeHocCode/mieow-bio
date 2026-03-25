import { socials } from '../../data/site';
import { getSocialIcon } from '../layout/socialIcons';
import { PixelSectionTitle } from '../pixel/PixelSectionTitle';
import { PixelSocialButton } from '../pixel/PixelSocialButton';

type ConnectSectionProps = {
  onOpenZalo: () => void;
};

export function ConnectSection({ onOpenZalo }: ConnectSectionProps) {
  return (
    <section
      id="connect"
      data-section
      className="scroll-mt-32 py-20 sm:py-24"
    >
      <div className="page-shell">
        <PixelSectionTitle
          label="Channels // Connect"
          title="Kết nối"
          description="Social buttons được làm lại thành panel pixel chắc tay, hover rõ, icon gọn và vẫn giữ độ dễ đọc như một portfolio thật."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {socials.map((social) => (
            <PixelSocialButton
              key={social.label}
              icon={getSocialIcon(social.icon)}
              label={social.label}
              description={social.description}
              href={social.href}
              onClick={social.action === 'zalo' ? onOpenZalo : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
