import { db } from "src/boot/firebase";
import { addDoc, collection, getDoc, getDocs, doc, orderBy } from "firebase/firestore";


export async function getAllBooks() {
  const querySnapshot = await getDocs(collection(db, "books"));
  const bookList = [];

  querySnapshot.docs.forEach((doc) => {
    const book = { bookId: doc.id, bookData: doc.data() };
    bookList.push(book);
  });

  return bookList;
}

export async function getSingleBook(bookId) {
  const docRef = doc(db, "books", bookId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { bookId: docSnap.id, data: docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

export async function createBook(bookData) {
  try {
    const docRef = await addDoc(collection(db, "books"), bookData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
}

export async function deleteBook(bookId) {
  try {
    await db.collection('books').doc(bookId).delete();
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
}
