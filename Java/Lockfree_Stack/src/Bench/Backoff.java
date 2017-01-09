package Bench;

import java.util.Random;

public class Backoff {
	final int minDelay;
	final int maxDelay;
	int limit;
	final Random random;
	
	public Backoff(int min, int max){
		minDelay  = min;
		maxDelay  = max;
		limit  = minDelay;
		random = new Random();
	}
	
	public void backoff() throws InterruptedException{
		int delay = random.nextInt(limit);
		limit = Math.min(maxDelay, 2 * limit);
		Thread.sleep(delay);
	}

}
