/*!
 *	Mimic (XML-RPC Client for JavaScript) v2.2 
 *	Copyright (C) 2005-2012 Carlos Eduardo Goncalves (cadu.goncalves@gmail.com)
 *
 *	Mimic is dual licensed under the MIT (http://opensource.org/licenses/mit-license.php) 
 * 	and GPLv3 (http://opensource.org/licenses/gpl-3.0.html) licenses.
 */

// -----------------------------------------------------------------------
// JavaScript Type detection
// -----------------------------------------------------------------------
module("JavaScript Types");

test("Boolean detection", function() {
	expect(2);
	equal(XmlRpc.getDataTag(false), "boolean", "Match literal");
	equal(XmlRpc.getDataTag(new Boolean(true)), "boolean", "Match object");
});

test("Array detection", function() {
	expect(2);
	equal(XmlRpc.getDataTag( [ 1, "name", false ]), "array", "Match literal");
	equal(XmlRpc.getDataTag(new Array()), "array", "Match object");
});

test("String detection", function() {
	expect(2);
	equal(XmlRpc.getDataTag("hello"), "string", "Match literal");
	equal(XmlRpc.getDataTag(new String()), "string", "Match object");
});

test("Number detection", function() {
	expect(4);
	equal(XmlRpc.getDataTag(1000), "int", "Match literal");
	equal(XmlRpc.getDataTag(10.33), "double", "Match literal");
	equal(XmlRpc.getDataTag(new Number(3.14159265)), "double", "Match object");
	equal(XmlRpc.getDataTag(new Number(2)), "int", "Match object");
});

test("Date detection", function() {
	expect(2);
	equal(XmlRpc.getDataTag(new Date()), "dateTime.iso8601", "Match object");
	equal(XmlRpc.getDataTag(new Date(9999999)), "dateTime.iso8601", "Match object");
});

test("Base64 detection", function() {
	expect(2);
	equal(XmlRpc.getDataTag(new Base64("")), "base64", "Match object");
	equal(XmlRpc.getDataTag(new Base64("base64")), "base64", "Match object");
});

test("Object detection", function() {
	expect(2);
	equal(XmlRpc.getDataTag( {
		name : "Mimic"
	}), "struct", "Match literal");
	equal(XmlRpc.getDataTag(new Object()), "struct", "Match object");
});


// -----------------------------------------------------------------------
// XML-RPC Type Detection 
// -----------------------------------------------------------------------
module("XML-RPC Types");

test("Boolean detection", function() {
	// Fixture		
	var value = XmlRpc.getTagData("boolean");
	// Test	
	expect(2);
	ok(typeof value !== "boolean", "Is not literal");
	ok(value.constructor === Boolean, "Is new Boolean");
});

test("Array detection", function() {
	// Fixture		
	var value = XmlRpc.getTagData("array");	
	// Test	
	expect(2);
	ok(typeof value !== "array", "Is not literal");
	ok(value.constructor === Array, "Is new Array");
});

test("String detection", function() {
	// Fixture	
	var value = XmlRpc.getTagData("string");	
	// Test	
	expect(2);
	ok(typeof value !== "string", "Is not literal");
	ok(value.constructor === String, "Is new String");
});

test("Int detection", function() {
	// Fixture
	var value = XmlRpc.getTagData("int");	
	// Test	
	expect(4);
	ok(typeof value !== "number", "Is not literal");
	ok(value.constructor === Number, "Is new Number");
	
	// Fixture
	value = XmlRpc.getTagData("double");
	// Test	
	ok(typeof value !== "number", "Is not literal");
	ok(value.constructor === Number, "Is new Number");
});

test("Double detection", function() {
	// Fixture	
	var value = XmlRpc.getTagData("double");
	// Test	
	expect(2);
	ok(typeof value !== "number", "Is not literal");
	ok(value.constructor === Number, "Is new Number");
});

