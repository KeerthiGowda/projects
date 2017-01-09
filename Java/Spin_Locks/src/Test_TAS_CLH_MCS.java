/* Problem 2.
 * Uncomment line 15, 16 and 17 to run the respective lock. 
 */


import bench.Counter;
import bench.Test_TAS_CLH_MCS_Thread;
import locks.*;

public class Test_TAS_CLH_MCS {
	
	private static final int THREAD_COUNT  =  8;
	
	@SuppressWarnings("deprecation")
	public static void main(String[] args) throws InterruptedException {
		
		Lock l;
		String lockClass = "TAS";
		//String lockClass = "CLH";
		//String lockClass = "MCS";
		
		if(lockClass.equals("TAS")){
			l = new TAS();
		}
		else if(lockClass.equals("CLH")){
			l = new CLH();
		}
		else{
			l = new MCS();
		}
		
		Counter counter = new Counter(THREAD_COUNT);
			
			Test_TAS_CLH_MCS_Thread[] threads = new Test_TAS_CLH_MCS_Thread[THREAD_COUNT];
			
			
			for(int t=0; t<THREAD_COUNT; t++){
				threads[t] = new Test_TAS_CLH_MCS_Thread(counter,THREAD_COUNT,l);
			}
			
			long start = System.currentTimeMillis();
			for(int t=0; t<THREAD_COUNT; t++)
				threads[t].start();
			
			while(System.currentTimeMillis() - start < 2000){}
			int c  = counter.get();
			
			for(int t=0; t<THREAD_COUNT; t++)
				threads[t].stop();
			
			System.out.println(c);
		
	}

}
