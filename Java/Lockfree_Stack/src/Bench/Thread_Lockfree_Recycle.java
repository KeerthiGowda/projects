package Bench;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

public class Thread_Lockfree_Recycle<T> extends Thread {

	Stack_Lockfree_Recycle<Integer> stack;
	int threads = 0;
	public int push_success = 0;
	public int pop_success = 0;
	public long startTime = 0;	
	
	volatile static AtomicInteger count = new AtomicInteger(0);
	
	public Thread_Lockfree_Recycle(Stack_Lockfree_Recycle<Integer> s, int t){
		stack = s;
		threads = t;
	}
	
	public void run(){
		Random rand = new Random();
		Random other_rand = new Random();
		int temp = 0;
		
		// warmup
		for(int i=1; i<3000; i++){
			temp = other_rand.nextInt(i);
			//if(temp%3 != 0){
				try {
					stack.push(i);
					push_success++;
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			//}
		}
		for(int i=1; i<3000; i++){
				try {
					stack.pop();
					pop_success++;
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		
		count.getAndIncrement();
		while(count.get() != threads);
			
		
		startTime = System.currentTimeMillis();
		
		for(int i=1; i<60000; i++){
			temp = other_rand.nextInt(i);
			if(temp%2 != 0){
				try {
					stack.push(i);
					push_success++;
				} catch (InterruptedException e) {
				}
			}
			else{
				try {
					stack.pop();
					pop_success++;
				} catch (InterruptedException e) {
				}
				
			}
		}
		for(int i=1; i<30001; i++){
				
		}	
		
		
	}
}
