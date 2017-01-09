package Bench;

public class Thread_Lockfree_Stack extends Thread{

	Stack_Lockfree<Integer> stack;
	int threads = 0;
	public long startTime;
	
	public Thread_Lockfree_Stack(Stack_Lockfree<Integer> s, int t){
		stack = s;
		threads = t;
	}
	
	public void run(){
		
		startTime = System.currentTimeMillis();
		for(int i=0; i<1000; i++){
			try {
				stack.push(i);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		}
		
		for(int i=0; i<1000; i++){
			try {
				System.out.println(stack.pop());
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
			//	e.printStackTrace();
			}
		}
		
	}
}
