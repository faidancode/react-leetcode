// Given the head of a linked list, rotate the list to the right by k places.

// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]

// Input: head = [0,1,2], k = 4
// Output: [2,0,1]

// Two-Pointer Approach/ Link Modification Algorithm utilizing Modular Arithmetic

// Definition for singly-linked list node
// function ListNode(val, next) {
//     this.val = (val===undefined ? 0 : val)
//     this.next = (next===undefined ? null : next)
// }

function rotateRight(head, k) {
    // Edge case: empty list, single node, or no rotation needed
    if (!head || !head.next || k === 0) return head;

    // Step 1: Compute the length of the linked list 
    // and find the current tail node.
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // Step 2: Use modular arithmetic to eliminate redundant rotations
    k = k % length;
    if (k === 0) return head; // If k is a multiple of length, no change needed

    // Step 3: Connect the tail to the head to form a circular ring
    tail.next = head;

    // Step 4: Find the node just before the new head.
    // The new tail will be at position (length - k) from the start.
    let stepsToNewTail = length - k;
    let newTail = head;
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }

    // Step 5: Establish the new head and break the ring
    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
}

// Step-by-Step Explanation (Using Example 1)
// Let's look at head = [1,2,3,4,5] and k = 2:
// 1. Calculate Length: We traverse the list. The length is calculated as 5, and our tail pointer rests on node 5.
// 2. Optimize k: k = 2 % 5 = 2.
// 3. Form a Ring: We connect tail.next = head. Now node 5 points back to node 1 ($5 \rightarrow 1$), making it a circular list.
// 4. Locate the Split Point: We need to move stepsToNewTail = 5 - 2 = 3 steps from the start to find the new cut-off point. Starting at node 1, moving 3 steps landing exactly on node 3. Node 3 is our newTail.
// 5. Break the Ring: The node right after newTail is node 4. This becomes our newHead. We set newTail.next = null to break the loop.The list transforms from a ring into a linear structure starting at 4: [4, 5, 1, 2, 3].