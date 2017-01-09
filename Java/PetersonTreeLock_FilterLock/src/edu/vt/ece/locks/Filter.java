package edu.vt.ece.locks;

import java.util.concurrent.atomic.AtomicInteger;

import edu.vt.ece.bench.TestThread;
import edu.vt.ece.bench.ThreadId;

public class Filter implements Lock{
	private AtomicInteger[] level;
	private AtomicInteger[] victim;
	
	
	public Filter() {
		this(2);
	}

	public Filter(int n){
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
		for(int i=1; i<level.length; i++){
			level[me].set(i);
			victim[i].set(me);
			boolean found = false;
			long x = System.currentTimeMillis();
			
			System.out.println("Thread " + me + " entered at system time in ms - "+ x);
			
			
			
			do{
				for(int k=0; k<level.length; k++) {
					if(k!=me && (found = (level[k].get() >= i && victim[i].get() == me)))
						break;
				} 
				//System.out.println("Thread " + me + " waiting at level " + i );
			} while(found);
			
		}
			
			//System.out.println(((TestThread)Thread.currentThread()).getThreadId() + " Locked");
			System.out.println("Thread - " + me  + " Entered Critical Section");
			//while(true);
		
	}

	@Override
	public void unlock() {
		int me = ((ThreadId)Thread.currentThread()).getThreadId();
		level[me].set(0);
	}

}
