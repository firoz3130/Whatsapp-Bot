const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log("Please scan the QR code to log in");
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	} else if(message.body === '!hello') {
		client.sendMessage(message.from, 'Hello! How can I help you today?');
	} else if(message.body === '!time') {
		const currentTime = new Date();
		client.sendMessage(message.from, `The current time is ${currentTime.toLocaleTimeString()}`);
	} else if(message.body === '!date') {
		const currentDate = new Date();
		client.sendMessage(message.from, `Today's date is ${currentDate.toLocaleDateString()}`);
	} else if(message.body.startsWith('!sum')) {
		const numbers = message.body.split(' ').slice(1);
		const sum = numbers.reduce((a, b) => a + parseInt(b), 0);
		client.sendMessage(message.from, `The sum of ${numbers} is ${sum}`);
	} else {
		client.sendMessage(message.from, 'I do not understand what you are asking for. Try using !ping, !hello, !time, !date, or !sum followed by numbers.');
	}
});

client.initialize();
