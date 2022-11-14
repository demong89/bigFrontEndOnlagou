// import {log} from './logger'
// import { name ,version} from '../package.json'

// import _ from 'lodash-es'

// import cjs from './cjs-common'

// import message from './messages'

// const msg = message.hi;

// log(msg);
// console.log(name ,version);
// log(_.camelCase('hello  world'))
// console.log(cjs);

import('./logger').then(({log})=>{
    log('code splitting')
})


