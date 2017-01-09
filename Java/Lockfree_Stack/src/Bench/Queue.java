package Bench;

import java.util.concurrent.atomic.AtomicMarkableReference;
import java.util.concurrent.atomic.AtomicReference;


public class Queue<T> {

	AtomicReference<Node<T>> head = new AtomicReference<Node<T>>();
	AtomicReference<Node<T>> tail = new AtomicReference<Node<T>>();
	ThreadLocal<Integer> semiLinear_count;

	public Queue(){
		Node<T> node = new Node<>(null);
		head.set(node);
		tail.set(node);
	}

	public void enq(T item){
		Node<T> node = new Node<>(item);
		while(true){
			Node<T> last = tail.get();
			Node<T> next = last.next.getReference();
			if(tail.get() == last){
				if (next == null){
					if(last.next.compareAndSet(next,node, false, false)){
						tail.compareAndSet(last, node);
						return;
					}
					else if(last.next.compareAndSet(next,node, true, true)){
						tail.compareAndSet(last, node);    
						return;
					}
				}
				else{
					tail.compareAndSet(last, next);
				}
			}
		}
	}


	public T deq(){
		int count = ((Test_ThreadQueue)Thread.currentThread()).getDeqElement();
		int restart = 0;
		while(true){
			restart = 0;
			Node<T> first = head.get();
			Node<T> last = tail.get();
			Node<T> next;
			try {
				next = first.next.getReference();
			} catch (NullPointerException e) {
				return null;
			}

			if(first == head.get()){
				if(first == last){
					if(next == null){
						//	System.out.println("2 - Queue is empty");
						return null;
					}
					tail.compareAndSet(last, next);
				}
				else{
					T value = null;
					Node<T> next_next = null;
					
					if(count == 0){								// handle the thread that removes the first element separately
						try {
						next_next = next.next.getReference();
						value = next.value;
						}catch(Exception e) {
							next_next = null;
						}		
					}
					else{
						while(count != 0){							// Traverse till you reach the node to deq			
							count--;
							try {
								next = next.next.getReference(); 	// If you see null here, then try with a new count 
							} catch (Exception e) {
								count = 0;							// Try to remove the first node
								restart = 1;
								break;
							}		
						}
						try{
							next_next = next.next.getReference();
							value = next.value;
						}catch (Exception e) {
							count = 0;							// Try to remove the first node
							restart = 1;
						}

						if(restart == 1){
							continue;
						}		
					}
					
					if(next.next.compareAndSet(next_next, next_next, false,  true)){
						return value;
					}
					else{
						first = head.get();
						try {
							next = first.next.getReference();
						} catch (NullPointerException e) {
							return null;
						}
						if(first == head.get()){
							if(first == last){
								if(next == null){
									//	System.out.println("2 - Queue is empty");
									return null;
								}
								tail.compareAndSet(last, next);
							}
						}
						if(next.next.isMarked()){
							while(true){
								try{
									if(!next.next.getReference().next.isMarked())
										break;
									next = next.next.getReference();
								}catch (Exception e){
									//System.out.println("traversal out of reach");
									return null;
								}
							}
							head.compareAndSet(first, next);
						}
						else{
							count = 0;
						}
					}
			}
		}
	}
}


void print_q(){
	boolean[] marked = null;
	Node<T> first  = head.get();
	Node<T> next = first.next.getReference();

	try {
		while(next != null){
			System.out.println(next.value);
			next = next.next.getReference();
		}
	} catch (Exception e) {
		// TODO Auto-generated catch block
		//e.printStackTrace();
	}

}

public int length(){
	int count = 0;
	Node<T> first  = head.get();
	Node<T> next = first.next.getReference();
	try {
		while(next != null){
			if(!next.next.isMarked())
				count++;
			next = next.next.getReference();
		}
	} catch (Exception e) {
		return count;
	}

	return count;
}

}
