import type { ReactNode } from 'react';
import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaFacebookMessenger,
  FaGithub,
  FaQrcode,
  FaTelegram,
  FaTiktok,
} from 'react-icons/fa6';

export type SocialIconKey =
  | 'github'
  | 'facebook'
  | 'messenger'
  | 'tiktok'
  | 'telegram'
  | 'mail'
  | 'discord'
  | 'zalo';

export function getSocialIcon(icon: SocialIconKey): ReactNode {
  const iconProps = { size: 18 };

  switch (icon) {
    case 'github':
      return <FaGithub {...iconProps} />;
    case 'facebook':
      return <FaFacebook {...iconProps} />;
    case 'messenger':
      return <FaFacebookMessenger {...iconProps} />;
    case 'tiktok':
      return <FaTiktok {...iconProps} />;
    case 'telegram':
      return <FaTelegram {...iconProps} />;
    case 'mail':
      return <FaEnvelope {...iconProps} />;
    case 'discord':
      return <FaDiscord {...iconProps} />;
    case 'zalo':
      return <FaQrcode {...iconProps} />;
    default:
      return null;
  }
}
