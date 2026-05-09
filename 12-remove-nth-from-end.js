// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // Create a dummy node that points to the head.
  // This handles edge cases, such as removing the head node itself.
  let dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  // Move the 'fast' pointer n + 1 steps ahead.
  // This creates a gap of 'n' nodes between 'slow' and 'fast'.
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both pointers until 'fast' reaches the end of the list.
  // Since the gap is maintained, 'slow' will stop exactly
  // before the node that needs to be removed.
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // Remove the nth node by skipping it in the chain.
  slow.next = slow.next.next;

  // Return the updated list starting from the original head.
  return dummy.next;
};

// Logic Breakdown

// 1. The Dummy Node: We initiate a dummy node before the head. If the list has only one node and we need to remove it, or if we need to remove the first node of a longer list, the dummy node ensures we always have a valid reference to the previous node.
// 2. Creating the Gap: By moving the fast pointer $n + 1$ steps ahead while keeping slow at the start, we establish a fixed distance.
// 3. The Shift: We slide this "window" (the gap between pointers) down the list. When fast hits the null terminator at the end, slow is guaranteed to be at the node immediately preceding the one we want to delete.
// 4. The Deletion: By setting slow.next = slow.next.next, we effectively drop the target node from the memory chain.
