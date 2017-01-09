package Bench;

import java.util.concurrent.atomic.AtomicStampedReference;

public class Node_Stack_Recycle<T> {

	public T value;
	public AtomicStampedReference<Node_Stack_Recycle<T>> next;

	public Node_Stack_Recycle(T v) {
		value = v;
		this.next  = new AtomicStampedReference<Node_Stack_Recycle<T>>(null, 0);
	}

}
