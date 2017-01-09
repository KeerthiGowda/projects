package Bench;

import java.util.concurrent.atomic.AtomicInteger;

public class Test_ThreadQueue extends Thread{

	Queue<Integer> q;
	static int threads;
	public long startTime;
	public int n;
	public long num_enq;
	public long num_deq;
	public long endTime; 
	public int time;
	
	static AtomicInteger test_print = new AtomicInteger(0);
	
	volatile static AtomicInteger count = new AtomicInteger(0);
	
	public Test_ThreadQueue(Queue<Integer> reference_q, int t, int semiLinearCount, int tim){
		q = reference_q;
		threads = t;
		n = semiLinearCount;
		time = tim*1000;
	}
	
	@Override
	public void run(){
		
		for(int i=0 ; i< 1000; i++){
				q.enq(i);
		}
		for(int i=0 ; i< 1000; i++){
			q.deq();
		}	
		
		count.getAndIncrement();
		while(count.get() != threads);
			
		startTime = System.currentTimeMillis();
		endTime =  startTime + time;
		
		while(endTime > System.currentTimeMillis()){
			
			for(int i=0; i<100; i++){
				if(q.deq() != null)
					num_deq++;	
			
				q.enq(i++);
				num_enq++;
			
			}
		}
	/*	System.out.println(q.deq());
		num_deq++;
		System.out.println(q.deq());
		num_deq++;*/
	}

	public int getDeqElement() {
		return n;	
	}
}