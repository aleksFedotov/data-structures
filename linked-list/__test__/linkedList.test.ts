import LinkedList from '../linkedList';

const linkedList = new LinkedList();

test('should return empty arr if linked arr is empty', () => {
  const arr = linkedList.printList();
  expect(arr).toStrictEqual([]);
});

test('should append', () => {
  linkedList.append(10);
  linkedList.append(6);
  expect(linkedList.printList()).toStrictEqual([10, 6]);
});

test('should prepend', () => {
  linkedList.prepend(99);
  expect(linkedList.printList()).toStrictEqual([99, 10, 6]);
});
test('should shift', () => {
  linkedList.prepend(23);
  expect(linkedList.printList()).toStrictEqual([23, 99, 10, 6]);
  linkedList.shift();
  expect(linkedList.printList()).toStrictEqual([99, 10, 6]);
});

test('should insert', () => {
  const list = new LinkedList();
  list.append(99);
  list.append(10);
  list.append(6);
  list.insert(1, 33);
  list.insert(3, 56);
  expect(list.printList()).toStrictEqual([99, 33, 10, 56, 6]);
});

test('should remove', () => {
  const list = new LinkedList();
  list.append(99);
  list.append(33);
  list.append(10);
  list.append(56);
  list.append(6);
  list.remove(1);
  list.remove(2);
  expect(list.printList()).toStrictEqual([99, 10, 6]);
});

test('should reverse', () => {
  const list = new LinkedList();
  list.append(99);
  list.append(33);
  list.append(10);
  list.append(56);
  list.append(6);
  list.reverse();
  expect(list.printList()).toStrictEqual([6, 56, 10, 33, 99]);
});
