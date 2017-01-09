package bench;

public class LinkedList_CourseGrain<T> {
	
	private Node head;
	
	public LinkedList_CourseGrain(){
		head = new Node(Integer.MIN_VALUE);
		head.next = new Node(Integer.MAX_VALUE);
	}
	
	public boolean add(T item) {
		Node pred, curr;
		int key = item.hashCode();
		synchronized(this){
			pred = head;
			curr = pred.next;
			while (curr.key < key) {
				pred = curr;
				curr = curr.next;
			}
			if (key == curr.key) {
				return false;
			} else {
				Node node = new Node(item);
				node.next = curr;
				pred.next = node;
				return true;
			} 
		}
	}
	
	public boolean remove(T item) {
		Node pred, curr;
		int key = item.hashCode();
		synchronized(this){
			pred = head;
			curr = pred.next;
			while (curr.key < key) {
				pred = curr;
				curr = curr.next;
			}
			if (key == curr.key) {
				pred.next = curr.next;
				return true;
			} else {
				return false;
			}
		} 
	}
	
	public boolean contains(T item){
		int key = item.hashCode();
		synchronized(this){
			Node curr = head;
			while (curr.key < key) {
				curr = curr.next;
			}
			if(curr.key == key)
				return true;
			else
				return false;
		}
	}
	
	public String toString() {
        String result = "";
        Node current = head;
        while(current.next.key !=  Integer.MAX_VALUE){
            current = current.next;
            result += current.item + ", ";
        }
        return "List: " + result;
	}
}
