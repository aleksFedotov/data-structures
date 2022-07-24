import AVLTree from '../AVL';

const keys = [9, 5, 10, 0, 6, 11, -1, 1, 2];

const avl = new AVLTree();

keys.forEach((key) => avl.insert(key));

test('initial tree should be balance', () => {
  expect(avl.is_balanced()).toBe(true);
});

test('we should be able to insert new node and without breaking balance', () => {
  avl.insert(50);
  expect(avl.is_balanced()).toBe(true);
  avl.insert(25);
  expect(avl.is_balanced()).toBe(true);
});

test('we should be able to insert new node and without breaking balance', () => {
  avl.insert(10);
  expect(avl.is_balanced()).toBe(true);
  avl.insert(11);
  expect(avl.is_balanced()).toBe(true);
});
