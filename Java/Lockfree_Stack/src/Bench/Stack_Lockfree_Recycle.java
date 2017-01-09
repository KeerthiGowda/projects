package Bench;

import java.util.EmptyStackException;
import java.util.Random;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.atomic.AtomicStampedReference;


public class Stack_Lockfree_Recycle<T> {

	AtomicStampedReference<Node_Stack_Recycle<T>> top = new AtomicStampedReference<>(null,0);
	static final int MIN_DELAY = 1;
	static final int MAX_DELAY = 10;
	Backoff backoff = new Backoff(MIN_DELAY, MAX_DELAY);

	ThreadLocal<Node_Stack_Recycle<T>> freelist = new ThreadLocal<Node_Stack_Recycle<T>>(){
		protected Node_Stack_Recycle<T> initialvalue(){
			return null;
		};
	};

	protected Node_Stack_Recycle<T> allocate(T value){
		int[] stamp = new int[1];
		int[] newStamp = new int[1]; 
		Random rand = new Random();
		int freelist_size = freelist_size();
		int element = freelist_size < 10? freelist_size : 10;
		
		Node_Stack_Recycle<T> node = freelist.get();
		Node_Stack_Recycle<T> pred =  null;
		Node_Stack_Recycle<T> next =  null;
		
	/*	if (node == null) { // nothing to recycle
			node = new Node_Stack_Recycle<T>(value);
		} 
		else {           
			freelist.set(node.next.get(stamp));
		} */
		
		if(element == 0){
			node  = new Node_Stack_Recycle<T>(value);
		}
		
		else{
			
			element = rand.nextInt(element);
			
			if(element == 0){  // use top
				freelist.set(node.next.get(stamp));
			}
			else{
				while(element !=0){
					element--;
					pred = node;
					node = pred.next.getReference();
				}
				try{
				next = node.next.getReference();
				pred.next.set(next, 0);
				}catch(Exception e){
					pred.next.set(null, 0);
				}
				
			}
			
		}
		node.value = value;
		return node;
	}

	protected void free(Node_Stack_Recycle<T> node){
		Node_Stack_Recycle<T> free = freelist.get();
		node.next = new AtomicStampedReference<Node_Stack_Recycle<T>>(free,0);
		freelist.set(node);
	}

	protected boolean tryPush(Node_Stack_Recycle<T> node){
		int[] stamp = new int[1];
		Node_Stack_Recycle<T> oldTop = top.get(stamp);
		node.next.set(oldTop,0); // check this
		return (top.compareAndSet(oldTop, node, stamp[0], stamp[0]+1));
	}

	public void push(T value) throws InterruptedException{
	
	//	Node_Stack_Recycle<T> node = new Node_Stack_Recycle<T>(value);
		Node_Stack_Recycle<T> node = allocate(value);
		
		while(true){
			if(tryPush(node)){
				return;
			}
			else{
				backoff.backoff();
			}
		}

	}

	public Node_Stack_Recycle<T> tryPop() throws EmptyStackException{
		int[] stamp = new int[1];
		int[] newStamp = new int[1];
		
		Node_Stack_Recycle<T> oldTop = top.get(stamp);
		if(oldTop == null){
			throw new EmptyStackException();
		}
		Node_Stack_Recycle<T> newTop = oldTop.next.get(newStamp);

		if(top.compareAndSet(oldTop, newTop, stamp[0], stamp[0]+1))
			return oldTop;
		else
			return null;
	}

	public T pop() throws InterruptedException{

		Node_Stack_Recycle<T> returnNode = null;
		
		while(true){ 
			try{
				returnNode = tryPop();
			}
			catch(Exception e){
				throw new InterruptedException();
			}
			if(returnNode  != null){
				free(returnNode);
				return returnNode.value;
			}
			else{
				backoff.backoff();
			}

		}
	}

	public void printStack(){
		int[] stamp = new int[1];
		Node_Stack_Recycle<T> node = top.get(stamp);
		while(node!=null){
			System.out.println(node.value);
			node = node.next.get(stamp);
		}
	}
	
	public int freelist_size(){
		int count = 0;
		Node_Stack_Recycle<T> node = freelist.get();
		while(node != null){
			try{
				node = node.next.getReference();
				count++;
				if(count>10){
					if(node.next!=null)
						node.next = null;
					break;
				}
			}
			catch(Exception e){
				break;
			}
		}
		return count;
	}

	public int size(){
		int count = 0;
		int[] stamp = new int[1];
		Node_Stack_Recycle<T> node = top.getReference();
		while(node != null){
			node = node.next.getReference();
			count++;
		}
		return count;
	}
}