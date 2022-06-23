const BinaryTree = require('../binary-tree.js');

const binaryTree = new BinaryTree();
const treeData = [[1, 3, null], 2, [[null, 3, 4], 5, [6, 7, 8]]];

test('should make a new tree from array', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.root).not.toBe(null);
});

test('should have height of 4', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.height()).toBe(4);
});

test('should have size of 9', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.size()).toBe(9);
});

test('should return right in order traversal', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.traverse_in_order()).toStrictEqual([
    1, 3, 2, 3, 4, 5, 6, 7, 8,
  ]);
});
test('should return right preorder traversal', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.traverse_preorder()).toStrictEqual([
    2, 3, 1, 5, 3, 4, 7, 6, 8,
  ]);
});
test('should return right inoreder traversal', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.traverse_postorder()).toStrictEqual([
    1, 3, 4, 3, 6, 8, 7, 5, 2,
  ]);
});
