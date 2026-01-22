import { useMemo, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

// TODO CHECK IF WORKS ON MOBILE
function SortableImageCard({ id, img, index, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="min-w-[180px] w-[180px] shrink-0"
    >
      <div className="relative border rounded-xl bg-white overflow-hidden">
        <img
          src={img.url}
          alt={`Gallery ${index + 1}`}
          className="w-full h-44 object-cover select-none"
          draggable={false}
        />

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 px-2 py-1 rounded text-sm font-medium"
        >
          Remove
        </button>

        {/* Drag handle (nice on mobile) */}
        <button
          type="button"
          className="absolute bottom-2 left-2 bg-white/90 hover:bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          Drag
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-600">
        <span className="font-medium">#{index + 1}</span>
      </div>
    </div>
  );
}

const PortfolioInfoComponent = ({ barberData, handleInputChange }) => {
  const fileInputRef = useRef(null);

  const gallery = useMemo(() => {
    const raw = barberData.gallery || [];
    // Normalize to { id, url, file? }
    return raw.map((item, idx) => {
      if (typeof item === "string") {
        return { id: `url:${item}`, url: item };
      }
      // prefer stable _id, else url, else fallback index-based id
      const stableId = item._id
        ? `db:${item._id}`
        : item.url
          ? `url:${item.url}`
          : `idx:${idx}`;
      return { ...item, id: item.id || stableId };
    });
  }, [barberData.gallery]);

  const setGallery = (next) => {
    // strip internal dnd-kit id field if you don't want it saved
    const cleaned = next.map(({ id, ...rest }) => rest);
    handleInputChange({ target: { name: "gallery", value: cleaned } });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6, // prevents accidental drags while scrolling
      },
    }),
  );

  const openFilePicker = () => fileInputRef.current?.click();

  const addFiles = (files) => {
    const images = Array.from(files || []).filter((f) =>
      f.type?.startsWith("image/"),
    );
    if (!images.length) return;

    const newItems = images.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        id: `local:${crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`}`,
        url,
        file,
      };
    });

    setGallery([...gallery, ...newItems]);
  };

  const onFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const onRemove = (index) => {
    const next = gallery.filter((_, i) => i !== index);
    setGallery(next);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = gallery.findIndex((g) => g.id === active.id);
    const newIndex = gallery.findIndex((g) => g.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = arrayMove(gallery, oldIndex, newIndex);
    setGallery(next);
  };

  // Optional: drop files into the gallery area to add
  const onDropFiles = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const ids = gallery.map((g) => g.id);

  return (
    <EditSectionCardComponent title="Gallery" defaultOpen={false}>
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={openFilePicker}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          + Add Images
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      <p className="text-sm text-gray-600">
        Drag using the <span className="font-medium">Drag</span> button to
        reorder. Drop image files here to add.
      </p>

      <div
        className="border rounded-xl p-4 bg-gray-50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropFiles}
      >
        {gallery.length === 0 ? (
          <div className="text-gray-600">
            No images yet. Click <span className="font-medium">Add Images</span>{" "}
            or drop files here.
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={ids}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-4 overflow-x-auto pb-2">
                {gallery.map((img, index) => (
                  <SortableImageCard
                    key={img.id}
                    id={img.id}
                    img={img}
                    index={index}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </EditSectionCardComponent>
  );
};

export default PortfolioInfoComponent;
