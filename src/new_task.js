var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'task_queue'
    var msg = process.argv.slice(2).join('') || 'Hello World!'

    ch.assertQueue(q, {durable: true})
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, Buffer.from(msg), {persistent: true})
    console.log(process.argv, '******')
    console.log(' [x] Sent %s', msg)
  })
  setTimeout(function () { conn.close(); process.exit(0) }, 500)
})
