/**
 * The software is licensed under The MIT License (MIT)
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright (c) 2012 Hezhiqiang
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the"Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
var WordPressUtils = {};
/**
 * Testing the options if it is readonly
 * 
 * @static
 * 
 * @returns boolean
 */
WordPressUtils.isOptionReadOnly = function(options, name) {
	if (options[name].readonly == true) {
		return true;
	}
	return false;
};

/**
 * Check the response if is a error
 * 
 * @param object
 *            The response object
 * @returns boolean
 */
WordPressUtils.isFault = function(object) {
	if (object.faultCode) {
		return true;
	}
	return false;
}