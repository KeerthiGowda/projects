package Bench;

import java.util.concurrent.atomic.AtomicReference;

public class Normal_Queue<T> {
	


	AtomicReference<Normal_Node<T>> head = new AtomicReference<Normal_Node<T>>();
	AtomicReference<Normal_Node<T>> tail = new AtomicReference<Normal_Node<T>>();
	ThreadLocal<Integer> semiLinear_count;

	public Normal_Queue(){
		Normal_Node<T> node = new Normal_Node<>(null);
		head.set(node);
		tail.set(node);
	}

	public void enq(T item){
		Normal_Node<T> node = new Normal_Node<>(item);
		while(true){
			Normal_Node<T> last = tail.get();
			Normal_Node<T> next = last.next.get();
			if(tail.get() == last){
				if (next == null){
					if(last.next.compareAndSet(next,node)){
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
		while(true){
			Normal_Node<T> first = head.get();
			Normal_Node<T> last = tail.get();
			Normal_Node<T> next;
			try {
				next = first.next.get();
			} catch (NullPointerException e) {
				return null;
			}

			if(first == head.get()){
				if(first == last){
					if(next == null){
						return null;
					}
					tail.compareAndSet(last, next);
				}
				else{
					T value = next.value;
					if (head.compareAndSet(first, next))
						return value;
					
				}
		}
	}
}


void print_q(){
	boolean[] marked = null;
	Normal_Node<T> first  = head.get();
	Normal_Node<T> next = first.next.get();

	try {
		while(next != null){
			System.out.println(next.value);
			next = next.next.get();
		}
	} catch (Exception e) {
		// TODO Auto-generated catch block
		//e.printStackTrace();
	}

}

public int length(){
	int count = 0;
	Normal_Node<T> first  = head.get();
	Normal_Node<T> next = first.next.get();
	try {
		while(next != null){
				count++;
			next = next.next.get();
		}
	} catch (Exception e) {
		return count;
	}

	return count;
}


}
