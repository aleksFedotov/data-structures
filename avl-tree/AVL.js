const { BST } = require('../binary-search-tree/BST.js');

class AVLnode {
  constructor(key, value = null) {
    this.key = key;
    this.value = null;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree extends BST {
  constructor() {
    super();
    this.root = null;
  }

  _getHeight(node = this.root) {
    if (!node) {
      return 0;
    }
    return node.height;
  }

  _getbalanceVactor(node = this.root) {
    if (!node) {
      return 0;
    }
    return this._getHeight(node.left) - this._getHeight(node.right);
  }

  insert(key, value = null) {
    const newNode = new AVLnode(key, value);
    this.root = this._insert_node(this.root, newNode);
  }

  // helper function to insert a node
  _insert_node(node, newNode) {
    // find the position and insert the nod
    if (!node) {
      return newNode;
    }
    if (node.key > newNode.key) {
      node.left = this._insert_node(node.left, newNode);
    } else if (node.key < newNode.key) {
      node.right = this._insert_node(node.right, newNode);
    }

    this.display_tree();

    // Update height of this ancestor node
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));

    // get balance factor for new node
    let balaceVactor = this._getbalanceVactor(node);

    // If this node becomes unbalanced

    // Left Left rotation
    if (balaceVactor > 1 && newNode.key < node.left.key) {
      return this._rightRotation(node);
    }
    // Right Right rotation
    if (balaceVactor < -1 && newNode.key > node.right.key) {
      return this._leftRotation(node);
    }
    // Left Right rotation
    if (balaceVactor > 1 && newNode.key > node.left.key) {
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    }
    // Right Left rotation
    if (balaceVactor < -1 && newNode.key < node.right.key) {
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }

    return node;
  }

  // A utility function to right
  // rotate subtree rooted with y

  _rightRotation(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;
    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;

    return x;
  }

  // A utility function to left
  // rotate subtree rooted with x

  _leftRotation(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1;
    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1;

    return y;
  }
}

const avl = new AVLTree();

avl.insert(20);
avl.insert(30);
avl.insert(10);
avl.insert(40);
// avl.display_tree();
// console.log('--------------------------------------------');
avl.insert(50);
// avl.display_tree();
// console.log('--------------------------------------------');
avl.insert(25);

// avl.display_tree();
// console.log('--------------------------------------------');

module.exports = AVLTree;
