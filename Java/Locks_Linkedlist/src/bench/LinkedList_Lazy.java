package bench;


public class LinkedList_Lazy<T> {
	
	private Node head;
	
	public LinkedList_Lazy(){
		head = new Node(Integer.MIN_VALUE);
		head.next = new Node(Integer.MAX_VALUE);
	}
	
	public boolean add(T item){
		int key = item.hashCode();
		while(true){
			Node pred = head;
			Node curr = head.next;
			while(curr.key < key){
				pred = curr;
				curr = curr.next;
			}
			synchronized(pred){
				synchronized(curr){
					if(validate(pred, curr)){
						if(curr.key == key)
							return false;
						else{
							Node node = new Node(item);
							node.next = curr;
							pred.next = node;
							return true;
						}
					}
				}
				
			}	
		}
	}
	
	public boolean remove(T item){
		int key = item.hashCode();
		while(true){
			Node pred = head;
			Node curr = pred.next;
			while(curr.key < key){
				pred = curr;
				curr = curr.next;
			}
			synchronized(pred){
				synchronized(curr){
					if(validate(pred, curr)){
						if(curr.key == key){
							curr.marked = true;
							pred.next = curr.next;
							return true;
						}
						else 
							return false;
					}
				}
			}
		}
	}
	
	public boolean validate(Node pred, Node curr){
		return !pred.marked && !curr.marked && (pred.next == curr);
	}
	
	public boolean contains(T item) {
		int key = item.hashCode();
		Node curr = head;
		while(curr.key < key){
			curr = curr.next;
		}
		return (curr.key == key) && !curr.marked;
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
