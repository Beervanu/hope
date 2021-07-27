process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
require('dotenv').config({path: '../.env'})
const IMAP = require('imap')

let imap = new IMAP({
	user: process.env.CYCLING_EMAIL,
	password: process.env.CYCLING_EMAIL_PASSWORD,
	host: 'imap.gmail.com',
	port: 993,
	tls: true
})

let readyFunc = async () => {
	console.log('here')
	imap.openBox('INBOX', (err, mb) => {
		console.log('second')
		imap.search(['RECENT', ['FROM', 'bot@notifications.heroku.com']], (err, uids) => {
			imap.fetch(uids[0]).on('message', (msg, seqno) => {
				console.log('hello')
				console.log(msg)

			})
		})
	})
}
imap.once('ready', () => {
	console.log('here')
	imap.openBox('INBOX', (err, mb) => {
		console.log('second')
		imap.search(['RECENT', ['FROM', 'bot@notifications.heroku.com']], (err, uids) => {
			imap.fetch(uids[0]).on('message', (msg, seqno) => {
				console.log('hello')
				console.log(msg)

			})
		})
	})
})

imap.connect()
// await wait

// readyFunc.then(() => console.log('hmm'))
