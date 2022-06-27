const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        // title: "Interface CWC",
        icon: path.join(__dirname,"icons/appIcon.png"),
        autoHideMenuBar: true,
        // frame: false,
        width: 1000,
        heigh: 600,
        // show: false,
        // backgroundColor: '#2e2c29',
        webPreferences:
        {
            nodeIntegration: true,
            sandbox: false,
            contextIsolation: false,
            // preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('index.html');
    // win.once('ready-to-show', () =>{win.show()});

    win.webContents.openDevTools();
}

app.whenReady().then(()=>{
    createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

