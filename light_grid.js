// PriorityQueue Class implemented using a max heap
class PriorityQueue {

  // Initialize empty heap
	constructor(){
    this.heap = [];
    this.size = 0;
  }

  // Add element to PriorityQueue and heapify up
  // @param = [element, priority] array containing item and it's priority
  // @return = the size of the heap after adding the item
  insert(e){
    this.heap.push(e);
    ++this.size;
    if (this.size > 1){
      this.bubbleUp();
    }
    return this.size;
  }

  // Removes the highest priority item in the queue then heapifies down
  // @param = none
  // @return = highest priority item removed from the queue
  remove(){
    if (this.size === 0){
    	console.log("Popping from empty heap.");
      return 0;
    }
    let max = this.heap[0];
    this.heap[0] = this.heap[this.size - 1];
    this.heap.pop();
    --this.size;
    this.bubbleDown(0);
    return max[0];
  }

  // Swap with parent until reaches appropriate spot in the heap
  // @param = none
  // @return = index that item is situated
  // Called from insert
  bubbleUp(){
    let i = this.size - 1;
    let el = this.heap[i];
    let parentIdx = Math.ceil(i/2) - 1;
    while (parentIdx >= 0 && el[1] > this.heap[parentIdx][1]){
    	this.heap[i] = this.heap[parentIdx];
      this.heap[parentIdx] = el;
      i = parentIdx;
      parentIdx = Math.ceil(parentIdx/2) - 1;
    }
    return i;
  }

  // Swap with largest child until reaches appropriate spot in the heap
  // @param = index or item to relocate (usually 0)
  // @return = index that item is situated
  // Called from remove
  bubbleDown(i){
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

		while(true){
      if (left < this.size && this.heap[left][1] > this.heap[largest][1]){
      	largest = left;
      }

      if (right < this.size && this.heap[right][1] > this.heap[largest][1]){
      	largest = right;
      }

      if (largest !== i) {
        let el = this.heap[i];
        this.heap[i] = this.heap[largest];
        this.heap[largest] = el;
        left = i * 2 + 1;
        right = left + 1;
      }else{
        break;
      }
    }


    return i;
  }

}

// Finds the maximum number of rows that can be lit using exactly M column flips
// @param = grid (as an array) of equal length strings "Y" for light on, "N" light off
// @return = maximum number of rows that can be switched completely on
const maxLitRows = (grid, M) => {
  // Count the number of identical rows using a hash (Object)
  // Key = string of light state, Value = count
	let groups = {};
  for(let i in grid){
    groups[grid[i]] = (groups[grid[i]] + 1 || 1);
  }

  // For no flips find rows that are already on
  if (M === 0){
    let length = grid[0].length;
    let allY = "";
    for(let i = 0; i < length; ++i){
      allY += "Y";
    }
    return (groups[grid[allY]] || 0);
  }

  // Initialize PriorityQueue and fill to organize rows by highest frequency
  let lights = new PriorityQueue();
  Object.keys(groups).forEach( key => {
    lights.insert([key, groups[key]]);
  });

  // Remove row from queue and check if possible to switch on
  while (lights.size > 0){
    let count = 0;
    let row = lights.remove();
    // Count number of lights switched off in the row
    for (let i = 0; i < row.length; ++i){
      if (row[i] === 'N'){ ++count; }
    }
    // Logic behind whether M flips can switch on "count" off lights
    if (M >= count){
      if ((Math.floor(M/count) % 2 !== 0 && ((M % count) % 2) === 0) || (Math.floor(M/count) % 2 === 0 && ((M % count) + count) % 2 === 0)){
        return groups[row];
      }
    }
  }
  return 0;
};

console.log(maxLitRows(["NY","YN","YN"], 1));
