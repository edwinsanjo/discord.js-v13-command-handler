module.exports = {
	name: 'ready',
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};