test("DateTime.iso8601 detection", function() {
	// Fixture	
	var value = XmlRpc.getTagData("datetime.iso8601");	
	// Test	
	expect(2);
	ok(typeof value === "object", "Is object");
	ok(value.constructor === Date, "Is new Date");
});

test("Base64 detection", function() {
	// Fixture
	var value = XmlRpc.getTagData("base64");	
	// Test	
	expect(2);
	ok(typeof value === "object", "Is object");
	ok(value.constructor === Base64, "Is new Base64")
});

test("Struct detection", function() {
	// Test	
	expect(1);
	ok(typeof XmlRpc.getTagData("struct") === "object", "Is Object");
});


// -----------------------------------------------------------------------
// Marshal
// -----------------------------------------------------------------------
module("Marshal");

test("Boolean marshal", function() {
	// Fixture	
	var request, valueA, valueB;
	request = new XmlRpcRequest();
	valueA = new Boolean(false);
	valueB = true;
	// Test
	expect(4);
	ok(/^\<boolean\>0\<\/boolean\>\n$/.test(request.marshal(valueA)), "Serialization is ok");
	ok(/^\<boolean\>1\<\/boolean\>\n$/.test(request.marshal(valueB)), "Serialization is ok");
	notEqual(request.marshal(valueA), request.marshal(valueB), "Values must be different");
	equal(request.marshal(valueA), request.marshal(valueA), "Values must be equal");
});

test("Array marshal", function() {
	// Fixture	
	var request, valueA, valueB;
	request = new XmlRpcRequest();
	valueA = [ 1, 2, 3 ];
	valueB = new Array();
	valueB.push("1");
	valueB.push("2");
	valueB.push("3");
	// Test
	expect(4);
	ok(/^\<array\>(.*)/.test(request.marshal(valueA)), "Serialization is ok");
	ok(/^\<array\>(.*)/.test(request.marshal(valueB)), "Serialization is ok");
	notEqual(request.marshal(valueA), request.marshal(valueB), "Values must be different");
	equal(request.marshal(valueA), request.marshal(valueA), "Values must be equal");
});

test("Array of Array marshal", function() {
	// Fixture	
	var request, valueA, valueB;
	request = new XmlRpcRequest();
	valueA = [[1,2], ["a", "b"]];
	// Test
	expect(1);
	ok(/^\<array\>\n\<data\>\n\<value\>\n\<array\>(.*)/.test(request.marshal(valueA)), "Serialization is ok");
});

test("String marshal", function() {
	// Fixture	
	var request, valueA, valueB;
	request = new XmlRpcRequest();
	valueA = "Jonh";
	valueB = new String("Mary");
	// Test
	expect(4);
	ok(/^\<string\>Jonh\<\/string\>\n$/.test(request.marshal(valueA)), "Serialization is ok");
	ok(/^\<string\>Mary\<\/string\>\n$/.test(request.marshal(valueB)), "Serialization is ok");
	notEqual(request.marshal(valueA), request.marshal(valueB), "Values must be different");
	equal(request.marshal(valueA), request.marshal(valueA), "Values must be equal");
});

test("Number marshal", function() {
	// Fixture	
	var request, valueIntA, valueIntB, valueDoubleA, valueDoubleB;
	request = new XmlRpcRequest();
	valueIntA = 33;
	valueIntB = new Number(9999);	
	valueDoubleA = 33.01;
	valueDoubleB = new Number(9999.01);
	
	// Test
	expect(8);
	ok(/^\<int\>33\<\/int\>\n$/.test(request.marshal(valueIntA)), "Serialization is ok");
	ok(/^\<int\>9999\<\/int\>\n$/.test(request.marshal(valueIntB)), "Serialization is ok");
	ok(/^\<double\>33.01\<\/double\>\n$/.test(request.marshal(valueDoubleA)), "Serialization is ok");
	ok(/^\<double\>9999.01\<\/double\>\n$/.test(request.marshal(valueDoubleB)), "Serialization is ok");	
	notEqual(request.marshal(valueIntA), request.marshal(valueIntB), "Values must be different");
	notEqual(request.marshal(valueDoubleA), request.marshal(valueDoubleB), "Values must be different");	
	equal(request.marshal(valueIntA), request.marshal(valueIntA), "Values must be equal");	
	equal(request.marshal(valueDoubleA), request.marshal(valueDoubleA), "Values must be equal");	
});

