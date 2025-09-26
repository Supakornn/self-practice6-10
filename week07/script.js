const canvas = document.getElementById("pad");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 3;
ctx.lineCap = "round";

let drawing = false;

function startDraw(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
}
function draw(e) {
    if (!drawing) return;
    ctx.lineTo(getX(e), getY(e));
    ctx.stroke();
}
function endDraw() {
    drawing = false;
}

function getX(e) {
    return e.offsetX ?? e.touches[0].clientX - canvas.getBoundingClientRect().left;
}
function getY(e) {
    return e.offsetY ?? e.touches[0].clientY - canvas.getBoundingClientRect().top;
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mouseleave", endDraw);

canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    draw(e);
});
canvas.addEventListener("touchend", endDraw);

document.getElementById("color").addEventListener("input", (e) => {
    ctx.strokeStyle = e.target.value;
});

document.getElementById("clear").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("save").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
});
