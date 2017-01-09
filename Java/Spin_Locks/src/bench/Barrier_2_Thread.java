package bench;


import locks.*;

public class Barrier_2_Thread extends Thread{
	
	private Lock lock;
	private FooBar fb = new FooBar();
	private int id;
	private static int ID_GEN = 0;
	private static int MAX_COUNT = 100;
	
	private int numThreads;
	private Counter counter;
	
	public Barrier_2_Thread(Counter counter, int n, Lock l) {
		lock = l;
		id = ID_GEN++;
		numThreads = n;
		this.counter = counter;
	}
	
	@Override
	public void run(){
		
		fb.foo();
		System.out.println("Thread "+ getThreadId() + " Foo");
		counter.waitAndSet(getThreadId());
		
		while(counter.getLast()!=2);
		System.out.println("Thread "+ getThreadId() + " Bar");
		fb.bar();
	}
	
	public int getThreadId(){
		return id;
	}
	
}
