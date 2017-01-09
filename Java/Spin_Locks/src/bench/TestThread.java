package bench;


/**
 * 
 * @author Mohamed M. Saad
 */
public class TestThread extends Thread implements ThreadId {
	private static int ID_GEN = 0;
	private static final int MAX_COUNT = 100;

	private long elapsed;
	private Counter counter;
	private int id;
	
	private int timeout;
	
	public volatile static int[] runtime	= new int[5];

	public TestThread(Counter counter) {
		id = ID_GEN++;
		this.counter = counter;
		
		if(id == 3)
			timeout = 100;   //ms
		else
			timeout = 10000;  // ms
	}
	
	@Override
	public void run() {
		long start = System.currentTimeMillis();
		
		for(int i=0; i<MAX_COUNT; i++){ 	
			counter.getAndIncrement();
			//counter.tryGetAndIncrement();
		}
		
		long end = System.currentTimeMillis();
		elapsed = end - start;
		int p = getThreadId()%5 +1;
		if( p== 1){
			runtime[0] += elapsed;
		}
		else if(p == 2){
			runtime[1] += elapsed;
		}
		else if(p == 3){
			runtime[2] += elapsed;
		}
		else if(p == 4){
			runtime[3] += elapsed;
		}
		else if(p == 5){
			runtime[4] += elapsed;
		}
		//System.out.println(p + "," + runtime[p-1] );
		
	}
	
	public int getThreadId(){	
		return id;
	}
	
	public long getElapsedTime() {
		return elapsed;
	}
	
	public int getTimeout(){
		return timeout;
	}
}
