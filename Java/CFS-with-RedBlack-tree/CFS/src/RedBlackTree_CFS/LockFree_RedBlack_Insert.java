package RedBlackTree_CFS;

import java.util.ArrayList;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;

public class LockFree_RedBlack_Insert implements RedBlackTree_Interface
{
	public volatile Node root;
	public Node rootSibling;
	public Node rootSibling1;
	
	Node[] rootParent = new Node[6];
	
	public static volatile AtomicInteger globalMoveUp;
	ThreadLocal<ArrayList<Node>> flagsToRelease;
	public static volatile long nodeCounter = 0;
	
	
	public LockFree_RedBlack_Insert() 
	{
		globalMoveUp = new AtomicInteger(-1);
		flagsToRelease = new ThreadLocal<ArrayList<Node>>()
		{
			protected ArrayList<Node> initialValue()
			{
				return new ArrayList<Node>();
			}
		};
		root = new Node(-1);
		rootSibling = new Node(-1); 
		rootSibling1 = new Node(-1);

		for (int i = 0; i < 6; i++) 
		{
			rootParent[i] = new Node(-2);
		}
		root.parent = rootParent[0];
		rootSibling.parent = rootParent[0];
		rootParent[0].left = root;
		rootParent[0].right = rootSibling;
		rootParent[0].color = Node.BLACK;

		for (int i = 1; i < 6; i++) {
			rootParent[i - 1].parent = rootParent[i];
			rootParent[i].left = rootParent[i - 1];
			rootParent[i].right = new Node(-1);
			rootParent[i].color = Node.BLACK;
			rootParent[i].flag.set(Node.NO_FLAG);
		}
		rootSibling1.parent = rootParent[1];
		rootParent[1].right = rootSibling1;
	}

	
	@Override
	public void insert(Node x) 
	{
		restart: while(true)
		{
			Node z = root.parent;
			Node y = root;
			Node w = root;

			while (y.time_executed != -1) 
			{
				z = y;
				if (x.time_executed < y.time_executed)
					y = y.left;
				else
					y = y.right;
			} 

			if(!SetupLocalAreaForInsert(z))
			{
				continue restart;
			}
			if (!(y == z.left || y == z.right))
			{
				while(flagsToRelease.get().size() > 0)
					flagsToRelease.get().remove(0).flag.set(Node.NO_FLAG);
				continue restart;
			}

			x.parent = z;
			x.flag.set(Node.LOCAL_AREA);
			flagsToRelease.get().add(x);
			
			if (z == root.parent) 
			{
				this.root = x;
				this.root.parent.left = x;
			} 
			else if (x.time_executed < z.time_executed)
				z.left = x;
			else
				z.right = x;

			
			RB_Insert_Fixup(x);
			globalMoveUp.compareAndSet((int) Thread.currentThread().getId(), -1);	//release the flag on moveUp		
			break;
		}


	}

	private boolean SetupLocalAreaForInsert(Node z) 
	{
		if (!(z.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA)))
			return false;
		flagsToRelease.get().add(z);

