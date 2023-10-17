type Mainmenu = {
    id: number
    name: string
    link: string
}

type Submenu = {
    id: number
    name: string
    link: string
}

export const MainMenu: Mainmenu[] = [
    { id: 1, name: 'UI/UX', link: '/ui' },
    { id: 2, name: 'Products', link: '/products' },
    { id: 3, name: 'Forums', link: '/forums' },
    { id: 4, name: 'Widget', link: '/widget' },
    { id: 5, name: 'Tutorial', link: '/tutorial' }
]


export const SubMenu:Submenu[] = [
    {
        name: "CSS",
        link: "/css",
        id: 1
    },
    {
        name: "React",
        link: "/react",
        id: 2
    },
    {
        name: "Typescript",
        link: "/typescript",
        id: 3 
    },
    {
        name: "NodeJS",
        link: "/nodejs",
        id: 4
    }
]