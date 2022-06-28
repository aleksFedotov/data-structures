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

  #getHeight(node = this.root) {
    if (!node) {
      return 0;
    }
    return node.height;
  }

  #getbalanceVactor(node = this.root) {
    if (!node) {
      return 0;
    }
    return this.#getHeight(node.left) - this.#getHeight(node.right);
  }

  // A utility function to right
  // rotate subtree rooted with y
  //    y                                x
  //   / \     Right Rotation          /  \
  //  x   T3   – - – - – - – >        T1   y
  // / \       < - - - - - - -            / \
  // T1  T2     Left Rotation            T2  T3

  #rightRotation(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this.#getHeight(y.left), this.#getHeight(y.right)) + 1;
    x.height = Math.max(this.#getHeight(x.left), this.#getHeight(x.right)) + 1;

    return x;
  }

  // A utility function to left
  // rotate subtree rooted with x

  #leftRotation(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this.#getHeight(x.left), this.#getHeight(x.right)) + 1;
    y.height = Math.max(this.#getHeight(y.left), this.#getHeight(y.right)) + 1;

    return y;
  }

  #insert_node(node, newNode) {
    // find the position and insert the nod
    if (!node) {
      return newNode;
    }
    if (node.key > newNode.key) {
      node.left = this.#insert_node(node.left, newNode);
    } else if (node.key < newNode.key) {
      node.right = this.#insert_node(node.right, newNode);
    }

    // Update height of this ancestor node
    node.height =
      1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));

    // get balance factor for new node
    let balaceVactor = this.#getbalanceVactor(node);

    // If this node becomes unbalanced

    // Left Left rotation
    if (balaceVactor > 1 && newNode.key < node.left.key) {
      return this.#rightRotation(node);
    }
    // Right Right rotation
    if (balaceVactor < -1 && newNode.key > node.right.key) {
      return this.#leftRotation(node);
    }
    // Left Right rotation
    if (balaceVactor > 1 && newNode.key > node.left.key) {
      node.left = this.#leftRotation(node.left);
      return this.#rightRotation(node);
    }
    // Right Left rotation
    if (balaceVactor < -1 && newNode.key < node.right.key) {
      node.right = this.#rightRotation(node.right);
      return this.#leftRotation(node);
    }

    // helper function to insert a node

    return node;
  }
  insert(key, value = null) {
    const newNode = new AVLnode(key, value);
    this.root = this.#insert_node(this.root, newNode);
  }

  delete(key) {
    if (this.root) {
      this.root = this.#delete_node(this.root, key);
    }
  }
  #delete_node(node, key) {
    if (node == null) return node;

    // If the key to be deleted is smaller than
    // the node's key, then it lies in left subtree
    if (key < node.key) node.left = this.#delete_node(node.left, key);
    // If the key to be deleted is greater than the
    // node's key, then it lies in right subtree
    else if (key > node.key) node.right = this.#delete_node(node.right, key);
    // if key is same as node's key, then this is the node
    // to be deleted
    else {
      // node with only one child or no child
      if (node.left == null || node.right == null) {
        let temp = null;
        if (temp == node.left) temp = node.right;
        else temp = node.left;

        // No child case
        if (temp == null) {
          temp = node;
          node = null;
        } // One child case
        else node = temp; // Copy the contents of
        // the non-empty child
      } else {
        // node with two children: Get the inorder
        // successor (smallest in the right subtree)
        let temp = this.successor(node.right);

        // Copy the inorder successor's data to this node
        node.key = temp.key;

        // Delete the inorder successor
        node.right = this.#delete_node(node.right, temp.key);
      }
    }

    // If the tree had only one node then return
    if (node == null) return node;

    // STEP 2: UPDATE HEIGHT OF THE CURRENT NODE
    node.height =
      Math.max(this.#getHeight(node.left), this.#getHeight(node.right)) + 1;

    // STEP 3: GET THE BALANCE FACTOR OF THIS NODE (to check whether
    // this node became unbalanced)
    let balance = this.#getbalanceVactor(node);

    // If this node becomes unbalanced, then there are 4 cases
    // Left Left Case
    if (balance > 1 && this.#getbalanceVactor(node.left) >= 0)
      return this.#rightRotation(node);

    // Left Right Case
    if (balance > 1 && this.#getbalanceVactor(node.left) < 0) {
      node.left = this.#leftRotation(node.left);
      return this.#rightRotation(node);
    }

    // Right Right Case
    if (balance < -1 && this.#getbalanceVactor(node.right) <= 0)
      return this.#leftRotation(node);

    // Right Left Case
    if (balance < -1 && this.#getbalanceVactor(node.right) > 0) {
      node.right = this.#rightRotation(node.right);
      return this.#leftRotation(node);
    }

    return node;
  }
}

const avl = new AVLTree();
avl.insert(9);
avl.insert(5);
avl.insert(10);
avl.insert(0);
avl.insert(6);
avl.insert(11);
avl.insert(-1);
avl.insert(1);
avl.insert(2);

avl.display_tree();
console.log(avl.traverse_preorder());

avl.delete(10);

avl.display_tree();
console.log(avl.traverse_preorder());

module.exports = AVLTree;
