import { app, Menu, BrowserWindow } from 'electron';
//import autoUpdater from './update.js';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

let mainWindow;

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  /*mainWindow = new BrowserWindow({
    fullscreen: true
  })*/
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 1024,
    minHeight: 768,
    //frame: false,
    title: '数据标注工具',
    useContentSize: true,
  });
  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  // 这里只在生产环境才执行版本检测。
  /* if (process.env.NODE_ENV === 'production') {
    autoUpdater.checkForUpdates();
  }*/
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
