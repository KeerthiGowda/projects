
/*
 * Priority CLH lock and CLH lock with timeout. 
 * 
 * Priority CLH:
 * 1. Select he thread count in this file (line 15.
 * 2. Run the code. Output displays the final count and total time for all the threads with priorities 1-5.
 * 
 * CLH with timeout:
 * 1. Select the number of threads here.
 * 2. Go to bench/TestThread.java
 * 3. Set the timeout for any thread in the TestThread_PriorityLCH constructor.
 * 4. Uncomment counter.tryGetAndIncrement() and comment counter.getAndIncrement() as shown below,
 * 		35	//counter.getAndIncrement();
		36	  counter.tryGetAndIncrement();
	5. Output log shows the threads that are timed out and the count will be MaxCount - timeoutThreads.
 */

import java.util.Arrays;

import bench.*;
import locks.*;

public class Test_PriorityCLH {
	
	private static final int THREAD_COUNT  =  8;
	@SuppressWarnings("deprecation")
	public static void main(String[] args) throws InterruptedException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		String lockClass = "P_CLH";
		final Counter counter = new SharedCounter(0, (Lock)Class.forName("locks." + lockClass).newInstance());
				
		TestThread[] threads = new TestThread[THREAD_COUNT];
		
		TestThread_PriorityLCH pThread = new TestThread_PriorityLCH();
		pThread.start();

		for(int t=0; t<THREAD_COUNT; t++){
			threads[t]= new TestThread(counter);
		}
		for(int t=0; t<THREAD_COUNT; t++){
			threads[t].start();
		}
		for(int t=0; t<THREAD_COUNT; t++){
			threads[t].join();
		}	
		pThread.stop();
		
		System.out.println(counter.get());
		System.out.println("Priority Time = " + Arrays.toString(threads[1].runtime));
		
	}

}
