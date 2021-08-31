import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import http from 'http';

// see  https://www.electron.build/auto-update#events
autoUpdater.on('update-downloaded', (info) => {
  if (process.env.NODE_ENV === 'production') {
    // https://electronjs.org/docs/api/auto-updater#autoupdaterquitandinstall
    const req = http.request('http://localhost:7888/datasmark/info.txt', (req) => {
      let detail = '';
      req.setEncoding('utf-8');
      req.on('data', (chunk) => {
        detail += chunk.toString();
      });
      req.on('end', () => {
        dialog.showMessageBox(
          {
            icon: __static + '/favicon.png',
            type: 'info',
            title: '软件更新',
            message: `已更新到最新版本（${info.version}）请重启应用。`,
            detail: detail,
            buttons: ['确定'],
          },
          (idx) => {
            if (idx === 0) {
              autoUpdater.quitAndInstall();
            }
          },
        );
      });
    });
    req.end();
  }
});

export default autoUpdater;
