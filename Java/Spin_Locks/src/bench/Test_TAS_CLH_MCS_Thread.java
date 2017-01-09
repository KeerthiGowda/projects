package bench;
import locks.*;

public class Test_TAS_CLH_MCS_Thread extends Thread{
	
	private Lock lock;
	private FooBar fb = new FooBar();
	private int id;
	private static int ID_GEN = 0;
	private static int MAX_COUNT = 50000000;
	
	private int numThreads;
	private Counter counter;
	
	public Test_TAS_CLH_MCS_Thread(Counter counter, int n, Lock l) {
		lock = l;
		id = ID_GEN++;
		numThreads = n;
		this.counter = counter;
	}
	

	@Override
	public void run(){
		for(int i=0; i<MAX_COUNT; i++){
			lock.Lock();
			counter.getAndIncrement();
			lock.Unlock();
		}
	}
	
	public int getThreadId(){
		return id;
	}
	
}
