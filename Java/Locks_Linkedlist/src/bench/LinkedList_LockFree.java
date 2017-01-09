package bench;

import java.util.concurrent.atomic.AtomicMarkableReference;

public class LinkedList_LockFree<T> {
	
	private Node_LockFree<Integer> head;
	

	public LinkedList_LockFree(){
		head = new Node_LockFree<Integer>(Integer.MIN_VALUE);
		head.next = new AtomicMarkableReference(Integer.MAX_VALUE, false);
		head.next.set(new Node_LockFree<Integer>(Integer.MAX_VALUE), false);
	}
	
	public boolean add(T item) {
		int key = item.hashCode();
		while(true){
			Window window = Window.find(head,key);
			Node_LockFree<T> pred = window.pred;
			Node_LockFree<T> curr = window.curr;
			if(curr.key == key){
				return false;
			}
			else{
				Node_LockFree<T> node = new Node_LockFree(item);
				AtomicMarkableReference temp = new AtomicMarkableReference(curr,false);
				node.next = temp;
				if (pred.next.compareAndSet(curr, node, false, false)) {
					return true;
				}
			}
		}
	}
	
	public boolean remove(T item) {
		int key = item.hashCode();
		boolean snip;
		while(true){
			Window window = Window.find(head, key);
			Node_LockFree<T> pred = window.pred;
			Node_LockFree<T> curr = window.curr;
			if(curr.key != key){
				return false;
			}
			else{
				Node_LockFree<T> succ = curr.next.getReference();
				snip = curr.next.attemptMark(succ, true);
				if(!snip){
					continue;
				}
				pred.next.compareAndSet(curr, succ, false, false);
				return true;
			}
		}
		
	}

	
	public boolean contains(T item) {
		boolean[] marked = {false};
		int key = item.hashCode();
		Node_LockFree<T> curr = (Node_LockFree<T>) head;
		while(curr.key < key){
			curr = curr.next.getReference();
			try{
				Node_LockFree<T> succ = curr.next.get(marked);
			}catch(Exception e){
				
			}
		}
		return (curr.key == key && !marked[0]);
	}
	
	public String toString() {
        String result = "";
        Node_LockFree<Integer> current = head;
        while(current.next.getReference().item !=  Integer.MAX_VALUE){
            current = current.next.getReference();
            result += current.item + ", ";
        }
        return "List: " + result;

	}
}

