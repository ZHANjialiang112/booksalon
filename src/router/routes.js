import Index from '../components/Index'
import Login from "@/components/Login";
import HomePage from "@/components/HomePage";

export default [
    {path: '/', component: Index},
    {name: 'index', path: '/index', component: Index},
    {name: 'login', path: '/login', component: Login},
    {name: 'homepage', path: '/homepage', component: HomePage}
]