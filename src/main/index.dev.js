/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
//require('electron-debug')({ showDevTools: true });
// NB: Don't open dev tools with this, it is causing the error
require('electron-debug')();

const { BrowserWindow } = require('electron');
const { session } = require('electron');
// Install `vue-devtools`
require('electron').app.on('ready', () => {
  /*let installExtension = require('electron-devtools-installer');
  installExtension
    .default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch((err) => {
      console.log('Unable to install `vue-devtools`: \n', err);
    });
  BrowserWindow.addDevToolsExtension('/Users/cuiwang/Workspace/vue-devtools-5.1.1/shells/chrome');*/
  session.defaultSession.loadExtension('/Users/cuiwang/Workspace/vue-devtools-5.1.1/shells/chrome');
  //BrowserWindow.addDevToolsExtension('/Users/cuiwang/Workspace/vue-devtools-5.1.1/shells/chrome');
});
// Require `main` process to boot app
require('./index');
