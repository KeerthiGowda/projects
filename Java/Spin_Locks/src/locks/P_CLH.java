package locks;


import bench.TestThread_PriorityLCH;
import bench.TestThread;

public class P_CLH implements Lock{

	ThreadLocal<QNODE_CLH> myNode;
	private static PriorityQ q= new PriorityQ();

	public P_CLH(){
		myNode = new ThreadLocal<QNODE_CLH>(){
			protected QNODE_CLH initialValue(){
				return new QNODE_CLH(true);
			}
		};
	}
	
	@Override
	public void Lock() {
			QNODE_CLH qnode = myNode.get();
			qnode.setLocked(true);
			q.queue.add(qnode);
			while (qnode.getLocked()) {}
			
	}
	@Override		
	public void Unlock(){
			QNODE_CLH qnode = myNode.get();
			qnode.setLocked(false);
			TestThread_PriorityLCH.free = true;
	}
	
	public boolean trylock(){
		long start = System.currentTimeMillis();
		int patience = ((TestThread)Thread.currentThread()).getTimeout();
		QNODE_CLH qnode = myNode.get();
		qnode.setLocked(true);
		q.queue.add(qnode);
		while(System.currentTimeMillis() - start < patience){
			if(!qnode.getLocked()) {
				return true;
			}
		}
		if(q.queue.remove(qnode)==false)
			return true;
		else{
			System.out.println("Thread "+ ((TestThread)Thread.currentThread()).getThreadId() + " Timed Out");
			return false;
		}
	}
	
	
			
		
		
}
