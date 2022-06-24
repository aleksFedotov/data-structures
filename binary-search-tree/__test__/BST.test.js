const { BST, User } = require('../BST.js');

const aakash = new User('aakash', 'Aakash Rai', 'aakash@example.com');
const biraj = new User('biraj', 'Biraj Das', 'biraj@example.com');
const hemanth = new User('hemanth', 'Hemanth Jain', 'hemanth@example.com');
const jadhesh = new User('jadhesh', 'Jadhesh Verma', 'jadhesh@example.com');
const siddhant = new User('siddhant', 'Siddhant Sinha', 'siddhant@example.com');
const sonaksh = new User('sonaksh', 'Sonaksh Kumar', 'sonaksh@example.com');
const vishal = new User('vishal', 'Vishal Goel', 'vishal@example.com');

const users = [aakash, biraj, hemanth, jadhesh, siddhant, sonaksh, vishal];
const keys = [15, 25, 10, 7, 22, 17, 13, 5, 9, 27];
const keysListAll = keys
  .sort((a, b) => a - b)
  .map((item) => {
    return { key: item, value: null };
  });

const bst = new BST();
test('should create a new tree with user data', () => {
  expect(bst.height()).toBe(0);
  users.forEach((user) => bst.insert(user.username, user));
  expect(bst.height()).toBe(7);
});

test('find method whith beraj parameter should return correct data', () => {
  expect(bst.find('biraj').value).toBe(biraj);
});
test('find method whith alex parameter should return not found', () => {
  expect(bst.find('alex')).toBe('Not Found');
});
test('update method should find and update data', () => {
  expect(bst.find('biraj').value.name).toBe('Biraj Das');
  bst.update('biraj', {
    username: 'biraj',
    name: 'Biraj Das The Second',
    email: 'biraj@example.com',
  });
  expect(bst.find('biraj').value.name).toBe('Biraj Das The Second');
});

test('list_all shoild return list of {key, value} in increasing order of key(in ordertraversal)', () => {
  const numBST = new BST();
  keys.forEach((item) => numBST.insert(item));
  expect(numBST.list_all()).toStrictEqual(keysListAll);
});

test('is_balaced method should return false if bst id unbalanced', () => {
  expect(bst.is_balanced()).toBe(false);
});

test('rebalance_tree should make unbalanced tree  balanced', () => {
  expect(bst.is_balanced()).toBe(false);
  bst.rebalance_tree();
  expect(bst.is_balanced()).toBe(true);
});
