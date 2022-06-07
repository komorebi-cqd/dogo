import Home from '../pages/Home.vue'
import Rule from '../pages/Rules.vue'
import Farming from '../pages/Farming/index.vue'

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'rule', path: '/rule', component: Rule },
    { name: 'farming', path: '/farming', component: Farming },
];


export default routes;