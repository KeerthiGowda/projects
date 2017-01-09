package locks;

import java.util.concurrent.PriorityBlockingQueue;

public class PriorityQ {

	public static PriorityBlockingQueue<QNODE_CLH> queue;
	
	public PriorityQ(){
		queue = new PriorityBlockingQueue<QNODE_CLH>();
	}
}
