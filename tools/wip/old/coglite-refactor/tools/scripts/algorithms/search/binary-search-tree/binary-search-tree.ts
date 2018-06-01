/**
 * Binary Search Tree (BST) implementation
 */

export interface Node {
  parent?: Node;
  key: number;
  left?: Node;
  right?: Node;
}

export interface Tree {
  root: Node;
}

/**
 * Create a tree node. Used to build a tree in tests.
 */
export function createNode(key: number, left: Node = null, right: Node = null): Node {
  const node = {
    key,
    left,
    right,
    parent: null,
  };

  if (left) left.parent = node;
  if (right) right.parent = node;

  return node;
}

/**
 * Print a BST in order.
 * Time complexity: O(n)
 */
export function inOrderWalk(node: Node) {
  if (!node) return;

  inOrderWalk(node.left);
  console.log(node);
  inOrderWalk(node.right);
}

/**
 * Search a key in the BST
 * Time complexity: O(lg(n))
 * @param node BST root node
 * @param key Key to look for
 */
export function search(node: Node, key: number): Node {
  if (!node) return null;

  if (node.key === key) return node;
  else if (node.key < key) return search(node.right, key);
  else return search(node.left, key);
}

/**
 * Return the minimum key of the BST
 * Time complexity: O(lg(n))
 * @param node BST root node
 */
export function minimum(node: Node): Node {
  let leftMost: Node = node;
  while (leftMost !== null && leftMost.left !== null) {
    leftMost = leftMost.left;
  }

  return leftMost;
}

/**
 * Return the maximum key of the BST
 * Time complexity: O(lg(n))
 * @param node BST root node
 */
export function maximum(node: Node): Node {
  let rightMost: Node = node;
  while (rightMost !== null && rightMost.right !== null) {
    rightMost = rightMost.right;
  }

  return rightMost;
}

/**
 * Return the successor node in a in-order walk
 * Time complexity: O(lg(n))
 * @param node BST root node
 */
export function successor(node: Node): Node {
  if (node.right !== null) return minimum(node.right);

  let parent = node.parent;
  let current = node;
  while (parent !== null && parent.right === current) {
    current = parent;
    parent = parent.parent;
  }

  return parent;
}

/**
 * Return the predessor node in a in-order walk
 * Time complexity: O(lg(n))
 * @param node BST root node
 */
export function predecessor(node: Node): Node {
  if (node.left !== null) return node.left;

  let parent = node.parent;
  let current = node;
  while (parent !== null && parent.left === current) {
    current = parent;
    parent = parent.parent;
  }

  return parent;
}

/**
 * Insert a leaf node in a BST
 * Time complexity: O(lg(n))
 * @param tree BST tree
 * @param leaf New leaf node to add
 */
export function insert(tree: Tree, leaf: Node) {
  let parent: Node = null;
  let current = tree.root;

  while (current !== null) {
    parent = current;

    if (leaf.key >= current.key) {
      current = current.right;
    } else {
      current = current.left;
    }
  }

  if (parent === null) tree.root = leaf;
  else if (leaf.key >= parent.key) parent.right = leaf;
  else parent.left = leaf;

  leaf.parent = parent;
}

/**
 * Replace a node with a new one in a BST
 * @NOTE: it does not update the childs nor does it check if the BST is still
 * valid.
 * Time complexity: O(1)
 * @param tree BST root node
 * @param oldNode Node to be replaced. It cannot be null.
 * @param newNode Replacement node
 */
export function transplant(tree: Tree, oldNode: Node, newNode: Node) {
  if (oldNode.parent === null) tree.root = newNode;
  else if (oldNode.parent.left === oldNode) oldNode.parent.left = newNode;
  else oldNode.parent.right = newNode;

  if (newNode !== null) newNode.parent = oldNode.parent;
}

/**
 * Remove a node from a BST.
 * Time complexity: O(lg(n))
 * @param tree BST root node
 * @param removed Node to be removed
 */
export function remove(tree: Tree, removed: Node) {
  if (removed.left === null) transplant(tree, removed, removed.right);
  else if (removed.right === null) transplant(tree, removed, removed.left);
  else {
    const minRight = minimum(removed.right);

    if (minRight.parent !== removed) {
      transplant(tree, minRight, minRight.right);
      // Attach the removed node right subtree to minRight
      minRight.right = removed.right;
      minRight.right.parent = minRight;
    }

    transplant(tree, removed, minRight);
    // Attach the removed node left subtree to minRight
    minRight.left = removed.left;
    minRight.left.parent = minRight;
  }
}
