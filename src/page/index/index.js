import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'mobx-react'
 import Main from './Main/Main.jsx'
 import  { Todo, }   from './store.js'
 import '../../static/reset.css'
ReactDom.render(
     <Provider store={ Todo }>
            <Main />
     </Provider>,
     document.getElementById('root')

)

