/**
 * Binary Search Tree for browser or server
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2015 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/tiny-bst/master/LICENSE>
 * @link http://avoidwork.github.io/tiny-bst
 * @module tiny-bst
 * @version 1.2.1
 */

( function ( global ) {
"use strict";

/**
 * TinyBST Node
 *
 * @constructor
 * @param {Mixed}  key   Node identifier
 * @param {Mixed}  data  [Optional] Data to set on Node
 * @param {Object} left  {@link Node}
 * @param {Object} right {@link Node}
 */
function Node ( key, data ) {
	this.key   = key;
	this.data  = data || null;
	this.left  = null;
	this.right = null;
}

/**
 * Setting constructor loop
 *
 * @memberOf Node
 * @type {Function}
 */
Node.prototype.constructor = Node;

/**
 * Shows Node data or key
 *
 * @method show
 * @memberOf Node
 * @return {Mixed} Data or key
 */
Node.prototype.show = function () {
	return this.data || this.key;
};

/**
 * TinyBST
 *
 * @constructor
 */
function TinyBST () {
	this.root = null;
}

/**
 * Setting constructor loop
 *
 * @memberOf TinyBST
 * @type {Function}
 */
TinyBST.prototype.constructor = TinyBST;

/**
 * Finds a node based on it's key
 *
 * @method find
 * @memberOf TinyBST
 * @param  {Mixed} key Node key
 * @return {Object}    Node that holds key
 */
TinyBST.prototype.find = function ( key ) {
	var current = this.root;

	while ( current.key !== key ) {
		if ( key < current.key ) {
			current = current.left;
		}
		else {
			current = current.right;
		}

		if ( current === null ) {
			return undefined;
		}
	}

	return current;
};

/**
 * Inserts key into the tree
 *
 * @method insert
 * @memberOf TinyBST
 * @param  {Mixed} key  Node key
 * @param  {Mixed} data [Optional] Node data
 * @return {Object}     {@link TinyBST}
 */
TinyBST.prototype.insert = function () {
	var key   = arguments[0],
	    data  = arguments[1] || null,
	    current, side, node, parent;

	if ( key === undefined ) {
		throw new Error( "Invalid arguments" );
	}

	node = new Node( key, data );

	if ( this.root === null ) {
		this.root = node;
	}
	else {
		current = this.root;

		while ( true ) {
			parent  = current;
			side    = key < current.key ? "left" : "right";
			current = current[side];

			if ( current === null ) {
				parent[side] = node;
				break;
			}
		}
	}

	return node;
};

/**
 * Finds the maximum value in the tree
 *
 * @method max
 * @memberOf TinyBST
 * @return {Number} Node key
 */
TinyBST.prototype.max = function () {
	var node = bst.max( this.root );

	return node ? node.key : 0;
};

/**
 * Finds the minimum value in the tree
 *
 * @method min
 * @memberOf TinyBST
 * @return {Number} Node key
 */
TinyBST.prototype.min = function () {
	var node = bst.min( this.root );

	return node ? node.key : 0;
};

/**
 * Removes a node from the tree
 *
 * @method remove
 * @memberOf TinyBST
 * @param  {Number} key Node key to remove
 * @return {Object} {@link TinyBST}
 */
TinyBST.prototype.remove = function ( key ) {
	bst.removeNode( this.root, key );

	return this;
};

/**
 * Puts the tree in reverse numerical order
 *
 * @method reverse
 * @memberOf TinyBST
 * @return {Array} Tree contents
 */
TinyBST.prototype.reverse = function () {
	return bst.sort( this.root ).reverse();
};

/**
 * Puts the tree in numerical order
 *
 * @method sort
 * @memberOf TinyBST
 * @param {Boolean} obj [Optional] Return {@link Node} if `true`, default is `false`
 * @return {Array} Tree contents
 */
TinyBST.prototype.sort = function ( obj ) {
	return bst.sort( this.root, undefined, ( obj === true ) );
};

/**
 * @namespace bst
 */
var bst = {
	/**
	 * TinyBST factory
	 *
	 * @method factory
	 * @memberOf bst
	 * @return {Object} {@link TinyBST}
	 */
	factory: function () {
		return new TinyBST();
	},

	/**
	 * Removes a node from the tree
	 *
	 * @method removeNode
	 * @memberOf bst
	 * @param  {Object} node Node to remove
	 * @param  {Object} key  Key to remove
	 * @return {Mixed}       {@link Node}
	 */
	removeNode : function ( node, key ) {
		var tmp;

		if ( node === null ) {
			return null;
		}

		if ( key === node.key ) {
			if ( node.left === null && node.right === null ) {
				return null;
			}

			if ( node.left === null ) {
				return node.right;
			}

			if ( node.right === null ) {
				return node.left;
			}

			tmp        = bst.min( node.right );
			node.key   = tmp.key;
			node.data  = tmp.data;
			node.right = bst.removeNode( node.right, tmp.key );
		}
		else if ( key < node.key ) {
			node.left = bst.removeNode( node.left, key );
		}
		else {
			node.right = bst.removeNode( node.right, key );
		}

		return node;
	},

	/**
	 * Finds the max value under a node
	 *
	 * @method max
	 * @memberOf bst
	 * @param  {Object} node Starting node
	 * @return {Object}      Child node with the max value
	 */
	max : function ( node ) {
		var current = node;

		if ( current !== null ) {
			while ( current.right !== null ) {
				current = current.right;
			}
		}

		return current;
	},

	/**
	 * Finds the min value under a node
	 *
	 * @method min
	 * @memberOf bst
	 * @param  {Object} node Starting node
	 * @return {Object}      Child node with the min value
	 */
	min : function ( node ) {
		var current = node;

		if ( current !== null ) {
			while ( current.left !== null ) {
				current = current.left;
			}
		}

		return current;
	},

	/**
	 * Puts a tree in order
	 *
	 * @method sort
	 * @memberOf bst
	 * @param  {Object}  node  Node
	 * @param  {Array}   order [Optional] Array of results
	 * @param  {Boolean} obj   [Optional] Return {@link Node} if `true`, default is `false`
	 * @return {Array}         Array of results
	 */
	sort : function ( node, order, obj ) {
		var output = order || [];

		if ( node !== null ) {
			output = bst.sort( node.left, output, obj );
			output.push( obj ? node : node.key );
			output = bst.sort( node.right, output, obj );
		}

		return output;
	}
};

// Node, AMD & window supported
if ( typeof exports != "undefined" ) {
	module.exports = bst.factory;
}
else if ( typeof define == "function" ) {
	define( function () {
		return bst.factory;
	} );
}
else {
	global.bst = bst.factory;
}
} )( this );
