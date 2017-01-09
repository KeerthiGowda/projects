package RedBlackTree_CFS;
 
class Test_RedBlackTree 
{
	static final int THREAD_COUNT = 4;
	static final int TASKS = 10000;
	
     static final String TREE_TYPE = "LockFree_RedBlack_Insert";
//   static final String TREE_TYPE = "Sequential_RedBlackTree";
	public static void main(String[] args) throws InterruptedException, InstantiationException, IllegalAccessException, ClassNotFoundException 
	{
		TestThread_Compare[] threads = new TestThread_Compare[THREAD_COUNT];
		RedBlackTree_Interface tree = (RedBlackTree_Interface)Class.forName("RedBlackTree_CFS." + TREE_TYPE).newInstance();
		
		for(int i=0; i<THREAD_COUNT; i++)
		{
			threads[i] = new TestThread_Compare(tree, THREAD_COUNT, TASKS);
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
		
	//	Node x = new Node (20000);
	//	System.out.println(tree.contains(x));
		
		long endTime = System.currentTimeMillis();
		long elapsed = endTime - startTime;
		long totalTime = 0;
		for(int i= 0; i<THREAD_COUNT; i++)
		{
			totalTime += threads[i].endTime;
		}

		System.out.println(THREAD_COUNT * TASKS/(elapsed) *1000);
	}
}
