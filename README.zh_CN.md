WordPress XmlRpc Javascript Api
=====================

WordPress XmlRpc Javascript Api 是一个基于[mimic](http://mimic-xmlrpc.sourceforge.net/) xmlrpc 库的Wordpress XmlRpc 客户端库.
它实现了所有在 [XML-RPC_WordPress_API](http://codex.wordpress.org/XML-RPC_WordPress_API) 所描述的所有接口.

实例:
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
    // 运行 console.log(object); 输出此对象的属性
    
其他API接口的详细信息,亲,请你参考tests/wordpress-test.js这个单元测试脚本