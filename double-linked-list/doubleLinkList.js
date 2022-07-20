class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this.head;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
    return this;
  }

  shift() {
    const holdingPointer = this.head;
    this.head = this.head.next;
    this.head.prev = null;
    this.length--;

    return holdingPointer;
  }

  pop() {
    const holdingPointer = this.tail;
    this.tail = this.tail.prev;
    this.tail.next = null;

    return holdingPointer;
  }

  insert(ind, value) {
    const newNode = new Node(value);
    if (ind === 0) {
      this.prepend(value);
      return;
    }

    if (ind >= this.length) {
      this.append(value);
      return;
    }

    const leader = this.#traverse(ind - 1);

    const follower = leader.next;
    newNode.next = follower;
    newNode.prev = leader;
    leader.next = newNode;
    follower.prev = newNode;
    this.length++;
    return this.head;
  }

  remove(ind) {
    if (ind === 0) {
      this.shift();
      return;
    }

    if (ind >= this.length) {
      return 'Ind not found';
    }

    const nodeToDelete = this.#traverse(ind);
    nodeToDelete.next.prev = nodeToDelete.prev;
    nodeToDelete.prev.next = nodeToDelete.next;
    this.length--;
    return this.head;
  }

  printList() {
    const arr = [];
    if (!this.head) {
      return arr;
    }

    let currentNode = this.head;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }

  reverse() {
    let currentNode = this.tail;
    this.head = currentNode;
    while (currentNode) {
      let temp = currentNode.prev;
      currentNode.prev = currentNode.next;
      currentNode.next = temp;
      currentNode = temp;
    }
    return this.head;
  }

  #traverse(ind) {
    let currentInd = 0;
    if (!this.head) return null;
    if (this.length === 1) return this.head;
    let currentNode = this.head;
    while (currentInd !== ind) {
      currentNode = currentNode.next;
      currentInd++;
    }

    return currentNode;
  }
}

const list = new DoubleLinkedList();
list.append(99);
list.append(10);
list.append(6);
list.insert(1, 33);
list.insert(3, 56);

console.log(list.printList());

module.exports = DoubleLinkedList;
