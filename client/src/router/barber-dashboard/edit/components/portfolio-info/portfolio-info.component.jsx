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

function SortableImageCard({ id, img, index, onRemove, onSetCover, isCover }) {
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

        {isCover ? (
          <div className="absolute top-2 left-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
            Cover
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 px-2 py-1 rounded text-sm font-medium"
        >
          Remove
        </button>

        <div className="absolute bottom-2 left-2 flex gap-2">
          <button
            type="button"
            className="bg-white/90 hover:bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium"
            onClick={() => onSetCover(id)}
          >
            Set cover
          </button>

          <button
            type="button"
            className="bg-white/90 hover:bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            Drag
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-600">
        <span className="font-medium">#{index + 1}</span>
      </div>
    </div>
  );
}

const makeId = () =>
  `img:${crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`}`;

const PortfolioInfoComponent = ({
  barberData,
  setField,

  // optional (for badges later)
  errorCount = 0,
  forceOpen,
  onOpenChange,
}) => {
  const fileInputRef = useRef(null);

  // draft shape:
  // barberData.gallery = [{ url, file? }]
  // barberData.galleryCoverId = string (optional)
  const coverId = barberData.galleryCoverId || null;

  const gallery = useMemo(() => {
    const raw = barberData.gallery || [];
    return raw.map((item, idx) => {
      if (typeof item === "string") return { id: `url:${item}`, url: item };

      const stableId =
        item.id || item._id
          ? `db:${item._id}`
          : item.url
            ? `url:${item.url}`
            : `idx:${idx}`;

      return { ...item, id: item.id || stableId };
    });
  }, [barberData.gallery]);

  const setGallery = (next) => {
    const cleaned = next.map(({ id, ...rest }) => rest);
    setField("gallery", cleaned);
  };

  const setCover = (id) => {
    setField("galleryCoverId", id);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const openFilePicker = () => fileInputRef.current?.click();

  const addFiles = (files) => {
    const images = Array.from(files || []).filter((f) =>
      f.type?.startsWith("image/"),
    );
    if (!images.length) return;

    const newItems = images.map((file) => {
      const url = URL.createObjectURL(file);
      return { id: makeId(), url, file, status: "queued" };
    });

    const next = [...gallery, ...newItems];
    setGallery(next);

    // if no cover set yet, set first added as cover
    if (!coverId && newItems[0]) setCover(newItems[0].id);
  };

  const onFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const onRemove = (index) => {
    const removed = gallery[index];
    const next = gallery.filter((_, i) => i !== index);
    setGallery(next);

    // if removing cover, pick next first
    if (removed?.id && removed.id === coverId) {
      setCover(next[0]?.id || null);
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = gallery.findIndex((g) => g.id === active.id);
    const newIndex = gallery.findIndex((g) => g.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    setGallery(arrayMove(gallery, oldIndex, newIndex));
  };

  const onDropFiles = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const ids = gallery.map((g) => g.id);

  const uploadQueue = gallery.filter((g) => g.file);

  return (
    <EditSectionCardComponent
      title="Gallery"
      defaultOpen={false}
      errorCount={errorCount}
      forceOpen={forceOpen}
      onOpenChange={onOpenChange}
      description="Reorder with Drag. Set a cover image for your profile."
    >
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

      {uploadQueue.length > 0 ? (
        <div className="border rounded-xl p-3 bg-gray-50">
          <p className="text-sm font-semibold text-gray-800">Upload queue</p>
          <div className="mt-2 space-y-2">
            {uploadQueue.map((g, idx) => (
              <div
                key={g.id || idx}
                className="flex items-center justify-between"
              >
                <p className="text-sm text-gray-700 truncate">
                  {g.file?.name || "image"}
                </p>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                  queued
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            When you wire the API, queued items will upload on Save.
          </p>
        </div>
      ) : null}

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
                    onSetCover={setCover}
                    isCover={img.id === coverId || (!coverId && index === 0)}
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
