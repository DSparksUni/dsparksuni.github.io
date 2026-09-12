import init, { Life } from "../wasm/life_web.js"

await init();

const BOARD_ROWS = 25;
const BOARD_COLS = 25;

const CELL_SIZE = 24;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = BOARD_COLS * CELL_SIZE;
canvas.height = BOARD_ROWS * CELL_SIZE;

let last_update = 0;
let interval = 0.5;

const life = new Life(BOARD_ROWS, BOARD_COLS, interval);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < BOARD_ROWS; row++) {
        for (let col = 0; col < BOARD_COLS; col++) {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;

            if (life.get_cell(row, col)) {
                ctx.fillStyle = "gray";
            } else {
                ctx.fillStyle = "white";
            }

            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

            ctx.strokeStyle = "black";
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }
}

function update(timestamp) {
    const delta = (timestamp - last_update) / 1000
    if (life.tick(delta)) last_update = timestamp;

    draw();

    requestAnimationFrame(update);
}

canvas.addEventListener("click", event => {
    if (life.is_running()) return;

    const rect = canvas.getBoundingClientRect();

    const col = Math.floor((event.clientX - rect.left) / CELL_SIZE);
    const row = Math.floor((event.clientY - rect.top) / CELL_SIZE);

    if (row >= 0 && row < BOARD_ROWS && col >= 0 && col < BOARD_COLS) {
        life.flip_cell(row, col);
        draw();
    }
});

document.getElementById("pause").addEventListener("click", event => {
    const text = life.toggle_running() ? "Pause" : "Play";

    event.target.getContext = text;
    document.getElementById("pause").innerText = text;
});

document.getElementById("step").addEventListener("click", () => {
    if (!life.is_running()) {
        life.step();
        draw();
    }
});

document.getElementById("clear").addEventListener("click", () => {
    for (let row = 0; row < BOARD_ROWS; row++) {
        for (let col = 0; col < BOARD_COLS; col++) {
            life.set_cell(row, col, false);
        }
    }

    draw();
});


draw();
requestAnimationFrame(update);
