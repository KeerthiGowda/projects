package Bench;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;

public class Thread_Elimination_Recycle extends Thread{

	Elimination_Backoff_Stack<Integer> stack;
	int threads = 0;
	static int num_ops = 0;
	static int delay = 0;
	public int push_success = 0;
	public int pop_success = 0;
	public long startTime = 0;	
	
	volatile static AtomicInteger count = new AtomicInteger(0);
	
	public Thread_Elimination_Recycle(Elimination_Backoff_Stack<Integer> s, int t, int n, int d ){
		stack = s;
		threads = t;
		num_ops = n;
		delay = d;
	}
	
	public void run(){
		Random rand = new Random();
		Random other_rand = new Random();
		
		int temp = 0;
		
		// warmup 
		
		for(int i=1; i<1000; i++){
			temp = other_rand.nextInt(i);
			if(temp%2 == 0){
				stack.push(i);
			}
		}
		for(int i=1; i<2000; i++){
			try{
				stack.pop();
			}
			catch(Exception e){
					
			}
		}
		
		count.getAndIncrement();
		while(count.get() != threads);
		
		startTime = System.currentTimeMillis();
		
		for(int i=1; i<num_ops; i++){
			temp = other_rand.nextInt(i);
			if(temp%2 == 0){
				stack.push(i);
				push_success++;
			}
			else{
				//System.out.println(stack.pop());
				try{
					stack.pop();
					pop_success++;
				}
				catch(Exception e){
					//System.out.println("ex");
				}
				
			}
			try {
				Thread.sleep(rand.nextInt(delay));
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}

	}
}
