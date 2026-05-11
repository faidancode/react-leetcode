// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

// Example 1:
// Input: head = [1,2,3,4]
// Output: [2,1,4,3]

/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // If the list is empty or has only one node, no swaps are possible.
    if (!head || !head.next) {
        return head;
    }

    // Initialize a dummy node to act as the starting point before the head.
    let dummy = new ListNode(0);
    dummy.next = head;
    
    // 'prev' tracks the node immediately before the pair we are swapping.
    let prev = dummy;

    // Loop as long as there is a pair (two nodes) left to swap.
    while (prev.next !== null && prev.next.next !== null) {
        // Identify the two nodes in the current pair.
        let first = prev.next;
        let second = prev.next.next;

        // Perform the swap by changing the 'next' pointers:
        // 1. Point 'prev' to the second node.
        prev.next = second;
        // 2. Point 'first' node to whatever was after the 'second' node.
        first.next = second.next;
        // 3. Point 'second' node back to the 'first' node.
        second.next = first;

        // Move 'prev' forward by two nodes to prepare for the next pair.
        prev = first;
    }

    return dummy.next;
};

// Logical Explanation

// The challenge here is not just swapping two nodes, but ensuring that the node before the pair and the node after the pair remain correctly connected to the swapped result.

// 1. The Dummy Node: We start with a dummy node pointing to head. This ensures that when we swap the first two nodes, we have a fixed reference point to return the new head (dummy.next).

// 2. The Pointer Shuffle: For every pair (let's call them $A$ and $B$):
// - We make the previous node point to $B$.
// - We make $A$ point to whatever was after $B$.
// - We make $B$ point to $A$.

// 3.Iteration: After the swap, the pointer prev moves to node $A$ (which is now the second node in the pair). The loop checks if there are at least two more nodes following prev to continue swapping.