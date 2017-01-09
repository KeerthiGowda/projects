package RedBlackTree_CFS;

import static RedBlackTree_CFS.Node.BLACK;
import static RedBlackTree_CFS.Node.RED;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;

public class RedBlackTree_prIns_seqDel implements RedBlackTree_Interface {
	public volatile Node root;
	public Node root_sibling, root_sibling2;
	Node[] rootp = new Node[6];
	public static volatile AtomicInteger globalMoveup;
	ThreadLocal<ArrayList<Node>> flagsToRelease;
	public static volatile long count = 0;

	public RedBlackTree_prIns_seqDel() {
		globalMoveup = new AtomicInteger(-1);
		flagsToRelease = new ThreadLocal<ArrayList<Node>>() {
			protected ArrayList<Node> initialValue() {
				return new ArrayList<Node>();
			}
		};

		// Root and its sibilings
		root = new Node(-1);
		root_sibling = new Node(-1);
		root_sibling2 = new Node(-1);

		// inserting roots parents
		for (int i = 0; i < 6; i++) {
			rootp[i] = new Node(-2);
		}

		root.parent = rootp[0];
		root_sibling.parent = rootp[0];
		rootp[0].left = root;
		rootp[0].right = root_sibling;
		rootp[0].color = BLACK;

		for (int i = 1; i < 6; i++) {
			rootp[i - 1].parent = rootp[i];
			rootp[i].left = rootp[i - 1];
			rootp[i].right = new Node(-1);
			rootp[i].color = BLACK;
			rootp[i].flag.set(Node.NO_FLAG);
		}
		root_sibling2.parent = rootp[1];
		rootp[1].right = root_sibling2;
	}

	@Override
	public void insert(Node x) {
		restart: while (true) {
			Node z = root.parent;
			Node y = root;

			while (y.time_executed != -1) // Find insert point z
			{
				z = y;
				if (x.time_executed < y.time_executed)
					y = y.left;
				else
					y = y.right;
			} // end while

			// TODO:

			if (!SetupLocalAreaForInsert(z)) {
				continue restart;
			}
			if (!(y == z.left || y == z.right)) {
				while (flagsToRelease.get().size() > 0)
					flagsToRelease.get().remove(0).flag.set(Node.NO_FLAG);
				continue restart;
			}
			x.parent = z;
			x.flag.set(Node.LOCAL_AREA);
			flagsToRelease.get().add(x);

			if (z == root.parent) {
				this.root = x;
				this.root.parent.left = x;
			} else if (x.time_executed < z.time_executed)
				z.left = x;
			else
				z.right = x;

			RB_Insert_Fixup(x);
			globalMoveup.compareAndSet((int) Thread.currentThread().getId(), -1);
			break;
		}

	}

	private boolean SetupLocalAreaForInsert(Node z) {
		if (!(z.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA)))
			return false;
		flagsToRelease.get().add(z);

