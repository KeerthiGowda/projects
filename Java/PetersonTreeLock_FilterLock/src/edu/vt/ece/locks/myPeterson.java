package edu.vt.ece.locks;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;


public class myPeterson {

	private AtomicBoolean flag[] = new AtomicBoolean[2];
	private AtomicInteger victim;

	public myPeterson() {
		flag[0] = new AtomicBoolean();
		flag[1] = new AtomicBoolean();
		victim = new AtomicInteger();
	}
	
	//@Override
	public void lock(int thread_id) {
		int i=thread_id;
		int j = 1-i;
		flag[i].set(true);
		victim.set(i);
		while(flag[j].get() && victim.get() == i);
	}

	//@Override
	public void unlock(int thread_id) {
		int i = thread_id;
		flag[i].set(false);
	}

}
