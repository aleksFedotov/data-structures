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

  insert(key, value) {
    const newNode = new BSTNode(key, value);

    if (!this.root) {
      this.root = newNode;
    } else {
      insertNode(this.root, newNode);
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

  list_all(node = this.root) {
    if (!node) return [];

    return [
      ...this.list_all(node.left),
      { key: node.key, value: node.value },
      ...this.list_all(node.right),
    ];
  }

  is_balanced() {
    return check_balance(this.root)[0];
  }

  rebalance_tree() {
    const currTree = this.list_all(this.root);
    this.root = make_balanced_tree(currTree);
  }
}

function insertNode(node, newNode) {
  newNode.parent = node;
  if (node.key > newNode.key) {
    if (!node.left) {
      node.left = newNode;
    } else {
      insertNode(node.left, newNode);
    }
  } else if (node.key < newNode.key) {
    if (!node.right) {
      node.right = newNode;
    } else {
      insertNode(node.right, newNode);
    }
  }
}

function check_balance(node) {
  if (!node) return [true, 0];

  const [is_balanced_left, height_left] = check_balance(node.left);
  const [is_balanced_right, height_right] = check_balance(node.right);

  const balanced =
    is_balanced_left &&
    is_balanced_right &&
    Math.abs(height_left - height_right) <= 1;
  const height = 1 + Math.max(height_left, height_right);
  return [balanced, height];
}

function make_balanced_tree(data, low = 0, high = null, parent = null) {
  if (high === null) high = data.length - 1;
  if (low > high) return null;

  const mid = Math.floor((low + high) / 2);

  const { key, value } = data[mid];

  const root = new BSTNode(key, value);
  root.parent = parent;
  root.left = make_balanced_tree(data, low, mid - 1, root);
  root.right = make_balanced_tree(data, mid + 1, high, root);

  return root;
}

const aakash = new User('aakash', 'Aakash Rai', 'aakash@example.com');
const biraj = new User('biraj', 'Biraj Das', 'biraj@example.com');
const hemanth = new User('hemanth', 'Hemanth Jain', 'hemanth@example.com');
const jadhesh = new User('jadhesh', 'Jadhesh Verma', 'jadhesh@example.com');
const siddhant = new User('siddhant', 'Siddhant Sinha', 'siddhant@example.com');
const sonaksh = new User('sonaksh', 'Sonaksh Kumar', 'sonaksh@example.com');
const vishal = new User('vishal', 'Vishal Goel', 'vishal@example.com');

const users = [aakash, biraj, hemanth, jadhesh, siddhant, sonaksh, vishal];
const keys = [15, 25, 10, 7, 22, 17, 13, 5, 9, 27];

const bst = new BST();

users.forEach((user) => bst.insert(user.username, user));
// keys.forEach((key) => bst.insert(key));
// bst.insert(15);
// bst.insert(25);
// bst.insert(10);
// bst.insert(7);
// bst.insert(22);
// bst.insert(17);
// bst.insert(13);
// bst.insert(5);
// bst.insert(9);
// bst.insert(27);

// bst.display_tree();

console.log(bst.is_balanced());
bst.display_tree();
bst.rebalance_tree();
bst.display_tree();
console.log(bst.is_balanced());
