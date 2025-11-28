const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // 👈 oculta automáticamente la barra de menú
    menuBarVisible: false, // 👈 evita que aparezca al presionar ALT
  });

  const htmlPath = path.join(__dirname, "dist", "index.html");

  win.loadFile(htmlPath);
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
