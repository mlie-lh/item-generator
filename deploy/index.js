'use strict'
const client = require('scp2')
const readline = require('readline')
const readlineAction = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const questions = ['Please input server username: ', 'Please input server password: ']
const answerList = []
let index = 0

function askAction(index) {
  if (index === questions.length) {
    load()
    readlineAction.history = []
    return
  }
  readlineAction.question(questions[index], val => {
    if (!val) {
      askAction(index)
    } else {
      answerList[index] = val
      index++
      askAction(index)
    }
  });
}

askAction(index)

function load() {
  client.scp('./dist/', {
    "host": "1.116.228.224",
    "username": answerList[0],
    "password": answerList[1],
    "port": "22",
    "path": "/root/project/item-generator/dist"
  }, function (err) {
    if (!err) {
      console.log("上传完毕")
    } else {
      console.log("err", err)
    }
    process.exit(0)
  })
}
