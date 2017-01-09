package bench;


public class Counter {

	volatile private static int value = 0;
	private static int threadCount;
	
	volatile private static int[] b;
	
	public Counter(int threads){
		threadCount = threads;
		b = new int[threadCount];
	}
	public int getAndIncrement(){
		int temp = value;
		value += 1;
		return temp;
	}
	
	public int tryGetAndIncrement(){
		return 1;
	}
	
	public int get(){
		return value;
	}
	public void reset(){
		value = 0;
	}
	
	public void waitAndSet(int threadId){
		if(threadId == 0){
			b[threadId]  = 1;
		}
		else{
			while(b[threadId-1] != 1);
			b[threadId] = 1;
		}
		if(threadId == threadCount-1){
			b[threadId] = 2;
		}
	}
	
	public int getLast(){
		return b[threadCount-1];
	}
	
}
