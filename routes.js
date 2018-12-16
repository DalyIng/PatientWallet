const routes = require('next-routes')();

routes
	.add('/wallet/login', '/wallet/login')
	.add('/wallet/signup', '/wallet/signup')
	.add('/wallet/:addressPromise','/wallet/welcome')
	.add('/wallet/:addressPromise/medicalRecords','/wallet/medicalRecords/show')
	.add('/wallet/:addressPromise/medicalRecords/new','/wallet/medicalRecords/new')
	.add('/wallet/provider/providerLogin','/wallet/provider/providerLogin')
	.add('/wallet/provider/:walletAddressFactory','/wallet/provider/showProvider')
	.add('/wallet/:addressPromise/profile', '/wallet/profile' );


module.exports = routes;
