const BinaryTree = require('../binary-tree.js');

const binaryTree = new BinaryTree();
const treeData = [[1, 3, null], 2, [[null, 3, 4], 5, [6, 7, 8]]];
const BStData = [[-1, 1, null], 2, [[null, 3, 4], 5, [6, 7, 8]]];

test('should make a new tree from array', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.root).not.toBe(null);
});

test('size method should return 4', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.height()).toBe(4);
});

test('size method should return 9', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.size()).toBe(9);
});

test('traverse_in_order method should return correct list', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.traverse_in_order()).toStrictEqual([
    1, 3, 2, 3, 4, 5, 6, 7, 8,
  ]);
});
test('traverse_preorder method should return correct list', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.traverse_preorder()).toStrictEqual([
    2, 3, 1, 5, 3, 4, 7, 6, 8,
  ]);
});
test('traverse_postorder method should return correct list', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.traverse_postorder()).toStrictEqual([
    1, 3, 4, 3, 6, 8, 7, 5, 2,
  ]);
});

test('is_bst method should retutn false if tree is not bst', () => {
  binaryTree.array_to_tree(treeData);
  expect(binaryTree.is_bst()).toBe(false);
});
test('is_bst method should retutn true if tree is not bst', () => {
  binaryTree.array_to_tree(BStData);
  expect(binaryTree.is_bst()).toBe(true);
});
test('tree_to_array method should return initial array', () => {
  binaryTree.array_to_tree(BStData);
  expect(binaryTree.tree_to_array()).toStrictEqual(BStData);
});
