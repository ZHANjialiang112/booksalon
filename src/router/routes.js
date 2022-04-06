import Index from '../components/Index'
import HelloWorld from "@/components/HelloWorld";
import HomePage from "@/components/HomePage";

export default [
    {path: '/', component: Index},
    {name: 'index', path: '/index', component: Index},
    {name: 'login', path: '/login', component: HelloWorld},
    {name: 'homepage', path: '/homepage', component: HomePage}
]