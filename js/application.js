// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  let size = document.getElementById("game-size"),
      style = document.getElementsByTagName("style")[0],
      con = document.getElementsByClassName("game-container")[0],
      value = size.value,
      load = false,
      resize = function () {
          let body = document.getElementsByTagName("body")[0],
              width = 0,
              height = 0;
          body.style.minHeight = `${ Math.max(document.documentElement.clientHeight, window.innerHeight || 0)}px`;
          width = Math.min(body.clientWidth, window.innerWidth);
          height = Math.min(body.clientHeight, window.innerHeight - 10);
          if (width > height) {
              con.style.width = `${height - 100 }px`;
              con.style.height = `${height - 100 }px`;
          } else {
              con.style.width = `${width - 100 }px`;
              con.style.height = `${width - 100 }px`;
          } 
          {
              let a = 1,
                  b = 1,
                  ba = 0,
                  bb = 0,
                  ca = 0,
                  cb = 0,
                  totalwidth = (con.clientWidth / 10) - 3,
                  row = {},
                  cell = {},
                  gc = document.getElementsByClassName("grid-container")[0],
                  cellwidth = (totalwidth - ((value - 1) * 1.5)) / value,
                  styles = [`.grid-cell{font-size:${cellwidth }em;}`, `.tile{font-size:${cellwidth }em;}`];
              do {
                  if (load === false) {
                      row = document.createElement("div");
                      row.setAttribute("class", "grid-row");
                  }
                  b = 1;
                  ca = (a - 1);
                  ba = (ca * (1.5 / cellwidth));
                  do {
                      if (load === false) {
                          cell = document.createElement("div");
                          cell.setAttribute("class", "grid-cell");
                          row.appendChild(cell);
                      }
                      cb = (b - 1);
                      bb = (cb * (1.5 / cellwidth));
                      styles.push(`
              .tile.tile-position-${a}-${b} {
                  -webkit-transform: translate(${ca + ba}em, ${cb + bb}em);
                  -moz-transform   : translate(${ca + ba}em, ${cb + bb}em);
                  -ms-transform    : translate(${ca + ba}em, ${cb + bb}em);
                  transform        : translate(${ca + ba}em, ${cb + bb}em);
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