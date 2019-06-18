import Vue from "vue"
import Router from "vue-router"
import Home from "./views/home.vue"
import Head from "./views/head/head.vue"

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/head",
			name: "head",
			component: Head,
		}
	],
})
