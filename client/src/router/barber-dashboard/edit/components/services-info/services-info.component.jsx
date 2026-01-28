import { useMemo } from "react";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditSectionCardComponent from "../edit-section-card/edit-section-card.component";

const makeId = () =>
  `svc:${crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`}`;

function SortableServiceCard({
  id,
  index,
  service,
  onRemove,
  onDuplicate,
  onChangeField,
  errorMap,
}) {
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
    opacity: isDragging ? 0.75 : 1,
  };

  const nameErr = errorMap?.[`services.${index}.name`];
  const priceErr = errorMap?.[`services.${index}.price`];
  const durErr = errorMap?.[`services.${index}.duration`];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-xl p-4 space-y-4 bg-gray-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {service.name?.trim() ? service.name : `Service #${index + 1}`}
          </h3>
          <p className="text-sm text-gray-600">Update the details below.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* drag handle */}
          <button
            type="button"
            className="bg-white border rounded px-2 py-1 text-xs font-medium text-gray-700 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            Drag
          </button>

          <button
            type="button"
            onClick={() => onDuplicate(index)}
            className="text-gray-700 hover:text-gray-900 font-medium text-sm"
          >
            Duplicate
          </button>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="font-medium text-gray-700">Name</label>
          <input
            data-error-id={`services.${index}.name`}
            type="text"
            placeholder="Haircut"
            value={service.name || ""}
            onChange={(e) => onChangeField(index, "name", e.target.value)}
            className={`w-full border p-2 rounded bg-white ${nameErr ? "border-red-400" : ""}`}
          />
          {nameErr ? <p className="text-xs text-red-600">{nameErr}</p> : null}
        </div>

        <div className="space-y-1">
          <label className="font-medium text-gray-700">Price ($)</label>
          <input
            data-error-id={`services.${index}.price`}
            type="number"
            placeholder="40"
            value={service.price ?? ""}
            onChange={(e) =>
              onChangeField(
                index,
                "price",
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className={`w-full border p-2 rounded bg-white ${priceErr ? "border-red-400" : ""}`}
            min="0"
            step="1"
          />
          {priceErr ? <p className="text-xs text-red-600">{priceErr}</p> : null}
        </div>

        <div className="space-y-1">
          <label className="font-medium text-gray-700">Duration (mins)</label>
          <input
            data-error-id={`services.${index}.duration`}
            type="number"
            placeholder="30"
            value={service.duration ?? ""}
            onChange={(e) =>
              onChangeField(
                index,
                "duration",
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className={`w-full border p-2 rounded bg-white ${durErr ? "border-red-400" : ""}`}
            min="0"
            step="5"
          />
          {durErr ? <p className="text-xs text-red-600">{durErr}</p> : null}
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-medium text-gray-700">Description</label>
        <textarea
          placeholder="Describe what’s included..."
          value={service.description || ""}
          onChange={(e) => onChangeField(index, "description", e.target.value)}
          className="w-full border p-2 rounded bg-white"
          rows={3}
        />
      </div>
    </div>
  );
}

const ServicesInfoComponent = ({
  barberData,
  setField,

  // ✅ new (from EditPage)
  errorCount = 0,
  errors = [],
  forceOpen,
  onOpenChange,
}) => {
  const services = barberData.services || [];

  // ensure each service has a stable _uiId for dnd keys (not saved to API)
  const uiServices = useMemo(() => {
    return services.map((s) => ({ _uiId: s._uiId || makeId(), ...s }));
  }, [services]);

  // push _uiId back into state only if missing (keeps stable ids)
  useMemo(
    () => {
      const missing = services.some((s) => !s._uiId);
      if (missing) setField("services", uiServices);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      /* intentionally empty */
    ],
  );

  const errorMap = useMemo(() => {
    const map = {};
    errors.forEach((e) => {
      // simple message mapping
      // you can refine these msg strings if you want
      if (e.id.includes(".name")) map[e.id] = "Name is required";
      if (e.id.includes(".price")) map[e.id] = "Price must be 0+";
      if (e.id.includes(".duration")) map[e.id] = "Duration must be > 0";
    });
    return map;
  }, [errors]);

  const setServices = (next) => setField("services", next);

  const onChangeField = (index, field, value) => {
    const next = uiServices.map((s, i) =>
      i === index ? { ...s, [field]: value } : s,
    );
    setServices(next);
  };

  const addService = () => {
    const next = [
      ...uiServices,
      { _uiId: makeId(), name: "", price: "", duration: "", description: "" },
    ];
    setServices(next);
  };

  const removeService = (index) => {
    const next = uiServices.filter((_, i) => i !== index);
    setServices(next);
  };

  const duplicateService = (index) => {
    const base = uiServices[index];
    if (!base) return;
    const copy = {
      ...base,
      _uiId: makeId(),
      name: base.name ? `${base.name} (copy)` : "",
    };
    const next = [
      ...uiServices.slice(0, index + 1),
      copy,
      ...uiServices.slice(index + 1),
    ];
    setServices(next);
  };

  // dnd-kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = uiServices.findIndex((s) => s._uiId === active.id);
    const newIndex = uiServices.findIndex((s) => s._uiId === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    setServices(arrayMove(uiServices, oldIndex, newIndex));
  };

  const ids = uiServices.map((s) => s._uiId);

  return (
    <EditSectionCardComponent
      title="Services Information"
      defaultOpen={false}
      errorCount={errorCount}
      forceOpen={forceOpen}
      onOpenChange={onOpenChange}
    >
      {uiServices.length === 0 ? (
        <div className="border rounded-xl p-4 bg-gray-50 text-gray-600">
          No services yet. Click{" "}
          <span className="font-medium">Add Service</span> to create one.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {uiServices.map((service, index) => (
                <SortableServiceCard
                  key={service._uiId}
                  id={service._uiId}
                  index={index}
                  service={service}
                  onRemove={removeService}
                  onDuplicate={duplicateService}
                  onChangeField={onChangeField}
                  errorMap={errorMap}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <button
        type="button"
        onClick={addService}
        className="bg-gray-800 text-white px-4 py-4 rounded w-full hover:bg-gray-700 font-medium"
      >
        + Add Service
      </button>
    </EditSectionCardComponent>
  );
};

export default ServicesInfoComponent;
