package Bench;

import java.util.concurrent.atomic.AtomicInteger;

public class Test_ThreadNormalQueue extends Thread{

	Normal_Queue<Integer> q;
	static int threads;
	public long startTime;
	public long num_enq;
	public long num_deq;
	public long endTime; 
	public int time;
	volatile static AtomicInteger count = new AtomicInteger(0);
	
	public Test_ThreadNormalQueue(Normal_Queue<Integer> qu, int t, int tim){
		q = qu;
		threads = t;
		time = tim*1000;
	}
	
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
			for(int i=0 ; i< 10; i++){
				//if(q.deq() == null){System.out.println("null");}
				
			
				if(q.deq() != null){
					num_deq++;
				}
				num_enq++;
				q.enq(i);
			}
		}

	}
	
}
