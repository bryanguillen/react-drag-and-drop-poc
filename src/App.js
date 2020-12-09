import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


import './App.css';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
];

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    // handle whenever user drags and drops outside of the droppable zone
    if (!result.destination) return;

    // create copy of state
    const items = Array.from(characters);
    // use source index to find our item via splice
    const [reorderedItem] = items.splice(result.source.index, 1);
    // add that new item its new destination index
    items.splice(result.destination.index, 0, reorderedItem);

    // finally, update state
    updateCharacters(items);
  }
  

  return (
    <div className="app">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className="characters" ref={provided.innerRef} {...provided.droppableProps}>
              {characters.map(({id, name, thumb}, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                    {provided => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="characters-thumb">
                          <img src={thumb} key={id} alt={`${name} Thumb`} />
                        </div>
                        <p>
                          { name }
                        </p>
                      </li>
                    )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
