package bench;


import locks.*;

public class TTAS_B1_Thread extends Thread{
	
	private Lock lock;
	private FooBar fb = new FooBar();
	private int id;
	private static int ID_GEN = 0;
	private static int MAX_COUNT = 100;
	
	private int numThreads;
	private Counter counter;
	
	public TTAS_B1_Thread(Counter counter, int n, Lock l) {
		lock = l;
		id = ID_GEN++;
		numThreads = n;
		this.counter = counter;
	}
	
	@Override
	public void run(){
		
		fb.foo();
		//System.out.println("Thread "+ getThreadId() + " Foo");
		lock.Lock();
		counter.getAndIncrement();
		lock.Unlock();
		
		while(counter.get() != numThreads){}
		fb.bar();
		//System.out.println("Thread "+ getThreadId() + " Bar");
	}
	
	public int getThreadId(){
		return id;
	}
	
}
