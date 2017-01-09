package edu.vt.ece.locks;

import java.util.concurrent.atomic.AtomicInteger;

import edu.vt.ece.bench.TestThread;
import edu.vt.ece.bench.ThreadId;

public class LockTwo implements Lock{

	private AtomicInteger victim;

	public LockTwo() {
		victim = new AtomicInteger();
	}
	
	@Override
	public void lock() {
		int i = ((ThreadId)Thread.currentThread()).getThreadId();
		victim.set(i);

		System.out.println("Thread " + i + " entered at system time in ms - "+ System.currentTimeMillis());
		while(victim.get() == i);
			//System.out.println("Thread " + i + " waiting");;
		
		//System.out.println(((TestThread)Thread.currentThread()).getThreadId() + " Locked");
		System.out.println("Thread - " +((TestThread)Thread.currentThread()).getThreadId()  + " Entered Critical Section");
		//while(true);
	}

	@Override
	public void unlock() {}

}
