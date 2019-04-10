import React from 'react';
import {Draggable} from 'react-beautiful-dnd'

function Item(props) {
    return (
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
        {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}>
                {props.content}
            </div>
        )}
            </Draggable>
    )
}

export default Item;