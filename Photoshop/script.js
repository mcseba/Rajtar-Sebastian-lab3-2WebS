
const clearButton = document.querySelector('.clear');
const stroke_weight = document.querySelector('.stroke-weight');
const color_picker = document.querySelector('.color-picker');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);

clearButton.addEventListener('click', clearCanvas);

function start(e) {
    isDrawing = true;
    draw(e);
}

function draw({ clientX: x, clientY: y }) {
    if (!isDrawing) return;
    ctx.lineWidth = stroke_weight.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = color_picker.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stop() {
    isDrawing = false;
    ctx.beginPath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();



let img = new Image();
let fileName = "";
let fileSource = "";

const uploadFile = document.querySelector("#upload-file");

// Upload File
uploadFile.addEventListener("change", () => {
    // Get File
    const file = document.getElementById("upload-file").files[0];
    // Init FileReader API
    const reader = new FileReader();

    // Check for file
    if (file) {
        // Set file name
        fileName = file.name;
        // Read data as URL
        reader.readAsDataURL(file);
    }

    // Add image to canvas
    reader.addEventListener(
        "load",
        () => {
            // Create image
            img = new Image();
            // Set image src
            fileSource = reader.result;
            img.src = reader.result;
            // On image load add to canvas
            img.onload = function () {
                ctx.drawImage(img, 0, 0, img.width, img.height);
            };
        },
        false
    );
});


let brightnessSider = document.querySelector("#brightnessRange");
let contrastSider = document.querySelector("#contrastRange");
let blurSider = document.querySelector("#blurRange");

brightnessSider.addEventListener('change', function () {
    clearCanvas();
    ctx.filter = 'brightness(' + brightnessSider.value + '%)';
    ctx.drawImage(img, 0, 0, img.width, img.height);

}, false);

contrastSider.addEventListener('change', function () {
    clearCanvas();
    ctx.filter = 'contrast(' + contrastSider.value + '%)';
    ctx.drawImage(img, 0, 0, img.width, img.height);

}, false);

blurSider.addEventListener('change', function () {
    clearCanvas();
    ctx.filter = 'blur(' + blurSider.value + 'px)';
    ctx.drawImage(img, 0, 0, img.width, img.height);

}, false);
