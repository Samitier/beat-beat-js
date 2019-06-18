import Vue from "vue"
import Router from "vue-router"
import Home from "./views/home.vue"

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/plant",
			name: "plant",
			component: () => import(/* webpackChunkName: "plant" */ "./views/plant.vue"),
		},
		{
			path: "/head",
			name: "head",
			component: () => import(/* webpackChunkName: "head" */ "./views/head/head.vue"),
		}
	],
})
