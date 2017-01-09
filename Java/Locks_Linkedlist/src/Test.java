import bench.LinkedList_CourseGrain;
import bench.LinkedList_FineGrain;
import bench.LinkedList_Lazy;
import bench.LinkedList_LockFree;
import bench.LinkedList_Optimistic;
import bench.Test_ThreadCourseGrain;
import bench.Test_ThreadFineGrain;
import bench.Test_ThreadLazy;
import bench.Test_ThreadLockFree;
import bench.Test_ThreadOptimistic;


public class Test {

	public static void main(String[] args) throws InterruptedException {
		try{
		int THREAD_COUNT = 0 ;
		int contains = 90;
		float throughput = 0;
		
		try{
			THREAD_COUNT = Integer.parseInt(args[1]);
			contains = Integer.parseInt(args[2]);
		}catch(NumberFormatException e){
			System.out.println("Not valid Thread count or conatins %");
		}
		
		String s = args[0];
		
		Test_ThreadCourseGrain[] t1 = new Test_ThreadCourseGrain[THREAD_COUNT];
		Test_ThreadFineGrain[] t2 = new Test_ThreadFineGrain[THREAD_COUNT];
		Test_ThreadLazy[] t3 = new Test_ThreadLazy[THREAD_COUNT];
		Test_ThreadLockFree[] t4 = new Test_ThreadLockFree[THREAD_COUNT];
		Test_ThreadOptimistic[] t5 = new Test_ThreadOptimistic[THREAD_COUNT];
		
		if(s.equals("course")){
			LinkedList_CourseGrain<Integer> l = new LinkedList_CourseGrain<>();
			for(int i=0; i<THREAD_COUNT; i++)
				t1[i] = new Test_ThreadCourseGrain(l,THREAD_COUNT,contains);
			
			for(int i=0; i<THREAD_COUNT; i++)
				t1[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				t1[i].join();
			
			long end = System.currentTimeMillis();
			throughput = (float) 65534/(end - t1[0].startTime)* 1000*THREAD_COUNT;

		}
		else if(s.equals("fine")){
			LinkedList_FineGrain<Integer> l = new LinkedList_FineGrain<>();
			for(int i=0; i<THREAD_COUNT; i++)
				t2[i] = new Test_ThreadFineGrain(l,THREAD_COUNT,contains);
			
			for(int i=0; i<THREAD_COUNT; i++)
				t2[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				t2[i].join();
			
			long end = System.currentTimeMillis();
			throughput = (float) 65534/(end - t2[0].startTime)* 1000*THREAD_COUNT;

		}
		else if(s.equals("lazy")){
			LinkedList_Lazy<Integer> l = new LinkedList_Lazy<>();
			for(int i=0; i<THREAD_COUNT; i++)
				t3[i] = new Test_ThreadLazy(l,THREAD_COUNT,contains);
			
			
			for(int i=0; i<THREAD_COUNT; i++)
				t3[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				t3[i].join();
			
			long end = System.currentTimeMillis();
			throughput = (float) 65534/(end - t3[0].startTime)* 1000*THREAD_COUNT;

		}
		else if(s.equals("lockfree")){
			LinkedList_LockFree<Integer> l = new LinkedList_LockFree<>();
			for(int i=0; i<THREAD_COUNT; i++)
				t4[i] = new Test_ThreadLockFree(l,THREAD_COUNT,contains);
						
			for(int i=0; i<THREAD_COUNT; i++)
				t4[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				t4[i].join();
			
			long end = System.currentTimeMillis();
			throughput = (float) 65534/(end - t4[0].startTime)* 1000*THREAD_COUNT;

		}
		else if(s.equals("optimistic")){
			LinkedList_Optimistic<Integer> l = new LinkedList_Optimistic<>();
			for(int i=0; i<THREAD_COUNT; i++)
				t5[i] = new Test_ThreadOptimistic(l,THREAD_COUNT, contains);

			for(int i=0; i<THREAD_COUNT; i++)
				t5[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				t5[i].join();
			
			long end = System.currentTimeMillis();
			throughput = (float) 65534/(end - t5[0].startTime)* 1000*THREAD_COUNT;

		}
		else{
			System.out.println("Wrong arguments");
			return;
		}
		
		System.out.println(args[0] + "," + args[1] + "," + args[2] + "," +throughput);
		}
		catch(Exception e){
			System.out.println("No args passed");
		}
	}

}
