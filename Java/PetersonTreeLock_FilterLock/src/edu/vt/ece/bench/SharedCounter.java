package edu.vt.ece.bench;

import edu.vt.ece.locks.Lock;
import edu.vt.ece.bench.TestThread;

/**
 * 
 * @author Mohamed M. Saad
 */
public class SharedCounter extends Counter{
	private Lock lock;

	public SharedCounter(int c, Lock lock) {
		super(c);
		this.lock = lock;
	}
	
	@Override
	public int getAndIncrement(){
		lock.lock();
		//System.out.println(((TestThread)Thread.currentThread()).getThreadId() + " Locked");
		int temp = -1;
		
		//System.out.println("Thread - " +((TestThread)Thread.currentThread()).getThreadId()  + " Entered Critical Section");
		
		try {
			temp = super.getAndIncrement();
		} finally {
		//	try {
				//System.out.println("Thread - " +((TestThread)Thread.currentThread()).getThreadId()  + " Sleeping");
				///Thread.sleep((((TestThread)Thread.currentThread()).getThreadId() + 1)*1000);
		//	} catch (InterruptedException e) {
		//		System.out.println("ThreadSleep Exception");
		//	}
			
			//System.out.println(((TestThread)Thread.currentThread()).getThreadId() + " UnLocked");
			lock.unlock();
			
		}
		
		return temp;
	}

}