test("Date marshal", function() {
	// Fixture	
	var request, valueA, valueB;
	request = new XmlRpcRequest();
	valueA = new Date();
	valueB = new Date(9999999);
	// Test
	expect(4);
	ok(/^\<dateTime.iso8601\>(.*)\<\/dateTime.iso8601\>\n$/.test(request.marshal(valueA)), "Serialization is ok");
	ok(/^\<dateTime.iso8601\>(.*)\<\/dateTime.iso8601\>\n$/.test(request.marshal(valueB)), "Serialization is ok");
	notEqual(request.marshal(valueA), request.marshal(valueB), "Values must be different");
	equal(request.marshal(valueA), request.marshal(valueA), "Values must be equal");
});

test("Base64 marshal", function() {
    // Fixture	
	var request, valueA, valueB;
	request = new XmlRpcRequest();
	valueA = new Base64("user");
	valueB = new Base64("password");
	// Test
	expect(4);
	ok(/^\<base64\>(.*)\<\/base64\>\n$/.test(request.marshal(valueA)), "Serialization is ok");
	ok(/^\<base64\>(.*)\<\/base64\>\n$/.test(request.marshal(valueB)), "Serialization is ok");
	notEqual(request.marshal(valueA), request.marshal(valueB), "Values must be different");
	equal(request.marshal(valueA), request.marshal(valueA), "Values must be equal");
});

test("Object marshal", function() {
    // Fixture	
	var request, valueA, valueB;
	request = new XmlRpcRequest();
	valueA = {
		name: "Mimic",
		version: 2.01
	};
	valueB = new Object();
	valueB.name = "Other";
    valueB.version = 2.01;
    	
	// Test
	expect(4);
	ok(/^\<struct\>(.*)/.test(request.marshal(valueA)), "Serialization is ok");
	ok(/^\<struct\>(.*)/.test(request.marshal(valueB)), "Serialization is ok");
	notEqual(request.marshal(valueA), request.marshal(valueB), "Values must be different");
	equal(request.marshal(valueA), request.marshal(valueA), "Values must be equal");
});


// -----------------------------------------------------------------------
// Unmarshal
// -----------------------------------------------------------------------
module("Unmarshal");

test("Boolean unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<value>", "<boolean>0</boolean>", "</value>")
	xml.push("<value>", "<boolean>1</boolean>", "</value>")	
	xml.push("</param>");
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(2);
	response.parseXML();
	equal(response.params[0], false, "Match false");
	equal(response.params[1], true, "Match true");
});

test("Array unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<array>", "<data>");
	xml.push("<value>", "<string>friends</string>", "</value>");
	xml.push("<value>", "<string>preferences</string>", "</value>");
	xml.push("<value>", "<string>likes</string>", "</value>");
	xml.push("<value>", "<array>", "<data>");
	xml.push("<value>", "<int>10</int>", "</value>");
	xml.push("<value>", "<int>20</int>", "</value>");
	xml.push("<value>", "<int>30</int>", "</value>");	
    xml.push("</data>", "</array>", "</value>");	
	xml.push("</data>", "</array>");		
	xml.push("</param>");	
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(4);
	response.parseXML();
	equal(response.params[0][0], "friends", "Value match");
	equal(response.params[0][1], "preferences", "Value match");
	equal(response.params[0][2], "likes", "Value match");	
	deepEqual(response.params[0][3], [10, 20, 30], "Inner array match");
});

test("String unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<value>", "<string>Hello world</string>", "</value>")	
	xml.push("</param>");
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(1);
	response.parseXML();
	equal(response.params[0], "Hello world");
});

