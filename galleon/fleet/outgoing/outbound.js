/* -- Modules -- */
// Essential
var eventEmmiter = require('events').EventEmitter;
var util = require("util");
var fs = require("fs");

// Foundations
var nodemailer = require('nodemailer');
var validator = require('validator');

// Utils
var _ = require('lodash');

/* -- ------- -- */

//
/* -------------- Module Human description -------------- */
/*

		Outbound module will take care of all outbound
	mails initiated through the API.
	
		Emails sent with proper header and DKIM will
	most likely be sent to the inbox but many other
	requirements are there to get around. This has to
	do with the nature of Mail Servers and while many
	advise to use a SMTP provider for outbound mails
	it would not be necessary if strict guidlines are
	followed.
	
		An example of blockage by GMail can be
	represented by a message indicating such and can
	be caught by the callback created using this
	module.
	
		Common best practices for sending emails can
	be found on most major providers such as GMail at
	
	http://support.google.com/mail/bin/answer.py?hl=en&answer=188131
	
	*	Galleon will include a tutorial on how to
	create a legitimate server and will most likely
	include automation tools in the coming versions.
	The goal here is to enable anyone with a static
	IP and some storage to setup a mail server.

*/
/* -------------- ------------------------ -------------- */
//

/* * Performance (Lightweight server - Tier 1 Connection - 0.5GB RAM)
----------------
* Mailforwarding (Gmail to Server to Gmail): 4-6 seconds
* Outbound Mail (Server to Gmail): 2-3 seconds
----------------
*/

/* Initiate an outbound transporter. */
var Outbound = function (environment, callback) {
  this.environment = environment;
  eventEmmiter.call(this);
}

util.inherits(Outbound, eventEmmiter);

Outbound.prototype.createTransporter = function (transporter, callback) {
  try {
    if ((transporter == null) || (!transporter))
      transporter = nodemailer.createTransport();

    callback(undefined, transporter);
  } catch (error) { callback(error) };
}

// Currently only sends to individual emails
// #Revisit - Should add an array option to pass multiple senders and receivers
Outbound.prototype.send = function (mail, options, callback) {
  var _this = this;

  // Humane programming
  if ((options.constructor !== Object) && (!callback)) { callback = options; options = {} }
  if (!options.transporter) transporter = nodemailer.createTransport();
  else transporter = options.transporter;

  // Improve error handling here
  if (!mail) return _this.emit('failed', { error: "Mail Object is undefined!" });

  /* -------------------------------------------------------------- */

  // Load outbound modules
  _this.environment.modulator.launch('outbound', mail, function (error, _mail) {

    if (_mail !== undefined) mail = _mail;

    /* Better ways to do this | Rough setup for testing */
    _.each(mail.attachments, function (attachment, index) {
      // Rename a few things to match nodemailer
      attachment.filename = attachment.fileName;
      attachment.encoding = attachment.transferEncoding;
      /* Bad practice, shouldn't trust database path -> Use environment instead */
      /* Must test against checksum */
      attachment.content = fs.createReadStream(attachment.path);
      attachment = _.omit(attachment, ["fileName", "path", "id", "checksum", "length"]);
      mail.attachments[index] = attachment;
    })

    transporter.sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      attachments: mail.attachments
    }, function (error, response) {
      if (!!error) {
        callback(error, response);
        _this.emit('failed', error, response);
      } else {
        callback(error, response);
        _this.emit('sent', response);
      }
    });
  })
};

module.exports = Outbound;
