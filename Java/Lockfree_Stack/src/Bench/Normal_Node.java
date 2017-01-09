package Bench;

import java.util.concurrent.atomic.AtomicReference;

public class Normal_Node<T> {

	T value;
	AtomicReference<Normal_Node<T>> next;
	
	Normal_Node(T v){
		this.value = v;
		this.next = new AtomicReference<Normal_Node<T>>(null);
	}
}
