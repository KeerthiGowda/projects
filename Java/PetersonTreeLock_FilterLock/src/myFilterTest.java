
/* Run this for L Exclusion */
/* Set the value of N and L in myFilter.java file */
/* 
 * public myFilter() {
		this(10); 		// Change number of threads here
		exLevels = 5;   // Change number of exclusion levels here 
	}
	
	Also change thread count in this file
	THREAD_COUNT = 10;
 */


import edu.vt.ece.bench.Counter;
import edu.vt.ece.bench.SharedCounter;
import edu.vt.ece.bench.TestThread;
import edu.vt.ece.locks.*;

/**
 * 
 * @author Mohamed M. Saad
 */
public class myFilterTest { 

	private static final int THREAD_COUNT = 10;
	
	private static final String LOCK_ONE = "LockOne";
	private static final String LOCK_TWO = "LockTwo";
	private static final String PETERSON = "Peterson";
	private static final String FILTER = "Filter";

	public static void main(String[] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		String lockClass = (args.length==0 ? FILTER : args[0]);
		final Counter counter = new SharedCounter(0, (Lock)Class.forName("edu.vt.ece.locks.myFilter").newInstance());
		
		for(int t=0; t<THREAD_COUNT; t++)
			new TestThread(counter).start();
	}
}
