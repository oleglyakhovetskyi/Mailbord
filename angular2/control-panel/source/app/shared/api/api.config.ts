export const API_CONFIG = {

	// domain: "http://steadywork.pro:8080",
  domain: "http://localhost:59039",
  galleon: "http://steadywork.pro:3080",
  // galleon:"http://localhost:3070",

  galleonLogin: "/access/login",
  signalrUrl: '/signalr',
  hubName: 'MailHub',
  compose: "/send",
	apiPreffix: "/api",
	api: {
		registration: "/account/registration",
		login: "/token",
    inbox: '/mail/getall',
    trash: '/mail/trash',
    important: '/mail/important',
    remove: '/mail/delete',
    profileupdate: "/account/profileupdate",
    profiledata: "/account/profiledata",
    imageUpdate: "/image/update",
    // sendtest: "/mail/sendtest"
    sendtest: "/mail/getnew"
	}

}
