package edu.vt.ece.bench;


/**
 * 
 * @author Mohamed M. Saad
 */
public class Counter {
	private int value;
	public Counter(int c){
		value = c;
	}
	public int getAndIncrement() {
		int temp = value;
		value = temp + 1;
		// Comment 3
			//System.out.println(" Thread " + ((TestThread)Thread.currentThread()).getThreadId() + " in critical section, Counter value= " +  value);
		return temp;
	}
	@Override
	public String toString() {
		return String.valueOf(value);
	}
}
