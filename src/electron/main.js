const { app, BrowserWindow, nativeImage, dialog } = require('electron');
const path = require("path");
const fs = require("fs");
const url = require("url");

//update
const { autoUpdater } = require("electron-updater");

// handlers
const ipcHandlers = require('./ipcHandlers');

var args = process.argv.slice(1),
    serve = args.some(function (val) { return val === '--serve'; });

let win;

// force update on development
Object.defineProperty(app, 'isPackaged', {
    get() {
        return true;
    }
});

// Set update file
autoUpdater.updateConfigPath = path.join(__dirname, 'app-update.yml');

// Disable auto update on quit
autoUpdater.autoInstallOnAppQuit = false;

// Disable pre-release version
autoUpdater.allowPrerelease = false

autoUpdater.on('update-downloaded', (info) => {

    let options = {
        'type': 'question',
        'title': 'Update Available',
        'message': "Update available, do you want to install?",
        'icon': path.join(__dirname, '../public/icon.ico'),
        'buttons': [
            'Yes',
            'No'
        ]
    }

    dialog.showMessageBox(win, options)
        .then((result) => {
            if (result.response === 0) {
                autoUpdater.quitAndInstall();
            }
        })
});

function createWindow() {
    const iconPath = process.platform === 'darwin'
        ? path.join(__dirname, '../public/icon.icns')  // macOS
        : path.join(__dirname, '../public/icon.ico'); // Windows/Linux

    win = new BrowserWindow({
        width: 1280,
        height: 900,
        icon: iconPath,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            allowRunningInsecureContent: (serve) ? true : false,
        }
    });

    win.setMenu(null);
    win.maximize();
    win.setFullScreen(true);

    if (serve) {
        require('electron-reloader')(module)
        win.loadURL('http://localhost:4200')
        win.webContents.openDevTools({ mode: 'detach' });

    } else {
        // Path when running electron executable
        var pathIndex = './index.html';
        if (fs.existsSync(path.join(__dirname, '../out/pipertrack/browser/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../out/pipertrack/browser/index.html';
        }
        win.loadURL(url.format({
            pathname: path.join(__dirname, pathIndex),
            protocol: 'file:',
            slashes: true
        }))
    }

    win.on('closed', function () {
        win = null;
    });
}

// Validate config before initializing the application
app.whenReady().then(() => {
    createWindow();
    ipcHandlers();
    autoUpdater.checkForUpdates();
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
