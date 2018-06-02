const settings = require("electron-settings");

const COGLITE_AUTH_TOKEN = "COGLITE_AUTH_TOKEN";
export const CogliteToken = {
  get: () => {
    return settings.get(COGLITE_AUTH_TOKEN);
  },
  set: (preference: any) => {
    settings.set(COGLITE_AUTH_TOKEN, preference);
  }
};

const RECENT_PROJECTS = "RECENT_PROJECTS";
export const RecentProjects = {
  get: () =>  settings.get(RECENT_PROJECTS),
  
  set: (recentProjects: any) => settings.set(RECENT_PROJECTS, recentProjects)
};
