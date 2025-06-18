
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e46ad1a7b6674317951ca622ceef0323',
  appName: 'hibells-nexus-app',
  webDir: 'dist',
  server: {
    url: 'https://e46ad1a7-b667-4317-951c-a622ceef0323.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
