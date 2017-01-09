import Bench.Stack_Lockfree;

import Bench.*;

public class EliminationStack {

	public static void main(String[] args) throws InterruptedException {
		
		int Thread_count = 4;
		int delay = 10;
		long end = 0;
		long elapsed = 0;
		int numOp = 0;
		int timeout = 0;
		int size_elimination = 0;
		long total_push = 0;
		long total_pop = 0;
		long throughput = 0;
		
		String s = "none";
		
		try{
			Thread_count = Integer.parseInt(args[0]);
			delay = Integer.parseInt(args[1]);
			numOp = Integer.parseInt(args[2]);
			timeout =  Integer.parseInt(args[3]);
			size_elimination = Integer.parseInt(args[4]);
		}
		catch(Exception e){
			if(args[0].equals("lockfree")){
				s = "lockfree";
			}
			else{
				System.out.println("Invaid inputs");
			}
		}
		
		
		Stack_Lockfree<Integer> stack = new Stack_Lockfree();
		Stack_Lockfree_Recycle<Integer> stack_recycle = new Stack_Lockfree_Recycle<>();
		Elimination_Backoff_Stack<Integer> stack_elimination = new Elimination_Backoff_Stack<Integer>(timeout,size_elimination);
		
		Thread_Lockfree_Stack[] t = new Thread_Lockfree_Stack[Thread_count];
		Thread_Lockfree_Recycle[] t_r = new Thread_Lockfree_Recycle[Thread_count];
		Thread_Elimination_Recycle[] t_e = new Thread_Elimination_Recycle[Thread_count];
		
		// Lockfree stack with recycle
		if(s.equals("lockfree")){
			for(int i=0 ; i<Thread_count ; i++)
				t_r[i] = new Thread_Lockfree_Recycle(stack_recycle, Thread_count);
			
			for(int i=0 ; i<Thread_count ; i++)
				t_r[i].start();
			
			for(int i=0 ; i<Thread_count ; i++)
				t_r[i].join();
			
			end = System.currentTimeMillis();
			elapsed = end - t_r[0].startTime ;

			for(int i=0 ; i<Thread_count ; i++){
				total_push +=t_r[i].push_success;
			}
			
			for(int i=0 ; i<Thread_count ; i++)
				total_pop += t_r[i].pop_success;
			
			throughput  = (total_push+total_pop)*1000 / elapsed;
			
			System.out.println(elapsed);
			System.out.println(total_push + " " + total_pop + " " + stack_recycle.size());

		}
		
		
		// Elimination stack
		else if(args.length > 2) {
			
			for(int i=0 ; i<Thread_count ; i++)
				t_e[i] = new Thread_Elimination_Recycle(stack_elimination, Thread_count,numOp, delay);
			
			for(int i=0 ; i<Thread_count ; i++)
				t_e[i].start();
			
			for(int i=0 ; i<Thread_count ; i++)
				t_e[i].join();
			
			end = System.currentTimeMillis();
			elapsed = end - t_e[0].startTime ;

			System.out.println( elapsed);
			
			for(int i=0 ; i<Thread_count ; i++){
				total_push +=t_e[i].push_success;
			}
			
			for(int i=0 ; i<Thread_count ; i++)
				total_pop += t_e[i].pop_success;
			
			throughput  = (total_push+total_pop)*1000 / elapsed;
			
			 System.out.println(total_push + " " + total_pop + " " + stack_elimination.size());
			
		}
		

		
		
		
	}

}
