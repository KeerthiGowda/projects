package locks;

import java.util.concurrent.atomic.AtomicBoolean;

public class QNode {
	public AtomicBoolean locked = new AtomicBoolean();
	
	public QNode(boolean b){
		locked.set(b);
	}
}
