/* Barrier 2  */

import bench.Barrier_2_Thread;
import bench.Counter;
import bench.TTAS_B1_Thread;
import locks.TTAS;

public class Barrier_2 {


	private static final int THREAD_COUNT  =  16;
	
	public static void main(String[] args) throws InterruptedException {
		
		final Counter counter = new Counter(THREAD_COUNT);
		
		final Barrier_2_Thread[] threads = new Barrier_2_Thread[THREAD_COUNT];
		
		for(int t=0; t<THREAD_COUNT; t++){
			threads[t] = new Barrier_2_Thread(counter,THREAD_COUNT,new TTAS());
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
