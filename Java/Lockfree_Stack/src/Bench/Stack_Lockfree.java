package Bench;

import java.util.EmptyStackException;
import java.util.concurrent.atomic.AtomicReference;

public class Stack_Lockfree<T> {

	AtomicReference<Node_Stack_Lockfree<T>> top = new AtomicReference<>(null);
	static final int MIN_DELAY = 1;
	static final int MAX_DELAY = 10;
	Backoff backoff = new Backoff(MIN_DELAY, MAX_DELAY);
	
	protected boolean tryPush(Node_Stack_Lockfree<T> node){
		Node_Stack_Lockfree<T> oldTop = top.get();
		node.next = oldTop;
		return (top.compareAndSet(oldTop, node));
	}
	
	public void push(T value) throws InterruptedException{
		Node_Stack_Lockfree<T> node = new Node_Stack_Lockfree<>(value);
		while(true){
			if(tryPush(node)){
				return;
			}
			else{
				backoff.backoff();
			}
		}	
	}
	
	public Node_Stack_Lockfree<T> tryPop() throws EmptyStackException{
		Node_Stack_Lockfree<T> oldTop = top.get();
		if(oldTop == null){
			throw new EmptyStackException();
		}
		Node_Stack_Lockfree<T> newTop = oldTop.next;
	
		try {
			newTop = oldTop.next;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		if(top.compareAndSet(oldTop, newTop))
				return oldTop;
		else
			return null;
	}
	
	public T pop() throws InterruptedException{

		Node_Stack_Lockfree<T> returnNode = null;
		
		while(true){
			try{
				returnNode = tryPop();
			}
			catch(Exception e){
				
			}
			if(returnNode  != null){
				return returnNode.value;
			}
			else{
				backoff.backoff();
			}
		}
	}
	
	public void printStack(){
		Node_Stack_Lockfree<T> node = top.get();
		while(node!=null){
			System.out.println(node.value);
			node = node.next;
		}
	}
	
	public int size(){
		int count = 0;
		Node_Stack_Lockfree<T> node = top.get();

		
		while(node!=null){
			count++;
			node = node.next;
		}
		return count;
	}
	
}