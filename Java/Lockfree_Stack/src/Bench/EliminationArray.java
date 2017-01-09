package Bench;

import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class EliminationArray<T> {
	private static int duration = 10;
	LockFreeExchanger<T>[] exchanger;
	Random random;
	
	public EliminationArray(int capacity, int timeout) {
		exchanger = (LockFreeExchanger<T>[]) new LockFreeExchanger[capacity];
		duration = timeout;
		for (int i = 0; i < capacity; i++) {
			exchanger[i] = new LockFreeExchanger<T>();
		}
		random = new Random();
	}
	public T visit(T value, int range) throws TimeoutException {
		int slot = 0;
		if(range < 2){
			slot = 0;
		}
		else{
			slot = random.nextInt(range);
		}
		return (exchanger[slot].exchange(value, duration,
				TimeUnit.MILLISECONDS));
	}

}