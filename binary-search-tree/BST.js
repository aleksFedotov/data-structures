class User {
  constructor(username, name, email) {
    this.username = username;
    this.name = name;
    this.email = email;
  }
}

class BSTNode {
  constructor(key, value = null) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    const newNode = new BSTNode(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (node.key > newNode.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  display_tree(node = this.root, level = 0, space = '   ') {
    if (!node) {
      console.log(space.repeat(level) + 'Ø');
      return;
    }

    if (!node.left && !node.right) {
      console.log(space.repeat(level) + node.key);
      return;
    }

    this.display_tree(node.right, level + 1, (space = '   '));
    console.log(space.repeat(level) + node.key);
    this.display_tree(node.left, level + 1, (space = '   '));
  }

  find(key, node = this.root) {
    if (node === null) {
      return null;
    }

    if (node.key === key) {
      return node;
    }

    if (node.key > key) {
      return this.find(key, node.left);
    }

    if (node.key < key) {
      return this.find(key, node.right);
    }
  }

  update(key, value, node = this.root) {
    const target = this.find(key);
    if (target) {
      target.value = value;
    } else {
      return 'Not Found';
    }
  }

  list_all(node = this.root) {
    if (node === null) {
      return [];
    }

    return [
      ...this.list_all(node.left),
      { key: node.key, value: node.value },
      ...this.list_all(node.right),
    ];
  }

  is_balanced(node = this.root) {
    if (node === null) {
      return [true, 0];
    }

    const [is_balanced_left, height_left] = this.is_balanced(node.left);
    const [is_balanced_right, height_right] = this.is_balanced(node.right);

    const balanced =
      is_balanced_left &&
      is_balanced_right &&
      Math.abs(height_left - height_right) <= 1;
    const height = 1 + Math.max(height_left, height_right);

    return [balanced, height];
  }
}

const aakash = new User('aakash', 'Aakash Rai', 'aakash@example.com');
const biraj = new User('biraj', 'Biraj Das', 'biraj@example.com');
const hemanth = new User('hemanth', 'Hemanth Jain', 'hemanth@example.com');
const jadhesh = new User('jadhesh', 'Jadhesh Verma', 'jadhesh@example.com');
const siddhant = new User('siddhant', 'Siddhant Sinha', 'siddhant@example.com');
const sonaksh = new User('sonaksh', 'Sonaksh Kumar', 'sonaksh@example.com');
const vishal = new User('vishal', 'Vishal Goel', 'vishal@example.com');

const users = [aakash, biraj, hemanth, jadhesh, siddhant, sonaksh, vishal];

const bst = new BST();

// users.forEach((user) => bst.insert(user.username, user));
bst.insert(15);
bst.insert(25);
bst.insert(10);
bst.insert(7);
bst.insert(22);
bst.insert(17);
bst.insert(13);
bst.insert(5);
bst.insert(9);
bst.insert(27);

bst.display_tree();

// function made_balanced_tree( data, low = 0, high = null , parent = none) {
//     if(high === null) {
//       high = data.length
//     }

//     if (low > high) {
//       return null
//     }

//     const mid = Math.floor()
// }
