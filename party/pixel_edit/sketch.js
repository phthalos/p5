let shared;
// 초기색상 / 팔레트 색상
let drawColor = "#ee6666";
const palette = ["#ee6666", "#eeee66", "#66ee66", "#66eeee", "#6666ee", "#ee66ee"];

// Code to run before the rest of the sketch
// setup()보다 먼저 작동되는 함수. 역시 필수는 아니다.
// loadImage(), loadFont(), loadJSON(), loadModel()과 같이 스케치보다 먼저 로드되거나 에러 발생 여부를 확인해야 하는 것이 있다면 여기에 사용한다.
function preload() {
    // server string: wss://yourserver.herokuapp.com
    // appName string: jbakse-pong
    // roomName(optional) string: main
    partyConnect("wss://demoserver.p5party.org", "pixel_edit");
    shared = partyLoadShared("shared");
}

function setup() {
    createCanvas(400, 440);
    ellipseMode(CORNER);

    console.log(JSON.stringify(shared));

    if (!shared.grid) resetGrid();
}

function mousePressed() {
    // 클릭된 행, 열 계산
    let col = floor(mouseX / 40);
    let row = floor(mouseY / 40);

    // 맨 아래쪽 행을 클릭 시 색상 선택 기능
    if (row === 10 && col >= 0 && col <= 5) drawColor = palette[col] || "white";

    // 10행 9열 클릭 시 리셋 X버튼 동작
    if (row === 10 && col === 9) resetGrid();

    // 그리기 영역 클릭 시 그리기/취소 동작
    if (col >= 0 && col <= 9 && row >= 0 && row <= 9) {
        if (shared.grid[col][row] === drawColor) {
            shared.grid[col][row] = false;
        } else {
            shared.grid[col][row] = drawColor;
        }
    }
}

// 화면 리셋, X 버튼으로 동작
function resetGrid() {
    const newGrid = [];
    for (let col = 0; col < 10; col++) {
        newGrid[col] = new Array(10).fill(false);
    }
    shared.grid = newGrid;
}

function draw() {
    background("#333");
    drawUI();
    drawPixels();
}

// UI
function drawUI() {
    push();
    strokeWeight(3);

    // 색상 선택
    for (let i = 0; i < palette.length; i++) {
        fill(palette[i]);
        if (palette[i] === drawColor) {
            stroke("white");
        } else {
            stroke("black");
        }
        ellipse(i * 40 + 4, 400 + 4, 40 - 8, 40 - 8);
    }

    // 리셋용 "X"버튼
    noFill();
    stroke("red");
    line(360 + 5, 400 + 5, 400 - 5, 440 - 5);
    line(400 - 5, 400 + 5, 360 + 5, 440 - 5);

    pop();
}

// 픽셀 그리기
function drawPixels() {
    push();
    noStroke();
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const x = col * 40;
            const y = row * 40;
            if (shared.grid[col][row]) {
                fill(color(shared.grid[col][row]));
                rect(x + 1, y + 1, 40 - 2, 40 - 2, 2, 2, 2, 2);
            }
        }
    }
    pop();
}