		Node zp = z.parent;
		if (!(zp.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA))) {
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			return false;
		}
		flagsToRelease.get().add(zp);

		if (zp != z.parent) {
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			zp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zp);
			return false;
		}

		Node zpp = zp.parent;
		if (!(zpp.flag.compareAndSet(Node.NO_FLAG, Node.MARKED))) {
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);

			zp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zp);

			return false;
		}
		flagsToRelease.get().add(zpp);

		if (zpp != zp.parent) {
			z.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(z);
			zp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zp);
			zpp.flag.set(Node.NO_FLAG);
			flagsToRelease.get().remove(zpp);
			return false;
		}

		Node uncle;

		if (z == z.parent.left) // uncle is the right child
			uncle = z.parent.right;
		else // uncle is the left child
			uncle = z.parent.left;
		try {
			if (uncle != null) {
				if (!(uncle.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA))) {
					z.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(z);
					zp.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(zp);
					zpp.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(zpp);
					return false;
				}
			}
		} catch (NullPointerException ex) {
			ex.printStackTrace();
		}

		flagsToRelease.get().add(uncle);

		if (!(uncle == zp.left || uncle == zp.right)) {
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
		// System.out.println("2 root : " + root.key);
		return true;
	}
	///////////////////////////////////////////////

	public void RB_Insert_Fixup(Node x) {
		Node y;
		while (x.parent.color == RED) {
			if (x.parent == x.parent.parent.left) {
				y = x.parent.parent.right;
				if (y.color == RED) // case 1
				{
					x.parent.color = BLACK;
					y.color = BLACK;
					x.parent.parent.color = RED;
					if (x.parent.parent.parent.color == RED)
						x = moveInserterUp(x);
					else
						break;
				} else {
					if (x == x.parent.right) // case 2
					{
						x = x.parent;
						rotateLeft(x);
					}
					x.parent.color = BLACK; // case 3
					x.parent.parent.color = RED;
					rotateRight(x.parent.parent);
				}
			} else {
				if (x.parent == x.parent.parent.right) {
					y = x.parent.parent.left;
					if (y.color == RED) {
						x.parent.color = BLACK;
						y.color = BLACK;
						x.parent.parent.color = RED;
						if (x.parent.parent.parent.color == RED)
							x = moveInserterUp(x);
						else
							break;
					} else {
						if (x == x.parent.left) {
							x = x.parent;
							rotateRight(x);
						}
						x.parent.color = BLACK;
						x.parent.parent.color = RED;
						rotateLeft(x.parent.parent);
					}
				}
			}
		}

		while (flagsToRelease.get().size() > 0)
			flagsToRelease.get().remove(0).flag.set(Node.NO_FLAG);

		root.color = BLACK;
	}

	private Node moveInserterUp(Node oldx) {

		restart: while (true) {
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

			if (!newMarker.flag.compareAndSet(Node.NO_FLAG, Node.LOCAL_AREA)) {
				if (globalMoveup.get() == (int) Thread.currentThread().getId()) {
					globalMoveup.set(-1);
				}
				continue restart;
			}
			flagsToRelease.get().add(newMarker);

			if (newMarker != oldMarker.parent) {

				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);
				continue restart;
			}

			Node newDummyParent = new Node(-1);
			newDummyParent = newMarker.parent;
			if (!newDummyParent.flag.compareAndSet(Node.NO_FLAG, Node.MARKED)) {
				if (globalMoveup.get() == (int) Thread.currentThread().getId()) {
					globalMoveup.set(-1);
				}
				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);
				continue restart;
			}

			flagsToRelease.get().add(newDummyParent);

			if (newDummyParent != newMarker.parent) {
				// release flag of newDummy

				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);

				newDummyParent.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newDummyParent);
				continue restart;
			}

			if (oldMarker == oldMarker.parent.left)
				newUncle = oldMarker.parent.right;
			else
				newUncle = oldMarker.parent.left;

			if (newUncle.flag.get() == Node.LOCAL_AREA) {
				// release the flag of newDummy
				newMarker.parent.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker.parent);

				newMarker.flag.set(Node.NO_FLAG);
				flagsToRelease.get().remove(newMarker);
				continue restart;
			}

			if (globalMoveup.get() != (int) Thread.currentThread().getId()) {
				if (!globalMoveup.compareAndSet(-1, (int) Thread.currentThread().getId())) {
					// release the flag of newDummy
					newMarker.parent.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(newMarker.parent);

					newMarker.flag.set(Node.NO_FLAG);
					flagsToRelease.get().remove(newMarker);
					continue restart;
				}
			}
			// change the flag of oldDummy to Local Area
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
		} else {
			Node right = root.right;
			root.right = right.left;
			right.left.parent = root;
			root.parent = right;
			right.left = root;
			right.parent = new Node(-1);
			root = right;
			root.parent = rootp[0];
			rootp[0].left = root;
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

		} else {// Need to rotate root
			Node left = root.left;
			root.left = root.left.right;
			if (left.right != null)
				left.right.parent = root;
			root.parent = left;
			left.right = root;
			left.parent = new Node(-1);
			root = left;
			root.parent = rootp[0];
			rootp[0].left = root;
		}
	}

	void switchNodes(Node target, Node with) {
		if (target.parent.time_executed == -2) {
			root = with;
			rootp[0].left = root;
			root.parent = rootp[0];
		} else if (target == target.parent.left) {
			target.parent.left = with;
		} else {
			target.parent.right = with;
		}
		with.parent = target.parent;
	}

	private Node findNode(Node findNode, Node node) {
		if (root.time_executed == -1) {
			return null;
		}
		if (findNode.time_executed < node.time_executed) {
			if (node.left.time_executed != -1) {
				return findNode(findNode, node.left);
			}
		} else if (findNode.time_executed > node.time_executed) {
			if (node.right.time_executed != -1) {
				return findNode(findNode, node.right);
			}
		} else if (findNode.time_executed == node.time_executed) {
			return node;
		}
		return null;
	}

	public Node delete(Node z) {
		if ((z = findNode(z, root)) == null)
			return null;
		Node x;
		Node y = z;
		int y_original_color = y.color;

		if (z.left.time_executed == -1) {
			x = z.right;
			switchNodes(z, z.right);
		} else if (z.right.time_executed == -1) {
			x = z.left;
			switchNodes(z, z.left);
		} else {
			y = leftMost(z.right);
			y_original_color = y.color;
			x = y.right;
			if (y.parent == z)
				x.parent = y;
			else {
				switchNodes(y, y.right);
				y.right = z.right;
				y.right.parent = y;
			}
			switchNodes(z, y);
			y.left = z.left;
			y.left.parent = y;
			y.color = z.color;
		}
		if (y_original_color == BLACK)
			deleteFixup(x);
		return x;
	}

	public Node delete() {
		if (root.time_executed == -1)
			return root;

		Node z = root;
		while (z.left.time_executed != -1)
			z = z.left;

		Node x;
		Node y = z; // temporary reference y
		int y_original_color = y.color;

		if (z.left.time_executed == -1) {
			x = z.right;
			switchNodes(z, z.right);
		} else if (z.right.time_executed == -1) {
			x = z.left;
			switchNodes(z, z.left);
		} else {
			y = leftMost(z.right);
			y_original_color = y.color;
			x = y.right;
			if (y.parent == z)
				x.parent = y;
			else {
				switchNodes(y, y.right);
				y.right = z.right;
				y.right.parent = y;
			}
			switchNodes(z, y);
			y.left = z.left;
			y.left.parent = y;
			y.color = z.color;
		}
		if (y_original_color == BLACK)
			deleteFixup(x);
		return z;
	}

	void deleteFixup(Node x) {
		while (x != root && x.color == BLACK) {
			if (x == x.parent.left) {
				Node w = x.parent.right;

				if (w.color == RED) {
					w.color = BLACK;
					x.parent.color = RED;
					rotateLeft(x.parent);
					w = x.parent.right;
				}
				try {
					if (w.left.color == BLACK && w.right.color == BLACK) {
						w.color = RED;
						x = x.parent;
						continue;
					} else if (w.right.color == BLACK) {
						w.left.color = BLACK;
						w.color = RED;
						rotateRight(w);
						w = x.parent.right;
					}
				} catch (Exception e) {
					return;
				}
				if (w.right.color == RED) {
					w.color = x.parent.color;
					x.parent.color = BLACK;
					w.right.color = BLACK;
					rotateLeft(x.parent);
					x = root;
				}
			} else {
				Node w = x.parent.left;
				if (w.color == RED) {
					w.color = BLACK;
					x.parent.color = RED;
					rotateRight(x.parent);
					w = x.parent.left;
				}

				if (w.right.color == BLACK && w.left.color == BLACK) {
					w.color = RED;
					x = x.parent;
					continue;
				} else if (w.left.color == BLACK) {
					w.right.color = BLACK;
					w.color = RED;
					rotateLeft(w);
					w = x.parent.left;
				}

				if (w.left.color == RED) {
					w.color = x.parent.color;
					x.parent.color = BLACK;
					w.left.color = BLACK;
					rotateRight(x.parent);
					x = root;
				}
			}
		}
		x.color = BLACK;
	}

	Node leftMost(Node subTreeRoot) {
		while (subTreeRoot.left.time_executed != -1) {
			subTreeRoot = subTreeRoot.left;
		}
		return subTreeRoot;
	}

	public void printRedBlackTree(Node root, int space) {
		if (root == null) {
			return;
		}
		printRedBlackTree(root.right, space + 5);
		for (int i = 0; i < space; i++) {
			System.out.print(" ");
		}
		System.out.println(root.time_executed + " " + (root.color == BLACK ? "B" : "R") + root.flag);
		if (root.time_executed != -1)
			count++;
		printRedBlackTree(root.left, space + 5);
	}

	public void showTree() {
		printRedBlackTree(root, 0);
	}

	@Override
	public boolean contains(int x) {
		// TODO Auto-generated method stub
		return false;
	}
}
