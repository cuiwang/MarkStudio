import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import { ipcMain } from 'electron';
let mainWindow = null;
export function updateHandle(window) {
  mainWindow = window;
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('App update starting...');
  //设置更新包的地址
  //监听升级失败事件
  autoUpdater.on('error', function(error) {
    sendUpdateMessage({
      cmd: 'error',
      message: error,
    });
  });
  //监听开始检测更新事件
  autoUpdater.on('checking-for-update', function(message) {
    sendUpdateMessage({
      cmd: 'checking-for-update',
      message: message,
    });
  });
  //监听发现可用更新事件
  autoUpdater.on('update-available', function(message) {
    sendUpdateMessage({
      cmd: 'update-available',
      message: message,
    });
  });
  //监听没有可用更新事件
  autoUpdater.on('update-not-available', function(message) {
    sendUpdateMessage({
      cmd: 'update-not-available',
      message: message,
    });
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function(progressObj) {
    sendUpdateMessage({
      cmd: 'download-progress',
      message: progressObj,
    });
  });
  //监听下载完成事件
  autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateUrl) {
    sendUpdateMessage({
      cmd: 'update-downloaded',
      message: {
        releaseNotes,
        releaseName,
        releaseDate,
        updateUrl,
      },
    });
    //退出并安装更新包
    autoUpdater.quitAndInstall();
  });

  //接收渲染进程消息，开始检查更新
  ipcMain.on('checkForUpdate', (e, arg) => {
    //执行自动更新检查
    // sendUpdateMessage({cmd:'checkForUpdate',message:arg})
    autoUpdater.checkForUpdatesAndNotify();
  });
}
//给渲染进程发送消息
function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text);
}
