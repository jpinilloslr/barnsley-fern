const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

let mainWindow

class Application {
    constructor() {
        this.mainWindow = null;
        this.bootstrap();
    }

    createWindow() {
        this.mainWindow = new BrowserWindow({
            resizable: false,
            width: 800, 
            height: 600
        });

        this.mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));

        this.mainWindow.on('closed', function () {
            this.mainWindow = null;
        });
    }

    bootstrap() {
        app.on('ready', this.createWindow);

        app.on('window-all-closed', function () {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', function () {
            if (this.mainWindow === null) {
                this.createWindow();
            }
        });
    }
}

new Application();