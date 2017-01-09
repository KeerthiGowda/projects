import java.util.concurrent.ConcurrentLinkedQueue;

import Bench.Normal_Queue;
import Bench.Queue;
import Bench.Test_JavaConcurrentQueue;
import Bench.Test_ThreadNormalQueue;
import Bench.Test_ThreadQueue;

public class QueueTest {

	
	public static void main(String[] args) throws InterruptedException {
		
		int semiLinerCount = 1;
		int THREAD_COUNT = 0;
		String qName = null;
		int time = 100;
		int length = 0;
		long end = 0;
		long elapsed = 0; 
		long total_enq = 0;
		long total_deq = 0;
		
		try{
			qName = args[0];
			if(qName.equals("SLQueue")){
				semiLinerCount = Integer.parseInt(args[3]);
			}
			THREAD_COUNT = Integer.parseInt(args[1]);
			time = Integer.parseInt(args[2]);	
		}catch(NumberFormatException e){
			System.out.println("Not valid input");
		}
		

		Test_ThreadQueue[] t = new Test_ThreadQueue[THREAD_COUNT];
		Test_JavaConcurrentQueue[] tq = new Test_JavaConcurrentQueue[THREAD_COUNT];
		Test_ThreadNormalQueue[] tn = new Test_ThreadNormalQueue[THREAD_COUNT];
		
		
		if(qName.equals("SLQueue")){
			Queue<Integer> q = new Queue<Integer>();
			
			for(int i=0; i< THREAD_COUNT; i++)
				t[i] = new Test_ThreadQueue(q, THREAD_COUNT, i%semiLinerCount, time);
			
			for(int i=0; i< THREAD_COUNT; i++)
				t[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				t[i].join();
			
			end = System.currentTimeMillis();
			length = q.length();
			

			elapsed = end - t[0].startTime; 
			for(int i=0; i<THREAD_COUNT; i++)
				total_enq += t[i].num_enq;
			
			for(int i=0; i<THREAD_COUNT; i++)
				total_deq += t[i].num_deq;
		}
		else if(qName.equals("NQueue")){    // Concurrent java queue
			ConcurrentLinkedQueue<Integer> cq = new ConcurrentLinkedQueue<Integer>();
			
			for(int i=0; i< THREAD_COUNT; i++)
				tq[i] = new Test_JavaConcurrentQueue(cq, THREAD_COUNT, time);
			
			for(int i=0; i< THREAD_COUNT; i++)
				tq[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				tq[i].join();
			
			end = System.currentTimeMillis();
			length = cq.size();
			
			elapsed = end - tq[0].startTime; 
			
			for(int i=0; i<THREAD_COUNT; i++)
				total_enq += tq[i].num_enq;
			
			for(int i=0; i<THREAD_COUNT; i++)
				total_deq += tq[i].num_deq;
		}
		
		else if(qName.equals("LQueue")){		// My implementation
			Normal_Queue<Integer> nq = new Normal_Queue<Integer>();
			
			for(int i=0; i< THREAD_COUNT; i++)
				tn[i] = new Test_ThreadNormalQueue(nq, THREAD_COUNT, time);
			
			for(int i=0; i< THREAD_COUNT; i++)
				tn[i].start();
			
			for(int i=0; i<THREAD_COUNT; i++)
				tn[i].join();
			
			end = System.currentTimeMillis();
			length = nq.length();

			elapsed = end - tn[0].startTime; 
			for(int i=0; i<THREAD_COUNT; i++)
				total_enq += tn[i].num_enq;
			
			for(int i=0; i<THREAD_COUNT; i++)
				total_deq += tn[i].num_deq;
		}
		
		
		long throughput = (total_enq + total_deq)*1000 / (elapsed+1);
		System.out.println(total_enq + " " + total_deq + " " + length );
		System.out.println(throughput);
		//System.out.println(total_enq + "," + total_deq + "," + length + ","+ throughput); // To take readings
		
	}

}
