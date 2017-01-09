package bench;

import locks.Lock;
import locks.P_CLH;

public class SharedCounter extends Counter{
	private Lock lock;
	private P_CLH plock;

	public SharedCounter(int c, Lock lock) {
		super(c);
		this.lock = lock;
		plock = new P_CLH();
	}
	
	@Override
	public int getAndIncrement() {
		lock.Lock();
		int temp = -1;
		try {
			temp = super.getAndIncrement();
		} finally {
			lock.Unlock();
		}
		return temp;
	}
	
	@Override
	public int tryGetAndIncrement(){
		int temp = -1;
		if(plock.trylock()){
			try {
				temp = super.getAndIncrement();
			} finally {
				plock.Unlock();
			}
		}
		return temp;
	}

}
