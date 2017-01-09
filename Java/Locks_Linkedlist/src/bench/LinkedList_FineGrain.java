package bench;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class LinkedList_FineGrain<T> {

	Node<Integer> head;
	
	public LinkedList_FineGrain(){
		head = new Node<Integer>(Integer.MIN_VALUE);
		head.next = new Node<Integer>(Integer.MAX_VALUE);
	}
	
	public boolean add(T item){
		int key = item.hashCode();
		head.lock.lock();
		Node pred = head;
		try{
			Node curr = pred.next;
			curr.lock.lock();
			try{
				while(curr.key < key){
					pred.lock.unlock();
					pred = curr;
					curr = curr.next;
					curr.lock.lock();
				}
				if(curr.key == key)
					return false;
				Node node = new Node(item);
				node.next = curr;
				pred.next = node;
				return true;
			}
			finally{
				curr.lock.unlock();
			}
		}finally{
			pred.lock.unlock();
		}	
	}
	
	public boolean remove(T item){
		Node pred = null, curr = null;
		int key = item.hashCode();
		head.lock.lock();
		try {
			pred = head;
			curr = pred.next;
			curr.lock.lock();
			try {
				while (curr.key < key) {
					pred.lock.unlock();
					pred = curr;
					curr = curr.next;
					curr.lock.lock();
				}
				if (curr.key == key) {
					pred.next = curr.next;
					return true;
				}
				else{
					return false;
				}
			} finally {
				curr.lock.unlock();
			}
		} finally {
			pred.lock.unlock();
		} 
	}
	
	public boolean contains(T item){
		int key = item.hashCode();
		head.lock.lock();
		Node pred = head;
		try{
			Node curr = pred.next;
			curr.lock.lock();
			try{
				while(curr.key < key){
					pred.lock.unlock();
					pred = curr;
					curr = curr.next;
					curr.lock.lock();
				}
				if(curr.key == key)
					return true;
				else
					return false;
			}
			finally{
				curr.lock.unlock();
			}
		}
		finally{
			pred.lock.unlock();
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
