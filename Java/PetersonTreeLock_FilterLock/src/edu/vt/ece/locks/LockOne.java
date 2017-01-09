package edu.vt.ece.locks;

import java.util.concurrent.atomic.AtomicBoolean;

import edu.vt.ece.bench.TestThread;
import edu.vt.ece.bench.ThreadId;

public class LockOne implements Lock{

	private AtomicBoolean[] flag = new AtomicBoolean[2];

	public LockOne() {
		flag[0] = new AtomicBoolean();
		flag[1] = new AtomicBoolean();
	}
	
	@Override
	public void lock() {
		int i = ((ThreadId)Thread.currentThread()).getThreadId();
		int j = 1 - i;
		flag[i].set(true);
		System.out.println("Thread " + i + " entered at system time in ms - "+ System.currentTimeMillis());
		while(flag[j].get());
			//System.out.println("Thread " + i + " is waiting");
		
		//System.out.println(((TestThread)Thread.currentThread()).getThreadId() + " Locked");
		//System.out.println("Thread - " +((TestThread)Thread.currentThread()).getThreadId()  + " Entered Critical Section");
		//while(true);
	}

	@Override
	public void unlock() {
		int i = ((ThreadId)Thread.currentThread()).getThreadId();
		System.out.println("Thread "+ i+"came out of critical section and is in unlock phase");
		flag[i].set(false);
	}

}
