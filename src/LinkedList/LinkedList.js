class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
    return this.head;
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
      return tempNode;
    }
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  insertBefore(item, key) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.next.value !== key) {
      if (currNode.next === null) {
        return 'key cannot be found';
      } else {
        currNode = currNode.next;
      }
    }
    let newItem = new _Node(item, currNode.next);
    return (currNode.next = newItem);
  }

  insertAfter(item, key) {
    if (!this.head) {
      return 'list does not exist';
    }
    let currNode = this.head;
    while (currNode.value !== key) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    let newItem = new _Node(item, currNode.next);
    return (currNode.next = newItem);
  }

  insertAt(item, position) {
    if (!this.head) {
      return 'list does not exist';
    }
    if (typeof position !== 'number') {
      return 'position must be a integer';
    }
    if (position === 1) {
      return this.insertFirst(item);
    }
    let currentPosition = 1;
    let currNode = this.head;
    while (currentPosition < position - 1) {
      if (currNode.next === null) {
        return this.insertLast(item);
      } else {
        currentPosition++;
        currNode = currNode.next;
      }
    }
    let newItem = new _Node(item, currNode.next);
    return (currNode.next = newItem);
  }
}

module.exports = LinkedList;