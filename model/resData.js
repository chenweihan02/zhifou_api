/* 
  res返回数据模板
*/
const { currentTime } = require('../utils/getCurrentTime')

// class base {
//   constructor (dataName, content) {
//     this[dataName] = data
//   }
// }


class base {
  constructor (code, data) {
    this.code = code
    this.data = data
  }
}

/* 成功模板
  {
    code: 1,
    data: {  },
    successTime: 'xxx',
    msg?: ''
  }
*/

class success extends base {
  constructor (data, msg) {
    super(1, data)
    this.successTime = currentTime()
    if (msg) {
      this.msg = msg
    }    
  }
}

// class success extends base {
//   constructor (dataName, data, msg) {
//     super(dataName, data, msg)
//     this.code = 1
//     this.successTime = currentTime()
//     if (msg) {
//       this.msg = msg
//     }    
//   }
// }

/* 失败模板
  {
    code: 0,
    error: 'xxx',
    failTiem: 'xxx'
  }
*/
class fail extends base {
  constructor (msg) {
    super(0, {})
    this.failTime = currentTime()
    if (msg) {
      this.msg = msg
    }
  }
}



// const successData = (dataName, data, msg) => {
//   return new success(dataName, data, msg)
// }


// class success {
//   constructor (data, msg) {
//     this.code = 1
//     this,data = data
//     this.successTime = currentTime()
//     if (msg) {
//       this.msg = msg
//     }    
//   }
// }
/* 失败模板
  {
    code: 0,
    error: 'xxx',
    failTiem: 'xxx'
  }
*/

// class fail {
//   constructor (error) {
//     this.code = 0
//     this.error = error
//     this.failTime = currentTime()
//   }
// }

// class fail {
//   constructor (msg) {
//     this.code = 0
//     this.msg = msg
//     this.failTime = currentTime()
//   }
// }

const successData = (data, msg) => {
  return new success(data, msg)
}

const failData = (msg) => {
  return new fail(msg)
}

module.exports = {
  successData,
  failData
}
