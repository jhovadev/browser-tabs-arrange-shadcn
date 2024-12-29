import { create } from "zustand";
import { Tab } from "./columns";

type StoreTabs = {
  tabs: Array<Tab>;
  setTabs: (newtabs: Array<Tab>) => void;
};

export const useStoreTabs = create<StoreTabs>()((set) => ({
  tabs: [
    {
      id: 0,
      favIconUrl: null,
      title: "localhost",
      url: "http://localhost:3000/",
    },
    {
      id: 1,
      title:
        'ESLint - Configuring "no-unused-vars" for TypeScript - Stack Overflow',
      favIconUrl:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
      url: "https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript",
    },
    {
      id: 2,
      title: "rules in FlatCompat eslint - Buscar con Google",
      favIconUrl: "https://www.google.com/favicon.ico",
      url: "https://www.google.com/search?q=rules+in+FlatCompat+eslint&sca_esv=232c4ba19e3c94e6&ei=2hRwZ43tIaq-1sQPyb-TwA4&ved=0ahUKEwiNws_R38qKAxUqn5UCHcnfBOgQ4dUDCBA&uact=5&oq=rules+in+FlatCompat+eslint&gs_lp=Egxnd3Mtd2l6LXNlcnAiGnJ1bGVzIGluIEZsYXRDb21wYXQgZXNsaW50MgUQABjvBTIFEAAY7wUyBRAAGO8FMggQABiABBiiBDIFEAAY7wVIwxZQ5QxYpxVwAXgAkAEAmAGmAaABrAmqAQMwLjm4AQPIAQD4AQGYAgSgAowDwgIKEAAYsAMY1gQYR5gDAIgGAZAGCJIHAzEuM6AH6iE&sclient=gws-wiz-serp",
    },
    {
      id: 3,
      title:
        "best eslint configuration for prettier nextjs and aribnb - Buscar con Google",
      favIconUrl: "https://www.google.com/favicon.ico",
      url: "https://www.google.com/search?q=best+eslint+configuration+for+prettier+nextjs+and+aribnb&oq=best+eslint+configuration+for+prettier+nextjs+and+aribnb&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOdIBCTExMDYyajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8",
    },
    {
      id: 4,
      title:
        "Next.js 12 Migration and Eslint configuration with Prettier, Airbnb, Jest/react-testing-library - Stack Overflow",
      favIconUrl:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
      url: "https://stackoverflow.com/questions/73900811/next-js-12-migration-and-eslint-configuration-with-prettier-airbnb-jest-react",
    },
    {
      id: 5,
      title:
        "Guide to Setting Up Prettier, Airbnb ESLint, and Husky for Your Next Project - DEV Community",
      favIconUrl:
        "https://media2.dev.to/dynamic/image/width=32,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png",
      url: "https://dev.to/emmanuelo/guide-to-setting-up-prettier-airbnb-eslint-and-husky-for-your-next-project-17ge",
    },
    {
      id: 6,
      title:
        "javascript/packages/eslint-config-airbnb/index.js at master · airbnb/javascript · GitHub",
      favIconUrl: "https://github.githubassets.com/favicons/favicon-dark.svg",
      url: "https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js",
    },
    {
      id: 7,
      title: "Get started | Husky",
      favIconUrl:
        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="85">%F0%9F%90%B6</text></svg>',
      url: "https://typicode.github.io/husky/get-started.html",
    },
    {
      id: 8,
      title: "husky js - YouTube",
      favIconUrl:
        "https://www.youtube.com/s/desktop/c01ea7e3/img/logos/favicon_32x32.png",
      url: "https://www.youtube.com/results?search_query=husky+js+",
    },
    {
      id: 9,
      title: "Precommit Hooks Are Bad - YouTube",
      favIconUrl:
        "https://www.youtube.com/s/desktop/c01ea7e3/img/logos/favicon_32x32.png",
      url: "https://www.youtube.com/watch?v=RAelLqnnOp0",
    },
    {
      id: 10,
      title:
        "GIT HOOKS: Mejora tu flujo de trabajo con HUSKY y LINT-STAGED - YouTube",
      favIconUrl:
        "https://www.youtube.com/s/desktop/c01ea7e3/img/logos/favicon_32x32.png",
      url: "https://www.youtube.com/watch?v=YWBrzwSDpo8",
    },
  ],
  setTabs: (newtabs: Array<Tab>) => set({ tabs: newtabs }),
}));
