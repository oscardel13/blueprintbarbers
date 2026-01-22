import { useId, useMemo, useState } from "react";

const EditSectionCardComponent = ({
  title,
  description,
  children,
  defaultOpen = true,
  actions, // optional: render buttons on the right side of header
  collapsible = true,
}) => {
  const uid = useId();
  const contentId = useMemo(() => `section-${uid}`, [uid]);

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    if (!collapsible) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="border rounded-2xl shadow-sm bg-white">
      {/* Header */}
      <div
        className={`p-6 flex items-start justify-between gap-4 ${
          collapsible ? "cursor-pointer select-none" : ""
        }`}
        onClick={toggle}
        role={collapsible ? "button" : undefined}
        tabIndex={collapsible ? 0 : undefined}
        onKeyDown={(e) => {
          if (!collapsible) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        aria-expanded={collapsible ? isOpen : undefined}
        aria-controls={collapsible ? contentId : undefined}
      >
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {description ? (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {actions ? (
            <div onClick={(e) => e.stopPropagation()}>{actions}</div>
          ) : null}

          {collapsible ? (
            <button
              type="button"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 px-2 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              {isOpen ? "Collapse" : "Expand"}
            </button>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div
        id={contentId}
        className={`px-6 pb-6 transition-all duration-200 ${
          isOpen
            ? "max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </section>
  );
};

export default EditSectionCardComponent;
