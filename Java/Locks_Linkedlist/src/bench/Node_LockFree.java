package bench;

import java.util.concurrent.atomic.AtomicMarkableReference;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Node_LockFree<T> {
	public T item;
	public int key;
	public AtomicMarkableReference<Node_LockFree<T>> next;
	public volatile boolean marked;
	public Lock lock = new ReentrantLock();
	
	public Node_LockFree(T n){
		item =  n;
		key = n.hashCode();
		marked = false;
	}
	
}
