import { enEN, esMX } from "./langs";

const browserLang = navigator.language;

const lang = browserLang.includes('es') ? esMX : enEN;

export const patherPaths = {

}

export const defaultPaths = [
    {
        title: lang.pather_home,
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: lang.projects,
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    }
]

export const projectsPaths = [
    {
        title: lang.pather_home,
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: lang.projects,
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    }
]


export const projectPaths = [
    {
        title: lang.pather_home,
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: lang.projects,
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    },
    {
        type: 'hr'
    },
    {
        title: lang.pather_all,
        icon: 'fa-solid fa-border-all fa-sm',
        path: '',
        type: 'first-child-button'
    },
    {
        title: lang.pather_unassigned,
        icon: 'fa-solid fa-border-none fa-sm',
        path: 'unassigned',
        type: 'child-button'
    },
    {
        title: lang.pather_in_progress,
        icon: 'fa-solid fa-spinner fa-sm',
        path: 'inprogress',
        type: 'child-button'
    },
    {
        title: lang.pather_completed,
        icon: 'fa-solid fa-calendar-check fa-sm',
        path: 'completed',
        type: 'child-button'
    },
    {
        title: lang.pather_pause,
        icon: 'fa-solid fa-hourglass fa-sm',
        path: 'pause',
        type: 'child-button'
    }
]

export const membersPaths = [
    {
        title: lang.pather_home,
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: lang.projects,
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    },
    {
        type: 'hr'
    },
    {
        title: lang.pather_members,
        icon: 'fa-solid fa-users fa-sm',
        path: '',
        type: 'first-child-button'
    },
    {
        title: lang.pather_add,
        icon: 'fa-solid fa-user-plus fa-sm',
        path: 'add',
        type: 'child-button'
    }
]

export const accountPaths = [
    {
        title: lang.pather_home,
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: lang.projects,
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    },
    {
        type: 'hr'
    },
    {
        title: lang.pather_information,
        icon: 'fa-solid fa-user fa-sm',
        path: '',
        type: 'first-child-button'
    },
    {
        title: lang.pather_profile,
        icon: 'fa-solid fa-user-pen fa-xs',
        path: 'profile',
        type: 'child-button'
    },
    {
        title: lang.pather_security,
        icon: 'fa-solid fa-lock fa-sm',
        path: 'security',
        type: 'child-button'
    },
]