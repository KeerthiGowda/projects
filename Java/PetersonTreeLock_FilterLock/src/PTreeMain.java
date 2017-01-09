
import edu.vt.ece.bench.Counter;
import edu.vt.ece.bench.MyPetSharedCounter;
import edu.vt.ece.bench.TestThread2;
import edu.vt.ece.locks.myPeterson;

/* Main code to test N- thread Peterson lock - This is slightly modified version of Test2.java
 * Classes used/modified - 	myPeterson.java -> Has slightly modified Peterson lock
 * 							MyPetSharedCounter -> Has modified lock algorithm to support N threads
 * 
 * More Details in Readme.txt
 */

public class PTreeMain {

	private static final int THREAD_COUNT = 16;
	private static final int TOTAL_ITERS = 64000;
	private static final int ITERS = TOTAL_ITERS/THREAD_COUNT;

	public static void main(String[] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException, InterruptedException {
		
		int noOfNodes = THREAD_COUNT - 1;
		final Counter counter = new MyPetSharedCounter(0, (myPeterson)Class.forName("edu.vt.ece.locks.myPeterson").newInstance(), noOfNodes);

		final TestThread2[] threads = new TestThread2[THREAD_COUNT];

		for(int t=0; t<THREAD_COUNT; t++) {
			threads[t] = new TestThread2(counter, ITERS);
		}

		for(int t=0; t<THREAD_COUNT; t++) {
			threads[t].start();
		}

		long totalTime = 0;
		for(int t=0; t<THREAD_COUNT; t++) {
			threads[t].join();
			totalTime += threads[t].getElapsedTime();
		}

		System.out.println("Average time per thread is " + totalTime/THREAD_COUNT + "ms" );

	}
}
