import DoubleLinkedList from '../doubleLinkList';

const doubleLinkedList = new DoubleLinkedList();

test('should return empty arr if linked arr is empty', () => {
  const arr = doubleLinkedList.printList();
  expect(arr).toStrictEqual([]);
});

test('should append', () => {
  doubleLinkedList.append(10);
  doubleLinkedList.append(6);
  expect(doubleLinkedList.printList()).toStrictEqual([10, 6]);
});

test('should prepend', () => {
  doubleLinkedList.prepend(99);
  expect(doubleLinkedList.printList()).toStrictEqual([99, 10, 6]);
});
test('should shift', () => {
  doubleLinkedList.prepend(23);
  expect(doubleLinkedList.printList()).toStrictEqual([23, 99, 10, 6]);
  doubleLinkedList.shift();
  expect(doubleLinkedList.printList()).toStrictEqual([99, 10, 6]);
});

test('should insert', () => {
  const list = new DoubleLinkedList();
  list.append(99);
  list.append(10);
  list.append(6);
  list.insert(1, 33);
  list.insert(3, 56);
  expect(list.printList()).toStrictEqual([99, 33, 10, 56, 6]);
});

test('should remove', () => {
  const list = new DoubleLinkedList();
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
  const list = new DoubleLinkedList();
  list.append(99);
  list.append(33);
  list.append(10);
  list.append(56);
  list.append(6);
  list.reverse();
  expect(list.printList()).toStrictEqual([6, 56, 10, 33, 99]);
});
