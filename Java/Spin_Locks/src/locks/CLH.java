package locks;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

public class CLH implements Lock{
	private static AtomicReference<QNode> tail;
	ThreadLocal<QNode> myNode;
//	private QNode myNode = new QNode(true);
	ThreadLocal<QNode> myPred;
	
	public CLH() {
		tail = new AtomicReference<QNode>(new QNode(false));
		myNode = new ThreadLocal<QNode>() {
			protected QNode initialValue() {
				return new QNode(true);
			}
		};
		myPred = new ThreadLocal<QNode>() {
			protected QNode initialValue() {
				return null;
			}
		};
	}
	
	
	@Override
	public void Lock() {
		QNode qnode = myNode.get();
		qnode.locked.set(true);
		QNode pred = tail.getAndSet(qnode);
		myPred.set(pred);
		while (pred.locked.get()) {}

	}

	@Override
	public void Unlock() {
		QNode qnode = myNode.get();
		qnode.locked.set(false);
		myNode.set(myPred.get());
	}
}
