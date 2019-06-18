# Beat-Beat JS

Do you want to make things move with your music? This is a very simple js library to analyze and detect the beats of a song.

Using the WebAudioAPI and a couple of filters, this library is capable of analyzing the low frequencies of a song to try to infer its tempo. It then executes a callback each time the song reaches a beat.

## Usage

Install:

```
npm i beat-beat-js
```

Load a song and play it:

```
import BeatBeat from "beat-beat-js"

const sound = new BeatBeat("path-to-a-song-file.mp3")

await sound.load()

sound.play(() => console.log("This callback will execute at every beat of the song"))

```
