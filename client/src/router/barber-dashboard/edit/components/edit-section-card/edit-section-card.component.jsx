import { useEffect, useId, useMemo, useState } from "react";

const EditSectionCardComponent = ({
  title,
  description,
  children,
  defaultOpen = true,
  actions,
  collapsible = true,

  // ✅ new
  errorCount = 0,
  forceOpen, // if true/false, parent can control open state
  onOpenChange, // optional callback when open changes
  highlightOnError = true, // adds subtle ring when errorCount > 0
}) => {
  const uid = useId();
  const contentId = useMemo(() => `section-${uid}`, [uid]);

  const [isOpen, setIsOpen] = useState(defaultOpen);

  // controlled/uncontrolled hybrid
  useEffect(() => {
    if (typeof forceOpen === "boolean") setIsOpen(forceOpen);
  }, [forceOpen]);

  // auto-open if errors appear
  useEffect(() => {
    if (!collapsible) return;
    if (errorCount > 0) setIsOpen(true);
  }, [errorCount, collapsible]);

  const setOpen = (next) => {
    setIsOpen(next);
    onOpenChange?.(next);
  };

  const toggle = () => {
    if (!collapsible) return;
    setOpen(!isOpen);
  };

  const ring =
    highlightOnError && errorCount > 0
      ? "ring-2 ring-red-200"
      : "ring-0 ring-transparent";

  return (
    <section className={`border rounded-2xl shadow-sm bg-white ${ring}`}>
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
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

            {/* ✅ error badge */}
            {errorCount > 0 ? (
              <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 text-xs font-semibold px-2 py-1">
                {errorCount} issue{errorCount > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>

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
            ? "max-h-[5000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </section>
  );
};

export default EditSectionCardComponent;
