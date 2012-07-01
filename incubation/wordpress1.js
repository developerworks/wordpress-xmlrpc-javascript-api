/**
 * @deprecated
 */
var WordPressApi = {
	/**
	 * Initialize xmlrpc connection parameters
	 * 
	 * @object A dictionary that includes connection parameters to connect to xmlrpc.php of wordpress
	 */
	init: function(object) {
		this.url = object.url;
		this.username = object.username;
		this.password = object.password;

		this.request = new XmlRpcRequest(this.url);
	},

	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPost
	 * 
	 * @param int blog_id
	 * @param int post_id
	 * @param array bields
	 * @return object
	 */
	getPost: function(blog_id, post_id, fields) {

		this.request.methodName = "wp.getPost";

		this.request.addParam(blog_id);
		this.request.addParam(this.username);
		this.request.addParam(this.password);
		this.request.addParam(post_id);
		this.request.addParam(fields);

		var resp = this.request.send();

		this.request.clearParams();
		return resp.parseXML();
	},
	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPosts
	 * 
	 * @param int blog_id
	 * @return object
	 */
	getPosts: function(blog_id) {

		this.request.methodName = "wp.getPosts";

		this.request.addParam(blog_id);

		var resp = this.request.send();
		this.request.clearParams();
		return resp.parseXML();
	},
	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.newPost
	 * 
	 * Create a new post of any registered post type.
	 * 
	 * @param int blog_id
	 * @param object content
	 * @return post_id int
	 */
	newPost: function(blog_id, content) {

		this.request.methodName = "wp.newPost";

		this.request.addParam(blog_id);
		this.request.addParam(this.username);
		this.request.addParam(this.password);
		this.request.addParam(content);

		var resp = this.request.send();
		this.request.clearParams();
		return resp.parseXML();
	},

	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.editPost
	 * Edit an existing post of any registered post type.
	 * 
	 * @param int blog_id
	 * @param int post_id
	 * @param content object
	 * @return boolean
	 */
	editPost: function(blog_id, post_id, content) {
		this.request.methodName = "wp.editPost";

		this.request.addParam(blog_id);
		this.request.addParam(this.username);
		this.request.addParam(this.password);
		this.request.addParam(post_id);
		this.request.addParam(content);

		var resp = this.request.send();
		this.request.clearParams();
		return resp.parseXML();
	},

	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.deletePost
	 * Delete an existing post of any registered post type.
	 *
	 * @param int blog_id
	 * @param int post_id
	 * @return boolean
	 */
	deletePost: function() {
		this.request.methodName = "wp.deletePost";
		var resp = this.request.send();
		this.request.clearParams();

/*
			 TODO:: Exceptions handling
			 无权限
			 401: If the user does not have permission to delete the post.
			 不存在
			 404: If no post with that post_id exists.
			 
			 */
		return resp.parseXML();
	},

	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostType
	 * Retrieve a registered post type.
	 * 
	 * @param int blog_id 
	 * @param string post_type_name 
	 * @param array fields
	 * 
	 * @return struct
	 */
	getPostType: function(blog_id, post_type_name, fields) {

		this.request.methodName = "wp.getPostType";

		this.request.addParam(blog_id);
		this.request.addParam(this.username);
		this.request.addParam(this.password);
		this.request.addParam(post_type_name);
		this.request.addParam(fields);

		var resp = this.request.send();
		this.request.clearParams();
		return resp.parseXML();
	},

	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostTypes
	 * Retrieve list of registered post types.
	 * 
	 * @param int blog_id
	 * @param array filter
	 * @param array fields
	 * 
	 * @return struct
	 */
	getPostTypes: function(blog_id, filter, fields) {
		this.request.methodName = "wp.getPostTypes";

		this.request.addParam(blog_id);
		this.request.addParam(this.username);
		this.request.addParam(this.password);
		this.request.addParam(filter);
		this.request.addParam(fields);

		var resp = this.request.send();
		this.request.clearParams();
		return resp.parseXML();
	},

	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostFormats
	 * Retrieve list of post formats.
	 * 
	 * @param int blog_id
	 * @param array filter
	 * 
	 * @return struct
	 */
	getPostFormats: function(blog_id, filter) {
		this.request.methodName = "wp.getPostFormats";

		this.request.addParam(blog_id);
		this.request.addParam(this.username);
		this.request.addParam(this.password);
		this.request.addParam(filter);

		var resp = this.request.send();
		this.request.clearParams();
		return resp.parseXML();
	},

	/**
	 * http://codex.wordpress.org/XML-RPC_WordPress_API/Posts#wp.getPostStatusList
	 * Retrieve list of supported values for post_status field on posts.
	 * 
	 * @param int blog_id
	 * 
	 * @return struct
	 */
	getPostStatusList: function(blog_id) {
		this.request.methodName = "wp.getPostStatusList";
		this.request.addParam(blog_id);
		this.request.addParam(this.username);
		this.request.addParam(this.password);

		var resp = this.request.send();
		this.request.clearParams();
		return resp.parseXML();
	}
};