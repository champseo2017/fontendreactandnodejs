import App from './pages/App'
import Home from './pages/Home'
import Work from './pages/Work'
import WorkRepair from './pages/WorkRepair'
import User from './pages/User'
import Location from './pages/Location'
import Signin from './pages/Auth/Signin'
import Signout from './pages/Auth/Signout'
import RequireAuth from './pages/Auth/Authentication'
import RequireAuthAdmin from './pages/Auth/AuthenticationAdmin'

const routes = [{
    path: '/',
    component: App,
    indexRoute: {component: Home},
    childRoutes: [
        {path:'signin', component: Signin},
        {path:'signout', component: Signout},
        { path: 'work', component: RequireAuth(Work) },
        { path: 'workrepair', component: RequireAuth(RequireAuthAdmin(WorkRepair)) },
        { path: 'user', component: RequireAuth(RequireAuthAdmin(User)) },
        { path: 'location', component: RequireAuth(RequireAuthAdmin(Location)) }
    ]
}]

export default routes