const BinaryTree = require('../binary-tree/binary-tree.js');

class User {
  constructor(username, name, email) {
    (this.username = username), (this.name = name), (this.email = email);
  }
}

class BSTNode {
  constructor(key, value = null) {
    (this.key = key),
      (this.value = value),
      (this.left = null),
      (this.right = null),
      (this.parent = null);
  }
}

class BST extends BinaryTree {
  constructor() {
    super();
    this.root = null;
  }

  #insertNode(node, newNode) {
    newNode.parent = node;
    if (node.key > newNode.key) {
      if (!node.left) {
        newNode.parent = node;
        node.left = newNode;
      } else {
        this.#insertNode(node.left, newNode);
      }
    } else if (node.key < newNode.key) {
      if (!node.right) {
        newNode.parent = node;
        node.right = newNode;
      } else {
        this.#insertNode(node.right, newNode);
      }
    }
  }

  #remove_node(node, key) {
    if (!node) return node;
    if (node.key > key) {
      node.left = this.#remove_node(node.left, key);
    } else if (node.key < key) {
      node.right = this.#remove_node(node.right, key);
    } else {
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
      //  node has two children
      // finding min key in left subtrees of right subtree of node we need to delete

      // replace node key with min key  by using  minAtRightSubTree function
      node.key = this.successor(node.right);

      // delete the key from right subtree.
      node.right = this.#remove_node(node.right, node.key);
    }

    return node;
  }

  #check_balance(node) {
    if (!node) return [true, 0];

    const [is_balanced_left, height_left] = this.#check_balance(node.left);
    const [is_balanced_right, height_right] = this.#check_balance(node.right);

    const balanced =
      is_balanced_left &&
      is_balanced_right &&
      Math.abs(height_left - height_right) <= 1;
    const height = 1 + Math.max(height_left, height_right);
    return [balanced, height];
  }

  #make_balanced_tree(data, low = 0, high = null, parent = null) {
    // initially set high as length of list  - 1
    if (high === null) high = data.length - 1;
    // base case
    if (low > high) return null;

    // find middle of array
    const mid = Math.floor((low + high) / 2);

    // get value and jey from object in middle odf array
    const { key, value } = data[mid];

    // create a new node and assing parent to new node
    const node = new BSTNode(key, value);
    node.parent = parent;
    // recursively assing left and rignt subtree of new node.
    // Left node will be created from data in left part of array as
    // values there are always less then values of new node
    // (due to the fatch thath out array is sorted in decreasing order)
    // and roght side will be created form values in right side of array
    node.left = this.#make_balanced_tree(data, low, mid - 1, node);
    node.right = this.#make_balanced_tree(data, mid + 1, high, node);

    return node;
  }

  successor(node) {
    // while there is a left child,
    while (node.left) {
      // traverse along left branches
      node = node.left;
    }

    return node.key;
  }
  predecessor(node) {
    // while there is a left child,
    while (node.right) {
      // traverse along left branches
      node = node.right;
    }

    return node.key;
  }

  insert(key, value) {
    const newNode = new BSTNode(key, value);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.#insertNode(this.root, newNode);
    }
  }

  find(key, node = this.root) {
    if (!node) {
      return 'Not Found';
    }

    if (node.key === key) {
      return node;
    } else if (node.key > key) {
      return this.find(key, node.left);
    } else if (node.key < key) {
      return this.find(key, node.right);
    }
  }

  update(key, value) {
    const target = this.find(key, this.node);

    if (target) {
      target.value = value;
    } else {
      return 'Node not found';
    }
  }

  remove(key) {
    this.root = remove_node(this.root, key);
  }

  list_all(node = this.root) {
    if (!node) return [];

    return [
      ...this.list_all(node.left),
      { key: node.key, value: node.value },
      ...this.list_all(node.right),
    ];
  }

  is_balanced() {
    return this.#check_balance(this.root)[0];
  }

  rebalance_tree() {
    const currTree = this.list_all(this.root);
    this.root = this.#make_balanced_tree(currTree);
  }

  find_successor_predecessor(key) {
    const node = this.find(key);

    let suc = successor(node.right);
    let pre = predecessor(node.left);

    return { suc, pre };
  }
}

module.exports.BST = BST;
module.exports.User = User;
