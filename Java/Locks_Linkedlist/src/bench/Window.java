package bench;

public class Window  {
	public Node_LockFree pred, curr;
	public Window(Node_LockFree myPred, Node_LockFree myCurr){
		pred = myPred;
		curr = myCurr;
	}
	
	public static Window find(Node_LockFree head, int key){
		Node_LockFree pred = null, curr = null, succ = null;
		boolean[] marked = {false};
		boolean snip;
		retry: while(true){
			pred = head;
			curr=  (Node_LockFree) head.next.getReference();
			while(true){
				try{
					succ = (Node_LockFree) curr.next.get(marked);
				}catch(Exception e){
					return new Window(pred, curr);
				}
				while(marked[0]){
					snip = pred.next.compareAndSet(curr,  succ,  false, false);
					if(!snip) continue retry;
					curr = succ;
					try{
						succ = (Node_LockFree) curr.next.get(marked);
					}catch(Exception e){
						
					}
					
				}
				if(curr.key >= key){
					return new Window(pred, curr);
				}
				pred = curr;
				curr = succ;
			}
		}
	}
	
	
}
