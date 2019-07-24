const remote = require('electron').remote;
const dialog = remote.dialog;
const ipcMain = remote.ipcMain;
const {ipcRenderer} = require('electron')


const windowManager = {
    win : remote.getCurrentWindow(),
    closeWindow(){
        this.win.close();
    },
    minimize(){
        this.win.minimize();
    },
    maximize(){
        this.win.maximize();
    },
    isMinimized(){
      return  this.win.isMinimized();
    },
    isMaximized(){
        return  this.win.isMaximized();
      },
    restore(){
        this.win.restore();
      },

      setSize(){
          this.win.setBounds({ x: 300, y: 80, width: 1208, height: 840 })
      },
      openDevTool(){
          this.win.webContents.openDevTools()
      },
      dragElement(ele){

     
      }
}



  


export {windowManager} 
    
