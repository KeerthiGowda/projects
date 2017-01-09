package locks;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

import bench.TestThread;

public class QNODE_CLH implements Comparable<QNODE_CLH> {

	volatile int priority;
	private volatile AtomicBoolean locked;
	
	public QNODE_CLH(boolean l){
		priority = (((TestThread)Thread.currentThread()).getThreadId())%5 + 1;
		locked = new AtomicBoolean(l);
	}
	
	public boolean getLocked() {
		return locked.get();
	}
	public int getPriority() {
		return priority;
	}
	
	public void setLocked(boolean locked) {
		this.locked.set(locked);
	}
	
	@Override
	public int compareTo(QNODE_CLH other) {
		if(this.priority <= other.priority)
			return -1;
		else
			return 1;
	}
	
}
