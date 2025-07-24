import React from "react";
import {
  SiNetflix,
  SiSpotify,
  SiAdobe,
  SiAmazon,
  SiYoutube,
  SiApple,
  SiSlack,
  SiDropbox,
  SiNotion,
  SiGithub,
  SiGoogle,
  SiZoom,
  SiTwitch,
  SiWhatsapp,
  SiPinterest,
  SiTelegram,
} from "react-icons/si";

// --- Individual Icon Components ---
export const NetflixIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-black rounded-md">
    <SiNetflix className="w-5 h-5 text-red-600" />
  </div>
);

export const SpotifyIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full">
    <SiSpotify className="w-5 h-5 text-green-500" />
  </div>
);

export const AdobeIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-md">
    <SiAdobe className="w-6 h-6 text-white" />
  </div>
);

export const AmazonIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-orange-500 rounded-md">
    <SiAmazon className="w-5 h-5 text-white" />
  </div>
);

export const YouTubeIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-md">
    <SiYoutube className="w-5 h-5 text-white" />
  </div>
);

export const AppleIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-md">
    <SiApple className="w-5 h-5 text-white" />
  </div>
);

export const SlackIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-md">
    <SiSlack className="w-5 h-5 text-white" />
  </div>
);

export const DropboxIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-blue-800 rounded-md">
    <SiDropbox className="w-5 h-5 text-white" />
  </div>
);

export const NotionIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-black rounded-md">
    <SiNotion className="w-5 h-5 text-white" />
  </div>
);

export const GithubIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-black rounded-md">
    <SiGithub className="w-5 h-5 text-white" />
  </div>
);

export const GoogleIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-md border">
    <SiGoogle className="w-5 h-5 text-blue-500" />
  </div>
);

export const ZoomIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-blue-400 rounded-md">
    <SiZoom className="w-5 h-5 text-white" />
  </div>
);

export const TwitchIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-purple-700 rounded-md">
    <SiTwitch className="w-5 h-5 text-white" />
  </div>
);

export const PinterestIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-md">
    <SiPinterest className="w-5 h-5 text-white" />
  </div>
);

export const TelegramIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-blue-400 rounded-md">
    <SiTelegram className="w-5 h-5 text-white" />
  </div>
);

export const DefaultIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-md text-slate-400 font-bold">
    ?
  </div>
);

// --- Exported Map ---
export const serviceIcons = {
  netflix: { component: <NetflixIcon />, name: "Netflix" },
  spotify: { component: <SpotifyIcon />, name: "Spotify" },
  adobe: { component: <AdobeIcon />, name: "Adobe" },
  amazon: { component: <AmazonIcon />, name: "Amazon Prime" },
  youtube: { component: <YouTubeIcon />, name: "YouTube Premium" },
  apple: { component: <AppleIcon />, name: "Apple One" },

  slack: { component: <SlackIcon />, name: "Slack Pro" },
  dropbox: { component: <DropboxIcon />, name: "Dropbox" },
  notion: { component: <NotionIcon />, name: "Notion Pro" },
  github: { component: <GithubIcon />, name: "GitHub Pro" },
  google: { component: <GoogleIcon />, name: "Google One" },
  zoom: { component: <ZoomIcon />, name: "Zoom Pro" },

  twitch: { component: <TwitchIcon />, name: "Twitch Turbo" },

  pinterest: { component: <PinterestIcon />, name: "Pinterest Plus" },
  telegram: { component: <TelegramIcon />, name: "Telegram Premium" },
  default: { component: <DefaultIcon />, name: "Default" },
};

// --- Export this safe for Vite HMR ---
export function getIconComponent(iconId) {
  return serviceIcons[iconId]?.component || <DefaultIcon />;
}
