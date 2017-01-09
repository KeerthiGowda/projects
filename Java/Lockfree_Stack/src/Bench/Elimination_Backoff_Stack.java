package Bench;

import java.util.EmptyStackException;
import java.util.Random;
import java.util.concurrent.TimeoutException;

public class Elimination_Backoff_Stack<T> extends Stack_Lockfree_Recycle<T> {
	static int capacity = 10;
	EliminationArray<T> eliminationArray;
	
	static ThreadLocal<RangePolicy> policy = new ThreadLocal<RangePolicy>() {
		protected synchronized RangePolicy initialValue() {
			return new RangePolicy(capacity);
		};
	};
	
	public Elimination_Backoff_Stack(int timeout, int size_elimination){
		capacity = size_elimination;
		eliminationArray = new EliminationArray<T>(capacity, timeout);
	}
	

	public void push(T value) {
		Random rand = new Random();
		RangePolicy rangePolicy = policy.get();
		Node_Stack_Recycle<T> node;
		
		if(rand.nextInt(2) > 0)
			node = allocate(value);
		else
			node = new Node_Stack_Recycle<T>(value);
		
		while (true) {
			if (tryPush(node)) {
				return;
			} else try {
				T otherValue = eliminationArray.visit
						(value, rangePolicy.getRange());
				if (otherValue == null) {
					rangePolicy.recordEliminationSuccess();
					return; // exchanged with pop
				}
			} catch (TimeoutException ex) {
				rangePolicy.recordEliminationTimeout();
			}
		}
	}

	public T pop() throws EmptyStackException {
		RangePolicy rangePolicy = policy.get();
		while (true) {
			
			Node_Stack_Recycle<T> returnNode = tryPop();
			
			if (returnNode != null) {
				free(returnNode);
				return returnNode.value;
			} else try {
				T otherValue = eliminationArray.visit(null, rangePolicy.getRange());
				if (otherValue != null) {
					rangePolicy.recordEliminationSuccess();
					return otherValue;
				}
			} catch (TimeoutException ex) {
				rangePolicy.recordEliminationTimeout();
			}
		}
	}

}
