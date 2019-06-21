<template>
  <div class="home">
	  <div class="song-name">
		  CASUALTY <small>pional</small>
	  </div>
	  <div class="loading" v-if="isLoading">
		  Loading...
	  </div>
	  <div
		class="circle"
		  :class="circleClass"
		  @click="!sound.isPlaying && play()"
		  v-if="!isLoading"
		>
		  <div class="plant1" :style="plantStyle" :class="plantClass">
		  	<img src="/img/leaf1-1.png" class="plant leaf1-1" :style="leafStyleSm">
		  	<img src="/img/leaf1-2.png" class="plant leaf1-2" :style="leafStyleSm">
		  	<img src="/img/plant1.png" class="plant">
		  </div>
		  <div class="plant2" :style="plantStyle" :class="plantClass">
		  	<img src="/img/leaf2-3.png" class="plant leaf2-3" :style="leafStyle">
		  	<img src="/img/plant2.png" class="plant">
		  	<img src="/img/leaf2-1.png" class="plant leaf2-1" :style="leafStyle">
		  	<img src="/img/leaf2-2.png" class="plant leaf2-2" :style="leafStyle">
		  </div>
			<div class="info" v-if="!sound.isPlaying">
			Click the plant to start
			</div>
	  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// import BeatBeat from "beat-beat-js"
import BeatBeat from "../../../src/beat-beat"

@Component
export default class Plant extends Vue {

	isLoading = true

	private sound: BeatBeat = new BeatBeat("/sounds/Pional-Casualty.mp3")

	private isTick: boolean = false
	private time: number = 0


	get plantClass() {
		return this.isTick ? "animated" : ""
	}

	get plantStyle() {
		return { transition: `all ${ this.time }s ease-in-out`}
	}

	get leafStyle() {
		return { transform: `rotateZ(${ 6 * (this.isTick ? -1 : 1) }deg)` }
	}

	get leafStyleSm() {
		return { transform: `rotateZ(${ 6 * (this.isTick ? 1 : -1) }deg)` }
	}

	get circleClass() {
		return { beat: this.isTick }
	}

	async mounted() {
		await this.sound.load()
		this.isLoading = false
	}

	play() {
		this.sound.play(this.onAnimate.bind(this))
	}

	destroyed() {
		this.sound.destroy()
	}

	private onAnimate(time: number) {
		this.time = time
		this.isTick = !this.isTick
	}
}
</script>
<style lang="stylus" scoped>
.song-name
	font-size 3.4em
	font-weight bolder
	background-color black
	color lightblue
	padding .7rem 0
	small
		font-size 2rem
.home
	position fixed
	left 0
	right 0
	bottom 0
	top 0
	background lightblue
	text-align center
.circle
	cursor pointer
	width 280px
	height 280px
	transform translateY(-50%)
	position absolute
	left 0
	right 0
	top 56%
	margin 2em auto
	border 22px solid black
	background-color white
	border-radius 50%
	&.beat
		animation shadowAnim 0.2s
.plant1
	position absolute
	left -198px
	bottom -3px
	width 400px
	height 395px
	transform rotateZ(-4deg)
	transform-origin 92.5% 99%
	&.animated
		transform rotateZ(4deg)
.plant2
	position absolute
	left 50px
	bottom -63px
	width 400px
	height 395px
	transform rotateZ(4deg)
	transform-origin 15% 83%
	&.animated
		transform rotateZ(-5deg)
.plant1, .plant2
	transition all 1s
.plant
	position absolute
	left 0
	right 0
	bottom 0
	top 0
	width 100%
.leaf2-1
	transform-origin 28% 54.5%
	transition all 1.1s
.leaf2-2
	transform-origin 30% 65.5%
	transition all 1.25s
.leaf2-3
	transform-origin 41% 38%
	transition all 2.5s
.leaf1-1
	transform-origin 65% 75%
	transition all 1.7s
.leaf1-2
	transform-origin 58% 52%
	transition all 1.5s
.loading
	padding 3em 0
.info
	position absolute
	bottom -4em
	left 0
	right 0
@keyframes shadowAnim
	from
		box-shadow 0 0 0 rgba(0,0,0,0.7)
	to
		box-shadow 0 0 40px 20px rgba(0,0,0,0.01)
</style>

