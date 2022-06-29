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

  #parse_array(data) {
    let node;
    if (Array.isArray(data) && data.length === 3) {
      node = new BinaryTreeNode(data[1]);
      node.left = parse_array(data[0]);
      node.right = parse_array(data[2]);
    } else if (data === null) {
      return null;
    } else {
      node = new BinaryTreeNode(data);
    }

    return node;
  }

  array_to_tree(data) {
    this.root = this.#parse_array(data);
  }

  tree_to_array(node = this.root) {
    if (!node) return null;
    if (!node.left && !node.right) {
      return node.key;
    }
    return [
      this.tree_to_array(node.left),
      node.key,
      this.tree_to_array(node.right),
    ];
  }

  display_tree(node = this.root, level = 0, space = '    ') {
    if (!node) {
      console.log(space.repeat(level) + 'Ø');
      return;
    }

    if (!node.left && !node.right) {
      console.log(space.repeat(level) + node.key);
      return;
    }

    this.display_tree(node.right, level + 1);
    console.log(space.repeat(level) + node.key);
    this.display_tree(node.left, level + 1);
  }

  height(node = this.root) {
    if (!node) return 0;

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  size(node = this.root) {
    if (!node) return 0;

    return 1 + this.size(node.left) + this.size(node.right);
  }

  traverse_in_order(node = this.root) {
    if (!node) return [];

    return [
      ...this.traverse_in_order(node.left),
      node.key,
      ...this.traverse_in_order(node.right),
    ];
  }

  traverse_preorder(node = this.root) {
    if (!node) return [];

    return [
      node.key,
      ...this.traverse_preorder(node.left),
      ...this.traverse_preorder(node.right),
    ];
  }

  traverse_postorder(node = this.root) {
    if (!node) return [];

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
      if (!node) return true;
      if (node.key <= min || node.key >= max) return false;
      return (
        helper(node.left, min, node.key) && helper(node.right, node.key, max)
      );
    };

    return helper(node);
  }

  lca(n1, n2) {
    return this.#lca_helper(n1, n2, this.root).key;
  }

  #lca_helper(n1, n2, node) {
    // Base case
    if (node == null) return null;

    // If either n1 or n2 matches with root's key, report
    // the presence by returning root (Note that if a key is
    // ancestor of other, then the ancestor key becomes LCA
    if (node.key == n1 || node.key == n2) return node;

    // Look for keys in left and right subtrees
    let left_lca = this.#lca_helper(n1, n2, node.left);
    let right_lca = this.#lca_helper(n1, n2, node.right);

    // If both of the above calls return Non-NULL, then one key
    // is present in once subtree and other is present in other,
    // So this node is the LCA
    if (left_lca && right_lca) return node;

    // Otherwise check if left subtree or right subtree is LCA
    return left_lca != null ? left_lca : right_lca;
  }
}

module.exports = BinaryTree;
