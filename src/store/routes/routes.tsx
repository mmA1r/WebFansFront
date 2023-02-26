type Route = {
    path: string,
    title: string,
}

interface IROUTES {
    main: Route,
    login: Route,
    content: Route,
    messanger: Route,
    notFound: Route
}

const ROUTES: IROUTES = {
    main: {path: '/', title: ''},
    login: {path: '/login', title: 'login'},
    content: {path: '/main', title: 'content'},
    messanger: {path: '/messanger', title: 'messages'},
    notFound: {path: '*', title: 'notFound'}
}

export default ROUTES;