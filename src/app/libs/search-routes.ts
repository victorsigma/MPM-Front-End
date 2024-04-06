import { enEN, esMX } from "./langs";

const browserLang = navigator.language;

const lang = browserLang.includes('es') ? esMX : enEN;

export const routes = [
    {
        path: 'projects',
        title: lang.pather_projects,
    },
    {
        path: 'account',
        title: lang.pather_information
    },
    {
        path: 'account/profile',
        title: lang.pather_profile
    },
    {
        path: 'account/security',
        title: lang.pather_security
    },
    {
        path: 'login',
        title: lang.login
    },
    {
        path: 'register',
        title: lang.register
    },
    {
        path: 'about',
        title: lang.footer_about_us
    },
    {
        path: 'sitemap',
        title: lang.pather_sitemap
    },
    {
        path: 'privacy',
        title: lang.pather_privacy
    }
];