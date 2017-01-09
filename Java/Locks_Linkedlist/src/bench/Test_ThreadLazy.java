package bench;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

public class Test_ThreadLazy extends Thread{

	LinkedList_Lazy<Integer> set;
	public static AtomicInteger count = new AtomicInteger();
	private int threads;
	public long startTime;
	private int contains;
	
	public Test_ThreadLazy(LinkedList_Lazy l, int tc, int c) {
		set = l;
		threads = tc;
		contains = c;
	}

	@Override
	public void run() {
		
		Random r = new Random();
		int add = (100-contains)/2;
		int number = 0;
		for( int i=0; i<5000; i++){
			int less = (i%100);

			number = r.nextInt(50);
			
			if(less < add){
				set.add(number);
			}
			else if(less < contains+add){
				set.contains(number);
			}
			else{
				set.remove(number);
			}
		}
		 
		count.getAndIncrement();
		while(count.get() < threads);
		
		startTime = System.currentTimeMillis();
		
		for( int i=0; i<65564; i++){
			int less = (i%100);
			number = r.nextInt(100);
			if(less < add){
				set.add(number);
			}
			else if(less < contains+add){
				set.contains(number);
			}
			else{
				set.remove(number);
			}
		}
	}	
}
