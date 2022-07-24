import { BST } from '../binary-search-tree/BST';

class AVLnode {
  key: number;
  value: any;
  height: number;
  left: AVLnode | null;
  right: AVLnode | null;
  constructor(key, value = null) {
    this.key = key;
    this.value = null;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

export default class AVLTree extends BST {
  // @ts-ignore
  root: AVLnode | null;
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
    if (!node) return node;

    // If the key to be deleted is smaller than
    // the node's key, then it lies in left subtree
    if (node.key > key) node.left = this.#delete_node(node.left, key);
    // If the key to be deleted is greater than the
    // node's key, then it lies in right subtree
    else if (node.key < key) node.right = this.#delete_node(node.right, key);
    // if key is same as node's key, then this is the node
    // to be deleted
    else {
      // the node is a leaf
      if (!node.left && !node.right) {
        // delete the node
        return null;
      }
      // if there isn't a left child,
      if (!node.left) {
        // then replace node with right child
        node.right.parent = node.parent;
        return node.right;
      }
      // if there isn't a right child,
      if (!node.right) {
        // then replace node with left child
        node.left.parent = node.parent;
        return node.left;
      }

      // node with two children: Get the inorder
      // successor (smallest in the right subtree)

      node.key = this.successor(node.right);

      // Delete the inorder successor
      node.right = this.#delete_node(node.right, node.key);
    }

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
