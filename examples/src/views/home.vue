<template>
	<div class="home">
		<div class="main-container">
			<h1 class="fade-in d-1">beat beat js</h1>
			<h2 class="fade-in d-2">A song beat detector for javascript</h2>

			<code class="fade-in d-3">
				<div class="comment">// Install with NPM</div>
				> npm i beat-beat-js
				<br>
				<br>
				<br>
				<div class="comment">// Load a song and play it</div>
				import BeatBeat from "beat-beat-js"<br>
				<br>
				const sound = new BeatBeat("file.mp3")<br>
				await sound.load()<br>
				sound.play(() => {<br>
				<div class="comment tab">// The callback will execute at every beat</div>
				})
				<div class="examples" :class="hiddenClass">
					<div class="comment">// Select an example to view motion with music</div>
					Examples: 
					<a @click="play">Ink</a>
					<router-link to="plant">Plant</router-link>
					<router-link to="head">Head</router-link>
				</div>
				<div class="examples" :class="hiddenClass">
					<div class="comment">// Other useful links</div>
					Links:
					<a href="https://github.com/samitier/beat-beat-js">View on GitHub</a>
					<a href="https://github.com/samitier/beat-beat-js/issues"> Report an issue</a>
				</div>
			</code>
		</div>
		<video ref="video" src="/video/ink-2.mp4"></video>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import BeatBeat from "../../../src/beat-beat"

@Component
export default class Home extends Vue {

	isLoading = true
	private sound: BeatBeat = new BeatBeat("/sounds/Pional-Tempest.mp3")

	get hiddenClass() {
		return { visible: !this.isLoading }
	}

	async mounted() {
		await this.sound.load()
		this.isLoading = false
	}

	play() {
		if (this.sound.isPlaying) return
		const video = this.$refs.video as HTMLVideoElement
		const times = [0, 1.1, 3.1, 6.2]
		let frame = 0
		this.sound.play((time: number) => {
			video.currentTime = times[frame]
			video.play()
			++frame
			if (frame >= times.length) frame = 0
		})
	}
}
</script>

<style scoped lang="stylus">
.content
.home
	background #06070a
	position fixed
a, .main-container
	color #d3ff9a
.home, .main-container, video
	left 0
	right 0
	top 0
	bottom 0
video
	position absolute
	z-index -1
	height 100%
	margin-left auto
	right -8em
.main-container
	position fixed
	padding 2em
	overflow hidden
	max-width 870px
	margin-left auto
	font-family 'Playfair Display', serif
	display flex
	flex-direction column
	justify-content center
	h1
		font-size 3em
		font-weight 900
	h1, h2
		margin 0
	h2
		font-style italic
code
	display block
	max-width 26em
	padding 1em 0
	margin 2.5em 0
	font-family monospace
	& .comment
		opacity 0.65
	& .tab
		margin-left 1em
.examples, .footer
	margin-top 2.5em
	>a
		display inline-block
		text-decoration underline
		padding 0 .5em
		cursor pointer
		&:hover
			opacity 0.5
	opacity 0
	transform translateX(5%)
	transition all 0.5s
	&.visible
		opacity 1
		transform translateX(0)

.fade-in
	opacity 0
	animation fadeInAnim 1s forwards

	&.d-1
		animation-delay 0.1s
	&.d-2
		animation-delay 0.45s
	&.d-3
		animation-delay 0.75s

@keyframes fadeInAnim
	from
		opacity 0
	to
		opacity 1
</style>