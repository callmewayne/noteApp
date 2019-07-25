import React from 'react'
import ReactDom from 'react-dom'

 import Main from './Main/Main.jsx'
 // 引入状态机管理供应商
import { Provider } from 'mobx-react';
import * as stores  from './../../stores'
 import '../../static/reset.css'
ReactDom.render(
     <Provider {...stores}>
            <Main />
     </Provider>,
     document.getElementById('root')

)

