class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else if (this.head && this.length === 1) {
      this.head.next = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  shift() {
    if (!this.head) return null;
    this.head = this.head.next;
    this.length--;
    return this.head;
  }

  insert(index, value) {
    const newNode = new Node(value);
    if (index === 0) {
      this.prepend(value);
      return this.head;
    }
    if (index >= this.length) {
      this.append(value);
      return this.head;
    }
    const leader = this.#traverse(index - 1);
    const follower = leader.next;
    leader.next = newNode;
    newNode.next = follower;
    this.length++;
    return this.head;
  }

  remove(index) {
    if (index === 0) {
      this.shift();
      return this.head;
    }

    if (index >= this.length) {
      return 'Index not found';
    }

    const leader = this.#traverse(index - 1);
    const nodeToDelete = leader.next;
    leader.next = nodeToDelete.next;
    this.length--;
    return this.head;
  }

  reverse() {
    if (!this.head) return null;
    if (this.length === 1) return this.head;
    let first = this.head;
    let second = first.next;
    this.tail = first;
    while (second) {
      const temp = second.next;
      second.next = first;
      first = second;
      second = temp;
    }

    this.head.next = null;
    this.head = first;
  }

  printList() {
    const arr = [];
    if (!this.head) return arr;
    let currentNode = this.head;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }

  #traverse(index) {
    let count = 0;
    if (!this.head) return null;
    if (this.length === 1) return this.head;
    let currentNode = this.head;
    while (count !== index) {
      currentNode = currentNode.next;
      count++;
    }
    return currentNode;
  }
}

module.exports = LinkedList;
