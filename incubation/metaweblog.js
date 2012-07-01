/**
 * XML-RPC MetaWeblog API
 * 
 * WordPress supports the metaWeblog XML-RPC API, augmented with additional
 * WordPress-specific functionality (denoted by †) . This support was added in
 * WordPress 1.5.0.
 * 
 * @returns {MetaWeblog}
 */
function MetaWeblog(url, username, password) {
	this.url = url;
	this.username = username;
	this.password = password;

	this.request = new XmlRpcRequest(this.url);
};

/**
 * Retrieve a post.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getPost
 * 
 * @param int
 *            postid
 * @returns array
 */
MetaWeblog.prototype.getPost = function(postid) {
	this.request.methodName = "metaWeblog.getPost";

	this.request.addParam(postid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};

/**
 * Retrieve a list of recent posts.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getPost
 * 
 * @param int
 *            blogid
 * @param int
 *            numberOfPosts
 * 
 * @returns array
 */
MetaWeblog.prototype.getRecentPosts = function(blogid, numberOfPosts) {
	this.request.methodName = "metaWeblog.getRecentPosts";

	this.request.addParam(postid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(numberOfPosts);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();

};
/**
 * Create a new post.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.newPost
 * 
 * @param int
 *            blogid
 * @param object
 *            content
 * @param boolean
 *            publish
 */
MetaWeblog.prototype.newPost = function(blogid, content, publish) {
	this.request.methodName = "metaWeblog.newPost";

	this.request.addParam(blogid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(content);
	this.request.addParam(publish);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};
/**
 * Edit an existing post.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.editPost
 * 
 * @param int
 *            blogid
 * @param object
 *            content
 * @param boolean
 *            publish
 */
MetaWeblog.prototype.editPost = function(postid, content, publish) {
	this.request.methodName = "metaWeblog.editPost";

	this.request.addParam(postid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(content);
	this.request.addParam(publish);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};
/**
 * Delete an existing post. Equivalent to blogger.deletePost.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.deletePost
 * 
 * @param int
 *            postid
 * 
 * @returns boolean
 */
MetaWeblog.prototype.deletePost = function(postid) {
	this.request.methodName = "metaWeblog.deletePost";

	this.request.addParam(postid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};
/**
 * Retrieve list of categories.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getCategories
 * 
 * @param int
 *            blogid
 * 
 * @returns array
 */
MetaWeblog.prototype.getCategories = function(blogid) {
	this.request.methodName = "metaWeblog.getCategories";

	this.request.addParam(blogid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};
/**
 * Upload a media file.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.newMediaObject
 * 
 * @param int
 *            blogid
 * @param object
 *            data
 * 
 * @returns object
 */
MetaWeblog.prototype.newMediaObject = function(blogid, data) {
	this.request.methodName = "metaWeblog.newMediaObject";

	this.request.addParam(blogid);
	this.request.addParam(this.username);
	this.request.addParam(this.password);
	this.request.addParam(data);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};
/**
 * Returns information about all the blogs a given user is a member of.
 * Equivalent to blogger.getUsersBlogs.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getUsersBlogs
 * 
 * @returns object
 */
MetaWeblog.prototype.getUsersBlogs = function() {
	this.request.methodName = "metaWeblog.getUsersBlogs";

	this.request.addParam(this.username);
	this.request.addParam(this.password);

	var resp = this.request.send();
	this.request.clearParams();
	return resp.parseXML();
};
/**
 * Not supported. Please use the theme editor to manage your templates.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getTemplate
 */
MetaWeblog.prototype.getTemplate = function() {
};

/**
 * Not supported. Please use the theme editor to manage your templates.
 * 
 * http://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.setTemplate
 */
MetaWeblog.prototype.setTemplate = function() {
};
