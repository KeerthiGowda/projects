package RedBlackTree_CFS;

import java.util.Random;

public class Test_RedBlackTree_CFS 
{
	static int THREAD_COUNT = 4;
	static int TASKS = 10000;
	static String TREE_TYPE = "RedBlackTree_prIns_seqDel";
	//static String TREE_TYPE = "Sequential_RedBlackTree";
	Random random;
	
	public static void main(String[] args) throws InterruptedException, InstantiationException, IllegalAccessException, ClassNotFoundException 
	{
		TestThread_CFS[] threads = new TestThread_CFS[THREAD_COUNT];
		RedBlackTree_Interface tree = (RedBlackTree_Interface)Class.forName("RedBlackTree_CFS." + TREE_TYPE).newInstance();
		
		Random random = new Random();
		
		long start = System.currentTimeMillis();
		for(int i=0; i<TASKS; i++)
		{
			Node x = new Node(0);
			x.setPriority(1);
			x.id = i;
			x.start = start;
			x.setMaxRunTime(1000);
		//	x.setMaxRunTime(1000);
		//	synchronized(tree){
				tree.insert(x);
		//	}
		}
		
		for(int i=0; i<THREAD_COUNT; i++)
		{
			threads[i] = new TestThread_CFS(tree,THREAD_COUNT, TASKS);
		}
		long startTime = System.currentTimeMillis();
		for(int i=0; i<THREAD_COUNT; i++)
		{
			threads[i].start();
		}
		
		for(int i=0; i<THREAD_COUNT; i++)
		{
			threads[i].join();
		}
		
		
		long endTime = System.currentTimeMillis();
		
		
		System.out.println("Total time " + (endTime - startTime) + " ms Count: ");
	}
}
