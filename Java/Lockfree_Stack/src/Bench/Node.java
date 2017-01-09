package Bench;

import java.util.concurrent.atomic.AtomicMarkableReference;
import java.util.concurrent.atomic.AtomicReference;

public class Node<T> {

	T value;
	AtomicMarkableReference<Node<T>> next;
	
	Node(T v){
		this.value = v;
		this.next = new AtomicMarkableReference<Node<T>>(null, false);
	}
}
