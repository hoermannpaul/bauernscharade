<script setup>
import { ref } from 'vue';
import { store } from '../store'


const selfStatus = ref('');
const startTime = ref(0.0);
const stoppedDuration = ref(0.0);
const isPaused = ref(true)
const started = ref(undefined);
const displayTime = ref('00:00:00.000');

const zeroPrefix = (num, digit) => {
    var zero = '';
    for (var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}

const tick = () => {
    console.debug("in here");
    var currentTime = Date.now();
    var timeElapsed = new Date(currentTime - startTime.value - stoppedDuration.value);
    const hour = timeElapsed.getUTCHours();
    const min = timeElapsed.getUTCMinutes();
    const sec = timeElapsed.getUTCSeconds();
    const ms = timeElapsed.getUTCMilliseconds();

    console.debug(startTime.value)

    console.debug(currentTime)

    console.debug(
        timeElapsed
    )

    displayTime.value =
        zeroPrefix(hour, 2) + ":" +
        zeroPrefix(min, 2) + ":" +
        zeroPrefix(sec, 2) + "." +
        zeroPrefix(ms, 3);

    console.debug(displayTime.value)
};

const start = () => {
    startTime.value = Date.now();
    started.value = setInterval(tick, 10)
}

const stop = () => {
    clearInterval(started.value);
}

const pause = () => {
    clearInterval(started);
}
</script>

<template>
    <div id="clock">

        <span class="time">{{ displayTime }}</span>

        <div class="btn-container">
            <a v-if="store.currentlyGuessing" id="start" @click="start">Start</a>
            <a id="stop" @click="stop">Stop</a>
            <a id="reset">Reset</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
$color: rgb(200, 200, 200);
$color-light: white;

@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

html,
body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}

body {
    background-color: rgb(10, 10, 10);
    font-family: 'Share Tech Mono', sans-serif;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;
}

.time {
    width: 100%;
}

#clock {
    order: 0;
    flex: 0 1 auto;
    align-self: center;

    font-family: 'Share Tech Mono', sans-serif;


    color: $color;
    //text-shadow: 0px 0px 25px $color;

    .time {
        font-size: 6.5em;
    }

    .text {
        margin-top: 30px;
        font-size: 1em;
        color: rgba($color, .4);
        text-align: center;

        a {
            text-decoration: none;
            color: inherit;

            transition: color .1s ease-out;

            &:hover {
                color: $color;
            }
        }
    }

    .btn-container {
        display: flex;
        margin-top: 15px;

        a {
            text-align: center;
            font-family: 'Share Tech Mono', sans-serif;
            background: transparent;
            border: none;
            color: $color;
            padding: 10px 15px;
            margin: 0 10px;
            text-transform: uppercase;
            font-size: 2em;
            cursor: pointer;

            flex-grow: 1;

            transition: color .1s ease-out;

            &:hover {
                color: $color-light;
            }
        }
    }
}
</style>