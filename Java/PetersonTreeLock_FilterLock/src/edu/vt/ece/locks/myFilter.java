package edu.vt.ece.locks;

import java.util.concurrent.atomic.AtomicInteger;

import edu.vt.ece.bench.TestThread;
import edu.vt.ece.bench.ThreadId;


public class myFilter implements Lock{
	private AtomicInteger[] level;
	private AtomicInteger[] victim;
	private int exLevels;
	
	
	public myFilter() {
		this(10); 		// Change number of threads here
		exLevels = 5;   // Change number of exclusion levels here 
	}

	public myFilter(int n){
		level = new AtomicInteger[n];
		victim = new AtomicInteger[n];
		for (int i = 0; i < n; i++) {
			level[i] = new AtomicInteger();
			victim[i] = new AtomicInteger();
		}
	}
	
	@Override
	public void lock() {
		  int me = ((ThreadId)Thread.currentThread()).getThreadId();
		  int found = 0, i = 0 ;
		  for( i=1; i<level.length-(exLevels-1); i++){
			  level[me].set(i);
			  victim[i].set(me);
			  found = exLevels+1; 
			   while(found	> exLevels &&  victim[i].get() == me  ){
				   found = 0; 
				   for(int k =0; k < level.length;k++){
					   if(level[k].get() >= level[me].get()){
						   found = found++;
					   }
				   }
			   }
			   /*Found 1 is itself */
			   if((i+1) == level.length-(exLevels-1))
				   System.out.println("Thread ID " + me + " Found = "+ found + " threads at level " + i);
		  }
		System.out.println(me + " Locked");
	}

	@Override
	public void unlock() {
		int me = ((ThreadId)Thread.currentThread()).getThreadId();
		System.out.println(me + " Un Locked");
		level[me].set(0);
	}

}
