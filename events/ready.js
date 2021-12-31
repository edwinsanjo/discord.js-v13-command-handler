module.exports = {
	name: 'ready',
	execute(client) {
		console.log(`┌─────────────────────────────────────────────────────────────┐`.bold.blue)
		console.log(`│                                                             │`.bold.blue)
		console.log(`│                                                             │`.bold.blue)
		console.log(`│                   `.blue.bold,`Logged In as ${client.user.tag}`.green.bold,`                 │`.bold.blue)
		console.log(`│                                                             │`.bold.blue)
		console.log(`│                                                             │`.bold.blue)
		console.log(`└─────────────────────────────────────────────────────────────┘`.bold.blue)
	},
};