class BinaryTreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  _parse_array(data) {
    let node;
    if (Array.isArray(data) && data.length === 3) {
      node = new BinaryTreeNode(data[1]);
      node.left = this._parse_array(data[0]);
      node.right = this._parse_array(data[2]);
    } else if (data === null) {
      node = null;
    } else {
      node = new BinaryTreeNode(data);
    }

    return node;
  }

  to_array(node = this.root) {
    if (node === null) {
      return null;
    }
    if (node.left === null && node.right === null) {
      return node.key;
    }

    return [this.to_array(node.left), node.key, this.to_array(node.right)];
  }

  createTree(data) {
    this.root = this._parse_array(data);
  }

  display_keys(node = this.root, level = 0, space = '   ') {
    if (node === null) {
      console.log(space.repeat(level) + 'Ø');
      return;
    }

    if (node.left === null && node.right === null) {
      console.log(space.repeat(level) + node.key);
      return;
    }

    this.display_keys(node.right, level + 1, '   ');
    console.log(space.repeat(level) + node.key);
    this.display_keys(node.left, level + 1, '   ');
  }

  height(node = this.root) {
    if (node === null) {
      return 0;
    }

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  size(node = this.root) {
    if (node === null) {
      return 0;
    }

    return 1 + this.size(node.left) + this.size(node.right);
  }

  traverse_in_order(node = this.root) {
    if (node === null) {
      return [];
    }
    return [
      ...this.traverse_in_order(node.left),
      node.key,
      ...this.traverse_in_order(node.right),
    ];
  }

  traverse_preorder(node = this.root) {
    if (node === null) {
      return [];
    }
    return [
      node.key,
      ...this.traverse_preorder(node.left),
      ...this.traverse_preorder(node.right),
    ];
  }

  traverse_postorder(node = this.root) {
    if (node === null) {
      return [];
    }
    return [
      ...this.traverse_postorder(node.left),
      ...this.traverse_postorder(node.right),
      node.key,
    ];
  }
  is_bst(node = this.root) {
    const helper = (
      node,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER
    ) => {
      if (node === null) return true;
      if (node.key <= min || node.key >= max) return false;
      return (
        helper(node.left, min, node.key) && helper(node.right, node.key, max)
      );
    };

    return helper(node);
    // if (node === null) {
    //   return [true, null, null];
    // }

    // const [is_bst_left, min_left, max_left] = this.is_bst(node.left);
    // const [is_bst_right, min_right, max_right] = this.is_bst(node.right);

    // const is_bst_node =
    //   is_bst_left &&
    //   is_bst_right &&
    //   (max_left === null || node.key > max_left) &&
    //   (min_right === null || node.key < min_right);

    // const minKeys = [min_left, node.key, min_right].filter(
    //   (item) => item !== null
    // );
    // const maxKeys = [max_left, node.key, max_right].filter(
    //   (item) => item !== null
    // );

    // const min_key = Math.min.apply(null, minKeys);
    // const max_key = Math.max.apply(null, maxKeys);

    // console.log('new', node.key, min_key, max_key, is_bst_node);

    // return [is_bst_node, min_key, max_key];
  }
}
3;
const treeData = [[-1, 1, null], 2, [[null, 3, 4], 5, [6, 7, 8]]];

const binaryTree = new BinaryTree();

binaryTree.createTree(treeData);
binaryTree.display_keys();
const treeHeight = binaryTree.height();
const treeSize = binaryTree.size();
const traversalInOrder = binaryTree.traverse_in_order();
const traversalPreOrder = binaryTree.traverse_preorder();
const traversalPostOrder = binaryTree.traverse_postorder();
const initialArray = binaryTree.to_array();
const is_bst = binaryTree.is_bst();
console.log(
  'height',
  treeHeight,
  'size',
  treeSize,
  'inorder',
  traversalInOrder,
  'preorder',
  traversalPreOrder,
  'postorder',
  traversalPostOrder,
  'initial data',
  initialArray,
  'is bst',
  is_bst
);
