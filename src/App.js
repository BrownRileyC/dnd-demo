import React, { Component } from 'react';

import { DragDropContext } from "react-beautiful-dnd";
import Item from './Components/Item';
import List from './Components/List';
import Sideways from './Components/Sideways'
import './App.css'



let list1Array = [{ id: 'listItem-1', content: 'first item 1' }, { id: 'listItem-2', content: 'first item 2' }, { id: 'listItem-3', content: 'first item 3' }, { id: 'listItem-4', content: 'first item 4' }, { id: 'listItem-5', content: 'first item 5' }, { id: 'listItem-6', content: 'first item 6' }];

let list2Array = [{ id: 'list2Item-1', content: 'second item 1' }, { id: 'list2Item-2', content: 'second item 2' }, { id: 'list2Item-3', content: 'second item 3' }, { id: 'list2Item-4', content: 'second item 4' }, { id: 'list2Item-5', content: 'second item 5' }, { id: 'list2Item-6', content: 'second item 6' }];

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  console.log(result);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

class App extends Component {
  state = {
    lists: {
      'list_1': {
        id: 'list_1',
        items: list1Array
      },
      'list_2': {
        id: 'list_2',
        items: list2Array
      },
      'list_3': {
        id: 'list_3',
        items: getItems(10)
      }
    },
    listOrder: ['list_1', 'list_2', 'list_3']
  }

  onDragEnd = result => {

    const { source, destination, draggableId } = result;

    console.log(draggableId);
    // dropped outside the list
    if (!destination) {
      return;
    }

    const start = this.state.lists[source.droppableId];
    console.log(start);
    const finish = this.state.lists[destination.droppableId]

    if (start === finish) {
      const items = reorder(
        start.items,
        source.index,
        destination.index
      );
      const reorderedCol = {
        ...start,
        items: items
      };

      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [reorderedCol.id]: reorderedCol
        }
      };

      this.setState(newState);

      console.log(this.state);
      return;
    }
    const newStartItems = Array.from(start.items);
    const [removed] = newStartItems.splice(source.index, 1);
    newStartItems.splice(source.index, 1);
    const newStart = {
      ...start,
      items: newStartItems
    };

    const newFinishItems = Array.from(finish.items);
    newFinishItems.splice(destination.index, 0, removed);
    const newFinish = {
      ...finish,
      items: newFinishItems
    };
    const newState = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    this.setState(newState);
    return
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <List id='list_1'>
                {this.state.lists.list_1.items.map((item, index) => (
                  <Item key={index} id={item.id} index={index} content={item.content} />
                ))}
              </List>
            </div>
            <div className='col-4'>
              <List id='list_2'>
                {this.state.lists.list_2.items.map((item, index) => (
                  <Item key={index} id={item.id} index={index} content={item.content} />
                ))}
              </List>
            </div>
            <div className='col-4'>
              <List id='list_3'>
                {this.state.lists.list_3.items.map((item, index) => (
                  <Item key={index} id={item.id} index={index} content={item.content} />
                ))}
              </List>
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default App;
