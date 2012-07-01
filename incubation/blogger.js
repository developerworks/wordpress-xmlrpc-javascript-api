/**
 * WordPress supports the Blogger XML-RPC API methods, augmented with additional WordPress-specific functionality (denoted by †) . 
 * This support was added in WordPress 1.5.0.The original Blogger API spec lived at http://plant.blogger.com/api, but is no longer available.
 * 
 * http://codex.wordpress.org/XML-RPC_Blogger_API
 */

/**
 * 
 * 
 * @param string
 *            url The wordpress xmlrpc endpoint
 * @param string
 *            username Login username
 * @param string
 *            password Login password
 */
function Blogger(url, username, password) {
	this.url = url;
	this.username = username;
	this.password = password;
	this.request = new XmlRpcRequest(this.url);
};

Blogger.prototype.getUsersBlogs = function() {
	this.request.methodName = "blogger.getUsersBlogs";

	this.request.addParam("");
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};
