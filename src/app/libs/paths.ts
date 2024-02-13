import { routes } from "../app-routing.module"

export const patherPaths = {

}

export const defaultPaths = [
    {
        title: 'Home',
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: 'Projects',
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    }/*,
    {
        type: 'hr'
    }*/
]

export const projectsPaths = [
    {
        title: 'Home',
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: 'Projects',
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    }/*,
    {
        type: 'hr'
    }*/
]


export const projectPaths = [
    {
        title: 'Home',
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: 'Projects',
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    },
    {
        type: 'hr'
    },
    {
        title: 'All',
        icon: 'fa-solid fa-border-all fa-sm',
        path: '',
        type: 'first-child-button'
    },
    {
        title: 'Unassigned',
        icon: 'fa-solid fa-border-none fa-sm',
        path: 'unassigned',
        type: 'child-button'
    },
    {
        title: 'In progress',
        icon: 'fa-solid fa-spinner fa-sm',
        path: 'inprogress',
        type: 'child-button'
    },
    {
        title: 'Completed',
        icon: 'fa-solid fa-calendar-check fa-sm',
        path: 'completed',
        type: 'child-button'
    },
    {
        title: 'Pause',
        icon: 'fa-solid fa-hourglass fa-sm',
        path: 'pause',
        type: 'child-button'
    }
]

export const membersPaths = [
    {
        title: 'Home',
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: 'Projects',
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    },
    {
        type: 'hr'
    },
    {
        title: 'Members',
        icon: 'fa-solid fa-users fa-sm',
        path: '',
        type: 'first-child-button'
    },
    {
        title: 'Add',
        icon: 'fa-solid fa-user-plus fa-sm',
        path: 'add',
        type: 'child-button'
    }
]

export const accountPaths = [
    {
        title: 'Home',
        icon: 'fa-solid fa-house fa-sm',
        path: './',
        type: 'home'
    },
    {
        title: 'Projects',
        icon: 'fa-solid fa-diagram-project fa-sm',
        path: './projects',
        type: 'button'
    },
    {
        type: 'hr'
    },
    {
        title: 'Information',
        icon: 'fa-regular fa-user fa-sm',
        path: '',
        type: 'first-child-button'
    },
    {
        title: 'Profile',
        icon: 'fa-solid fa-user-pen fa-sm',
        path: 'profile',
        type: 'child-button'
    },
    {
        title: 'Security',
        icon: 'fa-solid fa-lock fa-sm',
        path: 'security',
        type: 'child-button'
    },
]


export const replacePaths = (url: string) => {
    const childRouteNames: string[] = [];

    // Iterar sobre las rutas y agregar nombres de rutas hijas al array
    for (const route of routes) {
        if (route.children) {
            for (const childRoute of route.children) {
                childRouteNames.push(`${childRoute.path}`);
            }
        }
    }

    // Iterar sobre los nombres de las rutas hijas y reemplazar si se encuentran en el input
    for (const childRouteName of childRouteNames) {
        url = url.replace(childRouteName, '');
    }
    return url;
}