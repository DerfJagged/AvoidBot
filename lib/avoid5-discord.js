/**
 * avoid5-discord.js -- Discord-specific handlers.
 */

const avoid5 = require('./avoid5.js');

/**
 * Handles the specified Discord message.
 */
exports.handleMessage = message => {
  if (message.author.bot || config.ignoredChannels.includes(message.channel.id)) {
    return;
  }

  var stripped = avoid5.stripLinks(message.content);
  var results = avoid5.detect(stripped);
  if (results.count >= 8 || results.longestRun >= 3 || results.bolded) {
    const response = 'Too many fifthglyphs, or a bold glyph. Auto-kick.';
    message.channel.sendMessage(response);
    message.author.send(response);
    message.client.channels.get(config.logChannel).sendMessage(message.author + ' was kicked.');
    message.member.kick();
  } else if (results.count > 0 && !message.content.match(/@(?:here|everyone)/i)) {
    message.reply('fifthglyph found: ' + avoid5.mask(stripped));
  }
};