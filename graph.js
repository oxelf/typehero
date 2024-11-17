export function drawGraph(state) {
    console.log("drawing graph with state: ", state);
    let canvas = document.getElementById("wpm-chart");
    const style = getComputedStyle(canvas);
    canvas.width = parseInt(style.width);
    canvas.height = canvas.width * (9 / 16);

    let paddingBottom = 30;
    let paddingLeft = 40;
    let height = canvas.height - paddingBottom;
    let width = canvas.width - paddingLeft;
    let ctx = canvas.getContext("2d");

    let maxTime = Math.floor(Math.max(...state.wpmTimeSeries.map((item) => item)) / 1000);

    let wpms = [];
    for (let t = 0; t < maxTime; t++) {
        console.log("looking for t= ", t);
        let c = 0;
        for (let i = 0; i < state.wpmTimeSeries.length; i++) {
            if (state.wpmTimeSeries[i] <= t * 1000) {
                c++;
            }
        }
        if (t == 0) {
            wpms.push(0);
        } else {
            wpms.push(60 / (t / c));
        }
    }

    console.log("wpms: ", wpms);

    let highestWpm = Math.max(...wpms);
    let pixelPerWpm = height / highestWpm;
    let pixelPerStep = width / wpms.length;
    let secondTicks = wpms.length > 10 ? 10: wpms.length;
    let color = getComputedStyle(document.documentElement).getPropertyValue("--hover-color").trim();
    let axisColor = getComputedStyle(document.documentElement).getPropertyValue("--correct-font-color").trim();

    ctx.strokeStyle = axisColor;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, 0);
    ctx.lineTo(paddingLeft, height);
    ctx.lineTo(width + paddingLeft, height);
    ctx.stroke();

    ctx.fillStyle = axisColor;
    ctx.font = "12px Arial";
    let wpmTicks = 5;
    for (let i = 0; i <= wpmTicks; i++) {
        let wpmValue = (highestWpm / wpmTicks) * i;
        let y = height - (wpmValue * pixelPerWpm);
        ctx.fillText(Math.round(wpmValue), 5, y);
        ctx.beginPath();
        ctx.moveTo(paddingLeft - 5, y);
        ctx.lineTo(paddingLeft, y);
        ctx.stroke();
    }

    for (let i = 1; i < secondTicks; i++) {
        let secondValue = (maxTime / secondTicks) * i;
        let x = paddingLeft + (secondValue * pixelPerStep);
        ctx.fillText(Math.round(secondValue), x - 10, height + 20);
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, height + 5);
        ctx.stroke();
    }

    let lastX = paddingLeft;
    let lastY = height;
    for (let i = 1; i < wpms.length; i++) {
        let x = paddingLeft + i * pixelPerStep;
        let y = height - wpms[i] * pixelPerWpm;
        console.log("drawing from ", lastX, lastY, " to ", x, y);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = color;
        ctx.stroke();
        lastX = x;
        lastY = y;
    }

    for (let i = 0; i < state.mistakes.length; i++) {
        let mistake = state.mistakes[i];
        let x = paddingLeft + (mistake / 1000) * pixelPerStep;
        let y = height * 0.75;
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        //draw a small x
        ctx.beginPath();
        ctx.moveTo(x - 3, y - 3);
        ctx.lineTo(x + 3, y + 3);
        ctx.moveTo(x - 3, y + 3);
        ctx.lineTo(x + 3, y - 3);
        ctx.strokeWidth = 5;
        ctx.stroke();
    }
}