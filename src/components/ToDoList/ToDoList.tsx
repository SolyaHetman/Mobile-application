import React, { FC, useEffect, useState } from 'react';
import { 
    IonPage, 
    IonContent, 
    IonHeader, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonCardSubtitle,
    IonIcon,
    IonButtons,
    IonButton
} from '@ionic/react';
import Header from '../shared/header/Header';
import './ToDoList.css';
import { trashOutline,pencilOutline } from 'ionicons/icons';
import { toDolistMethods } from '../../shared/services/ToDoListMethods';


const notes = [
    {
        id: 12,
        repeatableNotes: false,
        title: 'Забрати документи',
        date: '14.05.2021',
        time:'12:00',
        text: 'Вул.Замкова,23',
        importance: 1
    },
    {
        id: 13,
        repeatableNotes: false,
        title: 'Забрати паспрот',
        date: '16.05.2021',
        time:'12:15',
        text: 'Вул.Замкова,23',
        importance: 1
    },
    {
        id: 14,
        repeatableNotes: false,
        title: 'Забрати паспрот',
        date: '23.05.2021',
        time:'12:15',
        text: 'Підготувати документи, зробити копію ідентифікаційного коду. Не забути взяти витягдо паспорту.',
        importance: 2
    },
    {
        id: 15,
        repeatableNotes: false,
        title: 'Зустріч з дизайнером',
        date: '14.06.2021',
        time:'12:15',
        text: 'Підготувати приблизні варіанти дизайну для кухніб ванни. Пройти тестування',
        importance: 3
    },
    {
        id: 17,
        repeatableNotes: false,
        title: 'Забрати паспрот',
        date: '15.06.2021',
        time:'12:15',
        text: 'Вул.Замкова,23',
        importance: 1
    }
]

const ToDoList: FC = () => {
    const [toDoList, setToDoList] = useState<any[]>([]);

    const fetchToDoList = async () => {
        const newToDoList = await toDolistMethods.getToDolist(); 
        setToDoList(newToDoList);
    }

    const deleteItem = (id: any) => {
        toDolistMethods.deleteToDoList(id);
        
        const newRemiders = [...toDoList];
        newRemiders.splice(newRemiders.findIndex(i => i.id === id), 1);
    
        setToDoList(newRemiders);
      }

    useEffect(() => {
        fetchToDoList();
      }, [])

  return (
    <IonPage>
      <IonHeader>
          <Header title="Твій помічник" page="ToDoListPage"/>
      </IonHeader>
      <IonContent fullscreen>
        { toDoList.map(toDoListItem => {
            return (
                <IonCard className="cardNotes" key={toDoListItem.id}>
                    <IonCardHeader>
                        <div className="cardNoteHeader">
                            <IonCardTitle className="cardNoteTitle">{toDoListItem.title}</IonCardTitle>
                            <IonButtons>
                                <IonButton className="cardNoteIcon">
                                    <IonIcon slot="icon-only" icon={pencilOutline}/>
                                </IonButton>
                                <IonButton className="cardNoteIcon" onClick={(e: any) => deleteItem(toDoListItem.id)}>
                                    <IonIcon slot="icon-only" icon={trashOutline}/>
                                </IonButton>
                            </IonButtons>
                        </div>
                        <IonCardSubtitle className="cardNoteSubTitle" >{toDoListItem.date}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="cardNoteContent">
                        {toDoListItem.content}
                    </IonCardContent>
                </IonCard>
            )
        })}
      </IonContent>
    </IonPage>
  );
}

export default ToDoList;