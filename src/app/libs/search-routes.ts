import { enEN, esMX } from "./langs";

const browserLang = navigator.language;

const lang = browserLang.includes('es') ? esMX : enEN;

export const routes = [
    {
        path: 'projects',
        title: lang.pather_projects,
        login: true
    },
    {
        path: 'account',
        title: lang.pather_information,
        login: true
    },
    {
        path: 'account/profile',
        title: lang.pather_profile,
        login: true
    },
    {
        path: 'account/security',
        title: lang.pather_security,
        login: true
    },
    {
        path: 'login',
        title: lang.login,
        login: false
    },
    {
        path: 'register',
        title: lang.register,
        login: false
    },
    {
        path: 'about',
        title: lang.footer_about_us,
        login: undefined
    },
    {
        path: 'sitemap',
        title: lang.pather_sitemap,
        login: undefined
    },
    {
        path: 'privacy',
        title: lang.pather_privacy,
        login: undefined
    }
];