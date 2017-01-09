package locks;

import java.util.concurrent.atomic.AtomicReference;

public class MCS implements Lock{

	//private static Q_MCS_Node initial=new Q_MCS_Node(false);
	private static AtomicReference<Q_MCS_Node> tail;
	ThreadLocal<Q_MCS_Node> myNode;
	//private Q_MCS_Node myNode = new Q_MCS_Node(true);
	//private Q_MCS_Node myPred;
	
	public MCS() {
		tail = new AtomicReference<Q_MCS_Node>(null);
		myNode = new ThreadLocal<Q_MCS_Node>() {
			protected Q_MCS_Node initialValue() {
				return new Q_MCS_Node();
			}	
		};
	}
	
	@Override
	public void Lock() {
		Q_MCS_Node qnode = myNode.get();
		Q_MCS_Node pred = tail.getAndSet(qnode);
		if(pred != null){
			qnode.locked.set(true);
			pred.next.set(qnode);
			while(qnode.locked.get() == true){}
		}
	}

	@Override
	public void Unlock() {
		Q_MCS_Node qnode = myNode.get();
		if (qnode.next.get() == null) {
			if (tail.compareAndSet(qnode, null))
				return;
			while (qnode.next.get() == null) {}
		}
		Q_MCS_Node temp=qnode.next.get();
		temp.locked.set(false);
		qnode.next.set(null);
	}

}