test("Int unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<value>", "<int>9129932</int>", "</value>")	
	xml.push("<value>", "<i4>4</i4>", "</value>")
	xml.push("</param>");
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(2);
	response.parseXML();
	equal(response.params[0], 9129932, "Match number");
	equal(response.params[1], 4, "Match number");
});

test("Double unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<value>", "<double>9129.932</double>", "</value>")	
	xml.push("<value>", "<double>4</double>", "</value>")
	xml.push("</param>");
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(2);
	response.parseXML();
	equal(response.params[0], 9129.932, "Match number");
	equal(response.params[1], 4, "Match number");
});

test("Date unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<value>", "<dateTime.iso8601>20120120T15:08:55</dateTime.iso8601>", "</value>")	
	xml.push("</param>");
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(1);
	response.parseXML();
	ok(response.params[0].constructor === Date, "Must match Date");
});

test("Base64 unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<value>", "<base64>eW91IGNhbid0IHJlYWQgdGhpcyE=</base64>", "</value>")	
	xml.push("</param>");
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(1);
	response.parseXML();
	ok(response.params[0].constructor === Base64, "Must match Bas64");
});

test("Struct unmarshal", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>","<params>");
	xml.push("<param>");
	xml.push("<struct>");
	// Hash	
	xml.push("<member>");
	xml.push("<name>", "hash", "</name>");	
	xml.push("<value>", "<base64>eW91IGNhbid0IHJlYWQgdGhpcyE=</base64>", "</value>");	
	xml.push("</member>");
	// Age	
	xml.push("<member>");
	xml.push("<name>", "age", "</name>");	
	xml.push("<value>", "<string>365</string>", "</value>");
	xml.push("</member>");
	// User
	xml.push("<member>");
	xml.push("<name>", "user", "</name>");	
	xml.push("<value>", "<string>johndoe</string>", "</value>");	
	xml.push("</member>");
	// Friends
	xml.push("<member>");
	xml.push("<name>", "friends", "</name>");	
	xml.push("<value>", "<array>", "<data>");	
	xml.push("<value>", "<string>mary</string>", "</value>");
	xml.push("<value>", "<string>carlos</string>", "</value>");
	xml.push("<value>", "<string>nadia</string>", "</value>");	
	xml.push("</data>", "</array>", "</value>");		
	xml.push("</member>");	
	xml.push("</struct>");	
	xml.push("</param>");	
	xml.push("</params>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(4);
	response.parseXML();
	ok(response.params[0].hash.constructor === Base64, "Hash match");
	equal(response.params[0].age, "365", "Age match");
	equal(response.params[0].user, "johndoe", "User match");
	deepEqual(response.params[0].friends, ["mary", "carlos", "nadia"], "Array of friends match");
});


// -----------------------------------------------------------------------
// Miscellaneous
// -----------------------------------------------------------------------
module("Miscellaneous");

test("Request params", function() {
	// Fixture	
	var request = new XmlRpcRequest();
	
	// Test
	expect(3);
	request.addParam("username");
	request.addParam(false);
	ok(request.params.length == 2, "Two params");
	request.clearParams();	
	ok(request.params.length == 0, "No params");
	request.addParam(12);
	ok(request.params.length == 1, "One param");
});


test("Fault response", function() {
	// Fixture	
	var xml, response;	
	xml = [];
	xml.push("<methodResponse>", "<fault>", "<value>");
	xml.push("<struct>");
	// Fault code
	xml.push("<member>");
	xml.push("<name>", "faultCode", "</name>");	
	xml.push("<value>", "<int>404</int>", "</value>");	
	xml.push("</member>");
	// Fault string	
	xml.push("<member>");
	xml.push("<name>", "faultString", "</name>");	
	xml.push("<value>", "<string>Not found</string>", "</value>");	
	xml.push("</member>");	
	xml.push("</struct>");
	xml.push("</value>","</fault>","</methodResponse>");
	response = new XmlRpcResponse(Builder.buildDOM(xml.join("")));
	// Test
	expect(1);
	response.parseXML();
	ok(response.faultValue, "Is fault response");
});