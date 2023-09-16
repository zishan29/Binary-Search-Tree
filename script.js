function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

function Tree(arr) {
  this.root = null;
  this.str = '';
  this.inOrderArr = [];
  this.preOrderArr = [];
  this.postOrderArr = [];

  this.buildTree = (array = arr) => {
    if (array.length === 0) return null;
    const mid = parseInt(array.length / 2, 10);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));

    return node;
  };

  this.prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  this.insert = (value, node = this.root) => {
    if (node === null) {
      const newNode = new Node(value);
      return newNode;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  };

  this.delete = (value, node = this.root) => {
    if (node !== null) {
      if (value < node.data) {
        node.left = this.delete(value, node.left);
      } else if (value > node.data) {
        node.right = this.delete(value, node.right);
      } else {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null || node.right === null) {
          return node.left ? node.left : node.right;
        }

        let temp = node.left;
        while (temp.right !== null) {
          temp = temp.right;
        }
        node.data = temp.data;
        node.left = this.delete(temp.data, node.left);
      }
    }
    return node;
  };

  this.find = (value, node = this.root) => {
    if (node !== null) {
      if (value === node.data) return node;
      if (value < node.data) {
        return this.find(value, node.left);
      }
      return this.find(value, node.right);
    }
    return null;
  };

  this.levelOrder = (node = this.root) => {
    if (node === null) return [];
    const result = [];
    const queue = [];
    queue.push(node);
    while (queue.length !== 0) {
      const current = queue.shift();
      result.push(current.data);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    return result;
  };

  this.inOrder = (node = this.root) => {
    if (node === null) return [];
    this.inOrder(node.left);
    this.inOrderArr.push(node.data);
    this.inOrder(node.right);
    return this.inOrderArr;
  };

  this.preOrder = (node = this.root) => {
    if (node === null) return [];
    this.preOrderArr.push(node.data);
    this.preOrder(node.left);
    this.preOrder(node.right);
    return this.preOrderArr;
  };

  this.postOrder = (node = this.root) => {
    if (node === null) return [];
    this.postOrder(node.left);
    this.postOrder(node.right);
    this.postOrderArr.push(node.data);
    return this.postOrderArr;
  };

  this.height = (node = this.root) => {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };

  this.depth = (node, root = this.root, level = 0) => {
    if (node === null) return null;
    if (root === null) return 0;
    if (root.data === node.data) return level;
    const count = this.depth(node, root.left, level + 1);
    if (count !== 0) return count;
    return this.depth(node, root.right, level + 1);
  };

  this.isBalanced = (node = this.root) => {
    if (node == null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  };

  this.reBalance = () => {
    if (this.root === null) return;
    const sorted = [...new Set(this.inOrder().sort((a, b) => a - b))];
    this.root = this.buildTree(sorted);
  };
}

const arr = [1, 2, 3, 5, 8, 10, 15, 30];
const tree = new Tree(arr);
tree.root = tree.buildTree();
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
tree.insert(31);
tree.insert(36);

console.log(tree.isBalanced());
tree.reBalance();
console.log(tree.isBalanced());
