import { db } from '../../Firebase';


export const toDolistMethods = {
    getToDolist: async (): Promise<any> => {
      const collectionRef = db.collection("event");
  
      if (collectionRef) {
        try {
          let activeRef = await collectionRef.get();
    
          const notes = []
          for (let note of activeRef.docs) {
            let data = note.data();
            const time = data.date.toDate();
            console.log(time.toLocaleDateString())
  
            const noteItem = {
              id: note.id,
              title: String(data.title),
              content: data.content,
              date: time.toLocaleDateString(),
              importance: data.importance,
              repeatableNotes: data.repeatableNotes
            }    
            notes.push(noteItem);
          }

          return notes;
        } catch (err) {
          console.log('error getting items');
          return []
        }
      } else {
        return []
      }
    },
    // addItem: async (name: string, status: ItemStatus, handleAddItem: (name: string, id: string) => void): Promise<void> => {
    //   const user = firebase.auth().currentUser
  
    //   if (user) {
    //     try {
    //       let itemRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ITEMS).doc()
  
    //       await itemRef.set({
    //         name,
    //         created: firebase.firestore.Timestamp.fromDate(new Date()),
    //         status
    //       });
  
    //       handleAddItem(name, itemRef.id)
  
    //       return
    //     } catch (err) {
    //       console.log('error saving Item');
    //     }
    //   } else {
    //     return
    //   }
    // },
    // editItem: async (newName: string, newStatus: ItemStatus, id: string): Promise<void> => {
    //   const user = firebase.auth().currentUser;
  
    //   if (user) {
    //     try {
    //       const ItemRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ITEMS).doc(id)
  
    //       ItemRef.set({
    //         name: newName,
    //         status: newStatus
    //       }, { merge: true });
    //     } catch (err) {
    //       console.log('error editing item');
    //     }
    //   } else {
    //     return
    //   }
    // },
    deleteToDoList: async (id: string): Promise<any> => {
      const collectionRef = db.collection("event");
  
      if (collectionRef) {
        try {
          collectionRef.doc(id).delete();
        } catch (err) {
          console.log('error deleting item', err);
        }
      } else {
        return
      }
    }
  }