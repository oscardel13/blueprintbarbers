import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const DragAndDrop = ({onDragEnd, images}) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}> {/* THIS DOES NOT WORK WHEN STRICTMODE IS ON */}
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            className='flex flex-row overflow-auto gap-2'
                            {...provided.droppableProps}
                        >
                            {images.map((image, index) => (
                                <Draggable key={index} draggableId={String(index)} index={index}>
                                    {(provided) => (
                                        <img
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="h-40"
                                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                            alt={`product-${index}`}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
    )
}

export default DragAndDrop;