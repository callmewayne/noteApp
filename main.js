// import { app, BrowserWindow } from 'electron';
const {app, Menu, Tray,BrowserWindow} = require('electron')
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//   app.quit();
// }

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray ;
let contextMenu
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1208,
    height: 840,
    webPreferences: {
      nodeIntegration: true
  },
  frame:false
  });

  // and load the index.html of the app.
//   mainWindow.loadURL(`file://${__dirname}/index.html`);
mainWindow.loadURL(`http://localhost:9000/index.html`);

const  template = [{
  label: '文件',   //设置菜单项文本
  submenu: [    //设置子菜单
      {
          label: '关于',
          role: 'about',       // 设置菜单角色（关于），只针对 Mac  OS X 系统
          click: ()=>{     //设置单击菜单项的动作（弹出一个新的模态窗口）
              var aboutWin = new BrowserWindow({width:300,height:200,parent:mainWindow,modal: true});
              aboutWin.loadFile('https://geekori.com');}
      },
      {
          type: 'separator'       //设置菜单的类型是分隔栏
      },
      {
          label: '关闭',
          accelerator: 'Command+Q',      //设置菜单的热键
          click: ()=>{win.close()}
      }
  ]
},
  {
      label: '编辑',
      submenu: [
          {
              label: '复制',
              click: ()=>{win.webContents.insertText('复制')}

          },
          {
              label: '剪切',
              click: ()=>{win.webContents.insertText('剪切')}

          },
          {
              type: 'separator'
          },
          {
              label: '查找',
              accelerator: 'Command+F',
              click: ()=>{win.webContents.insertText('查找')}
          },
          {
              label: '替换',
              accelerator: 'Command+R',
              click: ()=>{win.webContents.insertText('替换')}
          }
      ]
  }
];


const menu = Menu.buildFromTemplate(template)
contextMenu = Menu.buildFromTemplate([
  {label: '复制', role:'copy'},
  {label: '粘贴', role:'paste'},
  {label: '剪切', role:'cut'}

  
])
tray =  new Tray('./netcase.ico')
tray.setToolTip('这是第一个托盘应用')
tray.setContextMenu(contextMenu)
// Menu.setApplicationMenu(menu)

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
