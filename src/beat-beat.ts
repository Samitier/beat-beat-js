export default class BeatBeat {

	isPlaying = false

	private offlineContext!: OfflineAudioContext
	private buffer!: AudioBuffer
	private songData: any[] = []

	constructor(
		private context: AudioContext,
		private name: string,
		private filterFrequency = 100,
		private peakGain = 15,
		private threshold = 0.8,
		private sampleSkip = 350,
		private minAnimationTime = 0.4
	) {}

	load() {
		return new Promise(async resolve => {
			const resp = await fetch(this.name)
			const file = await resp.arrayBuffer()
			this.context.decodeAudioData(file, async (buffer) => {
				this.buffer = buffer
				await this.analyze()
				resolve()
			})
		})
	}

	play(cb: any) {
		this.isPlaying = true
		const source = this.context.createBufferSource()
		source.buffer = this.buffer
		source.connect(this.context.destination)
		source.start()
		this.animate(cb)
	}

	private async analyze() {
		this.offlineContext = new OfflineAudioContext(1, this.buffer.length, this.buffer.sampleRate)
		const source = this.offlineContext.createBufferSource()
		source.buffer = this.buffer

		const filter = this.offlineContext.createBiquadFilter()
		filter.type = "bandpass"
		filter.frequency.value = this.filterFrequency
		filter.Q.value = 1

		const filter2 = this.offlineContext.createBiquadFilter()
		filter2.type = "peaking"
		filter2.frequency.value = this.filterFrequency
		filter2.Q.value = 1
		filter2.gain.value = this.peakGain

		source.connect(filter2)
		filter2.connect(filter)
		filter.connect(this.offlineContext.destination)
		source.start()
		const buffer = await this.offlineContext.startRendering()

		const data = buffer.getChannelData(0)

		this.songData = []
		for (let i = 0; i < data.length; ++i) {
			if (data[i] > this.threshold) {
				const time = i / buffer.sampleRate
				const previousTime = this.songData.length
					? this.songData[this.songData.length - 1].time
					: 0
				if (time - previousTime > this.minAnimationTime) {
					this.songData.push({
						data: data[i],
						time
					})
				}
			}
			i += this.sampleSkip
		}
	}

	private animate(cb: any) {
		this.songData.forEach((d, i) => {
			const time = i === this.songData.length - 1
				? d.time
				: this.songData[i + 1].time - d.time
			setTimeout(() => cb(time), d.time * 1000)
		})
	}
}
