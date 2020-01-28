document.body.addEventListener('keypress', onClickPlay)
document.querySelector('#record').addEventListener('click', recordChannel1)
document.querySelector('#playRecorded').addEventListener('click', playRecorded)

const boomSound = new Audio("./sounds/sounds/boom.wav")
const clapSound = new Audio("./sounds/sounds/clap.wav")
const hihatSound = new Audio("./sounds/sounds/hihat.wav")
const kickSound = new Audio("./sounds/sounds/kick.wav")
const openhatSound = new Audio("./sounds/sounds/openhat.wav")
const rideSound = new Audio("./sounds/sounds/ride.wav")
const snareSound = new Audio("./sounds/sounds/snare.wav")
const tinkSound = new Audio("./sounds/sounds/tink.wav")
const tomSound = new Audio("./sounds/sounds/tom.wav")

let recordingStart
let time
const channel1 = []

function recordChannel1() {
    channel1.splice(0, channel1.length);

    recordingStart = Date.now();
    console.log(true)
}

function playRecorded(){
    channel1.forEach((el) => {
        setTimeout(() => {
            onClickPlay(el.key)
        }, el.time);
    })
}

function onClickPlay(e) {
    switch (e.code) {
        case 'KeyA':
            boomSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyS':
            clapSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyD':
            hihatSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyF':
            kickSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyG':
            openhatSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyH':
            rideSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyJ':
            snareSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyK':
            tinkSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
        case 'KeyL':
            tomSound.play()
            time = Date.now() - recordingStart;
            channel1.push({
                key: e,
                time: time
            })
        break;
    }
    console.log(channel1)
}