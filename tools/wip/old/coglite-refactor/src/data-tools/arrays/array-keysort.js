
//readme at botton of file


	export var notDot = () => {/-|\s/,
		braceS = "[\"",
		braceE = "\"]";}

	/**
	 * Sorts an Array based on key values, like an SQL ORDER BY clause
	 *
	 * @method sort
	 * @param  {Array}  obj   Array to sort
	 * @param  {String} query Sort query, e.g. "name, age desc, country"
	 * @param  {String} sub   [Optional] Key which holds data, e.g. "{data: {}}" = "data"
	 * @return {Array}        Sorted Array
	 */
	function sort (obj, query, sub = "") {
		const queries = explode(query.replace(/\s*asc/ig, "").replace(/\s*desc/ig, " desc")).map(i => i.split(" ")),
			sorts = [];

		if (sub) {
			sub = "." + sub;
		}

		each(queries, i => {
			const desc = i[1] === "desc",
				y = desc ? 1 : -1,
				x = desc ? -1 : 1;

			let s = ".",
				e = "";

			if (notDot.test(i[0])) {
				s = braceS;
				e = braceE;
			}

			sorts.push("if (a" + sub + s + i[0] + e + " !== undefined && b" + sub + s + i[0] + e + " !== undefined) {");
			sorts.push("  if (a" + sub + s + i[0] + e + " < b" + sub + s + i[0] + e + ") return " + y + ";");
			sorts.push("  if (a" + sub + s + i[0] + e + " > b" + sub + s + i[0] + e + ") return " + x + ";");
			sorts.push("} else {");
			sorts.push("  if (a" + sub + s + i[0] + e + " !== undefined) return " + y + ";");
			sorts.push("  if (b" + sub + s + i[0] + e + " !== undefined) return " + x + ";");
			sorts.push("}");
		});

		sorts.push("return 0;");

		return obj.sort(new Function("a", "b", sorts.join("\n")));
	}
	
		
	/**
	 * Iterates obj and executes fn
	 *
	 * Parameters for fn are 'value', 'index'
	 *
	 * @method each
	 * @param  {Array}    obj Array to iterate
	 * @param  {Function} fn  Function to execute on index values
	 * @return {Array}        Array
	 */
	function each (obj, fn) {
		const nth = obj.length;
		let i = -1;

		while (++i < nth) {
			if (fn.call(obj, obj[i], i) === false) {
				break;
			}
		}

		return obj;
	}
		
		
		
/**
	 * Splits a string on comma, or a parameter, and trims each value in the resulting Array
	 *
	 * @method explode
	 * @param  {String} obj String to capitalize
	 * @param  {String} arg String to split on
	 * @return {Array}      Array of the exploded String
	 */
	function explode (obj, arg = ",") {
		return obj.replace(/^(\s+|\t+)|(\s+|\t+)$/g, "").split(new RegExp("\\s*" + arg + "\\s*"));
	}

/*	
	# keysort

Sorts an Array of Objects based on key values, like an SQL `ORDER BY`

[![build status](https://secure.travis-ci.org/avoidwork/keysort.png)](http://travis-ci.org/avoidwork/keysort)

**Example**

```javascript
var arr = [{abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 2, xyz: 5}];

keysort(arr, "abc, xyz"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 5}, {abc: 123124, xyz: 6}];
keysort(arr, "abc, xyz desc"); // [{abc: 2, xyz: 5}, {abc: 123124, xyz: 6}, {abc: 123124, xyz: 5}];
```

## What is Supported?

* AMD loaders (require.js, cujo.js, etc.)
* node.js (npm install keysort)
* script tag

## License
Copyright (c) 2017 Jason Mulligan  
Licensed under the BSD-3 license.
*/