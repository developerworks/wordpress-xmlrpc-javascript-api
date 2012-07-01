WordPress XmlRpc Javascript Api
=====================

WordPress XmlRpc Javascript Api is a wordpress api javascript client based on [mimic](http://mimic-xmlrpc.sourceforge.net/) xmlrpc client.
It implement all interfaces descripted at [XML-RPC_WordPress_API](http://codex.wordpress.org/XML-RPC_WordPress_API).

Examples:
======
    var connection = {
        url : "your xmlprc url such as http://www.exmaple.com/xmlrpc.php",
        username : "you login name",
        password : "you password"
    };
    var wp = new WordPress(connection.url, connection.username, connection.password);
    var blogId = 1;
    var postId = 1;
    var object = wp.getPost(blogId, postId);
    // run console.log(object); to output the attributes of the object 
    
About others api usage details, you can see tests/wordpress-test.js