		Node zp = z.parent;
		if (!(zp.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA)))
		{
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			return false;
		}
		flagsToRelease.get().add(zp);

		if (zp != z.parent)
		{
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			zp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zp);
			return false;
		}

		Node zpp = zp.parent;
		if (!(zpp.flag.compareAndSet(Node.NO_FLAG, Node.MARKED)))
		{
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			
			zp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zp);
			
			return false;
		}
		flagsToRelease.get().add(zpp);

		if (zpp != zp.parent) // parent has changed - abort
		{
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			zp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zp);
			zpp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zpp);
			return false;
		}
		

		Node uncle;

		if (z == z.parent.left)
			uncle = z.parent.right;
		else 
			uncle = z.parent.left;
		try
		{
			if(uncle != null)
			{
				if (!(uncle.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA)))
				{
					z.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(z);
					zp.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(zp);
					zpp.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(zpp);
					return false;
				}
			}
		}
		catch(NullPointerException ex)
		{
			ex.printStackTrace();
		}
		
		flagsToRelease.get().add(uncle);

		if(!(uncle == zp.left || uncle == zp.right))
		{
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			zp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zp);
			zpp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zpp);
			uncle.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(uncle);
			return false;
		}
		return true;
	}

	public void RB_Insert_Fixup(Node x) 
	{
		Node y;
		Node temp = x;
		while (x.parent.color == Node.RED) 
		{
			if (x.parent == x.parent.parent.left) 
			{
				y = x.parent.parent.right;
				if (y.color == Node.RED)	
				{
					x.parent.color = Node.BLACK;
					y.color = Node.BLACK;
					x.parent.parent.color = Node.RED;
					if(x.parent.parent.parent.color == Node.RED)
						x = moveInserterUp(x);
					else
						break;
				} 
				else
				{					
					if (x == x.parent.right)		
					{
						x = x.parent;
						rotateLeft(x);
					}
					x.parent.color = Node.BLACK;
					x.parent.parent.color = Node.RED;
					rotateRight(x.parent.parent);
				}
			} 
			else
			{
				if (x.parent == x.parent.parent.right) 
				{
					y = x.parent.parent.left;
					if (y.color == Node.RED) {
						x.parent.color = Node.BLACK;
						y.color = Node.BLACK;
						x.parent.parent.color = Node.RED;
						if(x.parent.parent.parent.color == Node.RED)
							x = moveInserterUp(x);
						else
							break;
					} 
					else
					{
						if (x == x.parent.left) 
						{
							x = x.parent;
							rotateRight(x);
						}
						x.parent.color = Node.BLACK;
						x.parent.parent.color = Node.RED;
						rotateLeft(x.parent.parent);
					}
				}
			}
		}

		while(flagsToRelease.get().size() > 0)
			flagsToRelease.get().remove(0).flag.set(Node.NO_FLAG);

		root.color = Node.BLACK;
	}

	private Node moveInserterUp(Node oldx)
	{
		restart: while(true)
		{
			Node oldp = oldx.parent;
			Node oldgp = oldp.parent;
			Node oldMarker = oldgp.parent;
			Node olduncle;
			Node newUncle;

			if (oldp == oldgp.left)
				olduncle = oldgp.right;
			else
				olduncle = oldgp.left;


			Node newMarker = oldMarker.parent;

			if(!newMarker.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA))
			{
				if(globalMoveUp.get() == (int) Thread.currentThread().getId())
				{
					globalMoveUp.set(-1);
				}
				continue restart;
			}	
			flagsToRelease.get().add(newMarker);
			
			if(newMarker != oldMarker.parent)
			{
				
				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);
				continue restart;
			}

			
			Node newMarkerParent = new Node(-1);
			newMarkerParent = newMarker.parent;
			if(!newMarkerParent.flag.compareAndSet(Node.NO_FLAG, Node.MARKED))
			{
				if(globalMoveUp.get() == (int) Thread.currentThread().getId())
				{
					globalMoveUp.set(-1);
				}
				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);
				continue restart;
			}	
			
			flagsToRelease.get().add(newMarkerParent);
			
			if(newMarkerParent != newMarker.parent)
			{
				
				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);
				
				newMarkerParent.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarkerParent);
				continue restart;
			}

			
			if(oldMarker == oldMarker.parent.left)
				newUncle = oldMarker.parent.right;
			else
				newUncle = oldMarker.parent.left;
			
			
			
			if(newUncle.flag.get() == Node.LOCAL_AREA)
			{
				newMarker.parent.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker.parent);
				
				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);
				continue restart;
			}
			
			if(globalMoveUp.get() != (int) Thread.currentThread().getId())
			{
				if(!globalMoveUp.compareAndSet(-1, (int) Thread.currentThread().getId()))
				{
					newMarker.parent.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(newMarker.parent);

					newMarker.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(newMarker);
					continue restart;
				}
			}
			oldMarker.flag.set(Node.LOCAL_AREA);
			flagsToRelease.get().add(oldMarker);
			
			// Release the flags on x and its uncle
			oldx.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(oldx);
			
			oldp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(oldp);
			
			olduncle.flag.compareAndSet(Node.LOCAL_AREA, Node.NO_FLAG);
			flagsToRelease.get().remove(olduncle);

			return oldgp;		
		}
	}


	void rotateLeft(Node node) {
		if (node.parent.time_executed != -2) {
			if (node == node.parent.left) {
				node.parent.left = node.right;
			} else {
				node.parent.right = node.right;
			}
			node.right.parent = node.parent;
			node.parent = node.right;

			if (node.right.left.time_executed != -1) {
				node.right.left.parent = node;
			}
			node.right = node.right.left;
			node.parent.left = node;
		} else {// Need to rotate root
			Node right = root.right;
			root.right = right.left;
			right.left.parent = root;
			root.parent = right;
			right.left = root;
			right.parent = new Node(-1);
			root = right;
			root.parent = rootParent[0];
			rootParent[0].left = root;
		}
	}

	void rotateRight(Node node) {
		if (node.parent.time_executed != -2) {
			if (node == node.parent.left) {
				node.parent.left = node.left;
			} else {
				node.parent.right = node.left;
			}

			node.left.parent = node.parent;
			node.parent = node.left;

			if (node.left.right.time_executed != -1) {
				node.left.right.parent = node;
			}
			node.left = node.left.right;
			node.parent.right = node;

		} else {
			Node left = root.left;
			root.left = root.left.right;
			if(left.right != null)
				left.right.parent = root;
			root.parent = left;
			left.right = root;
			left.parent = new Node(-1);
			root = left;
			root.parent = rootParent[0];
			rootParent[0].left = root;
		}
	}
	
	public boolean contains(int x){
		
		restart: while(true)
		{
			Node z = root.parent;
			Node y = root;
			Node yparent;
			Node ygrand_parent;
			
			while (y.time_executed !=-1)  		// time executed is the key if the node
			{
				yparent = y.parent;
				ygrand_parent = yparent.parent;
			
				if(x == y.time_executed){
					if(y.flag.get() == Node.NO_FLAG)
						return true;
				
				}
				else{
					if(x < y.time_executed)
						y = y.left;
					else
						y = y.right;
				
					// validate to see if y's current parent was its inital grand parent
					try{
						if(yparent == y.parent.parent && ygrand_parent == y.parent.parent.parent){
							yparent = y.parent;
							ygrand_parent = y.parent.parent;
						}
						else
							continue restart;
					}catch(Exception e){
						
					}
							
				}
			} 
			return false;
		}
	}
	

	public void printRedBlackTree(Node root, int space) {
	       if(root == null ) {
	           return;
	       }
	       printRedBlackTree(root.right, space + 5);
	       for(int i=0; i < space; i++) {
	           System.out.print(" ");
	       }
	       System.out.println(root.time_executed + " " + (root.color == Node.BLACK ? "B" : "R")+root.flag );
	       if(root.time_executed != -1)
	    	   nodeCounter++;
	       printRedBlackTree(root.left, space + 5);
	   }

	public void showTree()
	{
		printRedBlackTree(root, 0);
	}
	
	@Override
	public Node delete()
	{
		return new Node(-1);
	}
}
