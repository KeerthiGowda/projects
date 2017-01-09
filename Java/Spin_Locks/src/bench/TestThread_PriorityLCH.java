package bench;

import locks.PriorityQ;
import locks.QNODE_CLH;

public class TestThread_PriorityLCH extends Thread{

	public static volatile Boolean free = true;
	PriorityQ q = new PriorityQ();
	
	public TestThread_PriorityLCH(){
		free = true;
	}
	
	public void run(){
		while(true){
			if(!q.queue.isEmpty()){
				free = false;
				QNODE_CLH qnode = q.queue.poll();
				if(qnode!=null){
					qnode.setLocked(false);
					while(free == false){}
				}
			}
		}
	}
}

