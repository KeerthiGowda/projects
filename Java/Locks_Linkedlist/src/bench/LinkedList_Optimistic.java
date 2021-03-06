package bench;


public class LinkedList_Optimistic<T> implements Set<T>{
	
	private Node<T> head;
	
	public LinkedList_Optimistic(){
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
		Node node;
		node = head;
		while(node.key < pred.key){
			node = node.next;
		}
		return (node.key == pred.key) && (pred.next == curr);
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

	@Override
	public boolean contains(T item) {
		int key = item.hashCode();
		while(true){
			Node pred = this.head;
			Node curr = pred.next;
			while(curr.key < key){
				pred = curr;
				curr = curr.next;
			}
			synchronized(pred){
				synchronized(curr){
					if(validate(pred, curr)){
						return curr.key == key;
					}
				}
			}
		}
	}

	
}
