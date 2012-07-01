/**
 * Pingback constructor
 * 
 * @param string
 *            url
 * @param string
 *            username
 * @param string
 *            password
 * @returns {Pingback}
 */

function Pingback(url, username, password) {

	this.url = url;
	this.username = username;
	this.password = password;

	this.request = XmlRpcRequest(this.url);
};

/**
 * @param string
 *            sourceUri
 * @param string
 *            targetUri
 * 
 * @returns string
 */
Pingback.prototype.ping = function(sourceUri, targetUri) {

	this.request.methodName = "blogger.getUsersBlogs";

	this.request.addParam(sourceUri);
	this.request.addParam(targetUri);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};

/**
 * 
 * @param string
 *            url
 * @returns array URLs that pingbacked url
 */
Pingback.prototype.getPingbacks = function(url) {
	this.request.methodName = "pingback.extensions.getPingbacks";
	
	this.request.addParam(url);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();	
};