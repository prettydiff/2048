// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    let size = document.getElementById("game-size"),
        style = document.getElementsByTagName("style")[0],
        con = document.getElementsByClassName("game-container")[0],
        value = (isNaN(Number(size.value)) === true)
            ? 4
            : Number(size.value),
        load = false,
        resize = function () {
            let body = document.getElementsByTagName("body")[0],
                width = 0,
                height = 0;
            body.style.minHeight = `${ Math.max(document.documentElement.clientHeight, window.innerHeight || 0)}px`;
            width = Math.min(body.clientWidth, window.innerWidth);
            height = Math.min(body.clientHeight, window.innerHeight - 10);
            {
                let a = 1,
                    b = 1,
                    ca = 0,
                    cb = 0,
                    totalwidth = (width > height)
                        ? (height - 100) / 10
                        : (width - 100) / 10,
                    col = totalwidth / ((value * 10) + (value + 1)),
                    row = {},
                    cell = {},
                    gc = document.getElementsByClassName("grid-container")[0],
                    cellwidth = col * 10,
                    styles = [
                        `.game-container{padding:${col}em}`,
                        `.grid-cell{font-size:${cellwidth}em;margin-right:${col / cellwidth}em}`,
                        `.grid-row{margin-bottom:${col}em}`,
                        `.tile{font-size:${cellwidth}em}`
                    ];
                con.style.width = `${totalwidth}em`;
                con.style.height = `${totalwidth}em`;
                do {
                    if (load === false) {
                        row = document.createElement("div");
                        row.setAttribute("class", "grid-row");
                    }
                    b = 1;
                    ca = (a - 1);
                    do {
                        if (load === false) {
                            cell = document.createElement("div");
                            cell.setAttribute("class", "grid-cell");
                            row.appendChild(cell);
                        }
                        cb = (b - 1);
                        styles.push(`
                .tile.tile-position-${a}-${b} {
                    transform        : translate(${ca+ ((col/cellwidth)*ca)}em, ${cb + ((col / cellwidth) * cb)}em);
                }`);
                        b = b + 1;
                    } while (b < value + 1);
                    if (load === false) {
                        gc.appendChild(row);
                    }
                    a = a + 1;
                } while (a < value + 1);
                style.innerHTML = styles.join("");
            }
        };
    if (localStorage.size !== undefined) {
        value = localStorage.size;
        size.value = value;
    }
    size.onblur = function () {
        if (size.value !== String(value) && isNaN(size.value) === false) {
            delete localStorage.gameState;
            localStorage.size = size.value;
            location.reload();
        }
    };
    if (isNaN(value) === true || value < 2) {
        value = 4;
    } else {
        value = Number(value);
    }
    window.onresize = resize;
    resize();
    load = true;
    new GameManager(value, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
