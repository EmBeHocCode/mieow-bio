import type { ReactNode } from 'react';
import {
  FaEnvelope,
  FaFacebook,
  FaFacebookMessenger,
  FaGithub,
  FaQrcode,
  FaTelegram,
  FaTiktok,
  FaYoutube
} from 'react-icons/fa6';

export type SocialIconKey =
  | 'github'
  | 'facebook'
  | 'messenger'
  | 'tiktok'
  | 'telegram'
  | 'mail'
  | 'youtube'
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
    case 'youtube':
      return <FaYoutube {...iconProps} />;
    case 'zalo':
      return <FaQrcode {...iconProps} />;
    default:
      return null;
  }
}
