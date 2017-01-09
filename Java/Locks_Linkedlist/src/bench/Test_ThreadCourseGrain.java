package bench;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.*;

public class Test_ThreadCourseGrain extends Thread{

	public static AtomicInteger count = new AtomicInteger();
	LinkedList_CourseGrain<Integer> set;
	private int threads;
	public static long startTime;
	private int contains;
	
	public Test_ThreadCourseGrain(LinkedList_CourseGrain l, int threadCount, int c) {
		threads = threadCount;
		set = l;
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
