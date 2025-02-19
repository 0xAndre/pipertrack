const { app, BrowserWindow, dialog } = require('electron');
const path = require("path");
const fs = require("fs");
const url = require("url");
const ipcHandlers = require('./ipcHandlers');

var args = process.argv.slice(1),
    serve = args.some(function (val) { return val === '--serve'; });

let win;

// Function to validate the existence and integrity of config.json
function validateConfig() {
    const basePath = process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(process.execPath);
    const configPath = path.join(basePath, 'config.json');

    if (!fs.existsSync(configPath)) {
        dialog.showErrorBox('Error', 'The config.json file was not found.');
        app.quit(); // Exit the application
        return;
    }

    try {
        const rawData = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(rawData);

        const requiredFields = ['azureDevOpsUrl', 'personalAccessToken', 'teamProjects'];
        for (const field of requiredFields) {
            if (!config[field] || (Array.isArray(config[field]) && config[field].length === 0)) {
                dialog.showErrorBox('Error', `The field "${field}" is missing or empty in config.json.`);
                app.quit();
                return;
            }
        }
    } catch (error) {
        dialog.showErrorBox('Error', 'The config.json file is invalid or corrupted.');
        app.quit();
    }
}

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
    validateConfig();
    createWindow();
    ipcHandlers();
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
