package bench;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Node<T>{
	public T item;
	public int key;
	public volatile Node next;
	public volatile boolean marked;
	public Lock lock = new ReentrantLock();
	
	public Node(T n){
		item =  n;
		key = n.hashCode();
		marked = false;
	}
	
}
