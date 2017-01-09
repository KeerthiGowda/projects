package Bench;

public class Node_Stack_Lockfree<T> {
	T value;
	Node_Stack_Lockfree<T> next;
	
	public Node_Stack_Lockfree(T v){
		value = v;
		next = null; 
	}
	
}
