/* Barrier 1 with TTAS lock */

import bench.Counter;
import bench.TTAS_B1_Thread;
import locks.TTAS;

public class TTAS_B1 {


	private static final int THREAD_COUNT  =  16;
	
	public static void main(String[] args) throws InterruptedException {
		
		final Counter counter = new Counter(THREAD_COUNT);
		
		final TTAS_B1_Thread[] threads = new TTAS_B1_Thread[THREAD_COUNT];
		
		for(int t=0; t<THREAD_COUNT; t++){
			threads[t] = new TTAS_B1_Thread(counter,THREAD_COUNT,new TTAS());
		}
		

		long start = System.currentTimeMillis();
		
		for(int t=0; t<THREAD_COUNT; t++)
			threads[t].start();
		
		for(int t=0; t<THREAD_COUNT; t++)
			threads[t].join();
		
		long end = System.currentTimeMillis();
		
		long elapsed = end - start;
		System.out.println(elapsed);
	}

}
