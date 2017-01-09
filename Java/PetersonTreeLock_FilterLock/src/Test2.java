import edu.vt.ece.bench.Counter;
import edu.vt.ece.bench.SharedCounter;
import edu.vt.ece.bench.TestThread;
import edu.vt.ece.bench.TestThread2;
import edu.vt.ece.locks.*;

/**
 * 
 * @author Balaji Arun
 */
public class Test2 {

	private static final int THREAD_COUNT = 2;
	private static final int TOTAL_ITERS = 64000;
	private static final int ITERS = TOTAL_ITERS/THREAD_COUNT;
	
	private static final String LOCK_ONE = "LockOne";
	private static final String LOCK_TWO = "LockTwo";
	private static final String PETERSON = "Peterson";
	private static final String FILTER = "Filter";

	public static void main(String[] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException, InterruptedException {
		String lockClass = (args.length==0 ? PETERSON : args[0]);
		final Counter counter = new SharedCounter(0, (Lock)Class.forName("edu.vt.ece.locks." + lockClass).newInstance());

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

		System.out.println("Average time per thread is " + totalTime/THREAD_COUNT + "ms");

	}
}
