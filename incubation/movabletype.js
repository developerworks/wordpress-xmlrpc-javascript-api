/**
 * XML-RPC MovableType API
 * 
 * WordPress supports the MovableType XML-RPC API, which itself builds upon the
 * Blogger and metaWeblog APIs. This support was added in WordPress 1.5.0.
 * 
 * http://codex.wordpress.org/XML-RPC_MovableType_API
 * 
 * @param string
 *            url
 * @param string
 *            username
 * @param string
 *            password
 * 
 * @returns {MovableType}
 */
function MovableType(url, username, password) {
	this.url = url;
	this.username = username;
	this.password = password;

	this.request = new XmlRpcRequest(this.url);
};

/**
 * Publish an existing post.
 * 
 * http://codex.wordpress.org/XML-RPC_MovableType_API#mt.publishPost
 * 
 * @param int
 *            postid
 * 
 * @returns boolean
 */
MovableType.prototype.publishPost = function(blogid) {
	this.request.methodName = "mt.publishPost";

	this.request.addParam(blogid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();

};

/**
 * Retrieve the post titles of recent posts.
 * 
 * http://codex.wordpress.org/XML-RPC_MovableType_API#mt.getRecentPostTitles
 * 
 * @param int
 *            blogid
 * @param int
 *            numberOfPosts
 * 
 * @return array
 */
MovableType.prototype.getRecentPostTitles = function(blogid, numberOfPosts) {
	this.request.methodName = "mt.getRecentPostTitles";

	this.request.addParam(blogid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(numberOfPosts);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();

};
/**
 * Retrieve list of all categories.
 * 
 * http://codex.wordpress.org/XML-RPC_MovableType_API#mt.getCategoryList
 * 
 * @param int
 *            blogid
 * 
 * @returns array
 */
MovableType.prototype.getCategoryList = function(blogid) {
	this.request.methodName = "mt.getCategoryList";
	this.request.addParam(blogid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};

/**
 * Retrieve list of categories assigned to a post.
 * 
 * http://codex.wordpress.org/XML-RPC_MovableType_API#mt.getPostCategories
 * 
 * @param int
 *            postid
 * 
 * @returns array
 */
MovableType.prototype.getPostCategories = function(postid) {
	this.request.methodName = "mt.getPostCategories";
	this.request.addParam(postid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};

/**
 * Sets the categories for a post.
 * 
 * http://codex.wordpress.org/XML-RPC_MovableType_API#mt.setPostCategories
 * 
 * @param int
 *            postid
 * @param object
 *            categories
 * 
 * @returns boolean
 */
MovableType.prototype.setPostCategories = function(postid) {
	this.request.methodName = "mt.setPostCategories";
	this.request.addParam(postid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};

/**
 * Retrieve list of trackbacks sent to a post.
 * 
 * http://codex.wordpress.org/XML-RPC_MovableType_API#mt.getTracbackPings
 * 
 * @param int
 *            postid
 * 
 * @returns array
 */
MovableType.prototype.getTracbackPings = function(postid) {
	this.request.methodName = "mt.getTracbackPings";
	this.request.addParam(postid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};

/**
 * Retrieve list of methods supported by this XML-RPC server.
 * 
 * @returns array method names
 */
MovableType.prototype.supportedMethods = function() {
	this.request.methodName = "mt.supportedMethods";
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};

/**
 * Not supported. Will always return an empty array.
 */
MovableType.prototype.supportedTextFilters = function() {
	this.request.methodName = "mt.supportedTextFilters";
	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};