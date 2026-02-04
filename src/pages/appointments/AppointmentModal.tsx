import { type EventDetailDialogRenderer, type Event, temporalToDate, dateToPlainDateTime } from "@dayflow/core";
import { useState, useEffect } from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  Trash2, 
  Pencil, 
  Check,
  CalendarClock
} from "lucide-react";

const AppointmentModal: EventDetailDialogRenderer = ({
  event,
  isOpen,
  onClose,
  onEventUpdate,
  onEventDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    allDay: false,
  });

  // Initialize edit data when modal opens
  useEffect(() => {
    if (isOpen && event) {
      const isNewEvent = !event.id || String(event.id).startsWith('temp-');
      setIsCreating(isNewEvent);
      setIsEditing(isNewEvent);
      
      setEditData({
        title: event.title || "",
        description: event.description || "",
        start: formatForInput(event.start),
        end: event.end ? formatForInput(event.end) : "",
        allDay: event.allDay || false,
      });
    }
  }, [isOpen, event]);

  if (!isOpen || !event) return null;

  // Format Temporal to datetime-local input using dayflow's temporalToDate
  function formatForInput(dateValue: unknown): string {
    if (!dateValue) return "";
    
    try {
      // Use dayflow's temporalToDate to convert Temporal -> Date
      const date = temporalToDate(dateValue as any);
      
      if (isNaN(date.getTime())) {
        return "";
      }
      
      return toLocalISOString(date);
    } catch {
      return "";
    }
  }

  // Convert Date to datetime-local format (YYYY-MM-DDTHH:mm)
  function toLocalISOString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  // Format for display using dayflow's temporalToDate
  function formatDisplay(dateValue: unknown): string {
    if (!dateValue) return "Not set";
    
    try {
      // Use dayflow's temporalToDate
      const date = temporalToDate(dateValue as any);
      
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "Invalid date";
    }
  }

  // Convert datetime-local string to Temporal using dayflow's dateToPlainDateTime
  const stringToTemporal = (dateStr: string) => {
    if (!dateStr) return null;
    
    // Parse the datetime-local string to a Date
    const [datePart, timePart] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart ? timePart.split(':').map(Number) : [0, 0];
    
    const date = new Date(year, month - 1, day, hour, minute);
    
    // Use dayflow's dateToPlainDateTime to convert Date -> Temporal.PlainDateTime
    return dateToPlainDateTime(date);
  };

  const handleSave = () => {
    const updatedEvent: Event = {
      ...event,
      title: editData.title,
      description: editData.description,
      start: editData.start ? stringToTemporal(editData.start)! : event.start,
      end: editData.end ? stringToTemporal(editData.end)! : event.end,
      allDay: editData.allDay,
    };
    onEventUpdate(updatedEvent);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      onEventDelete(event.id);
      onClose();
    }
  };

  const handleCancel = () => {
    if (isCreating) {
      onClose();
      return;
    }
    
    setEditData({
      title: event.title || "",
      description: event.description || "",
      start: formatForInput(event.start),
      end: event.end ? formatForInput(event.end) : "",
      allDay: event.allDay || false,
    });
    setIsEditing(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      data-event-detail-dialog="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-card shadow-xl ring-1 ring-border animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex-1 min-w-0 pr-4">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-3 py-2 text-lg font-semibold bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Appointment title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={2}
                    placeholder="Add description..."
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-foreground truncate">
                  {event.title}
                </h2>
                {event.description && (
                  <p className="mt-1 text-sm text-foreground/70">
                    {event.description}
                  </p>
                )}
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Schedule Section */}
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Schedule
            </h3>
            
            {isEditing ? (
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.allDay}
                    onChange={(e) => setEditData({ ...editData, allDay: e.target.checked })}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">All day event</span>
                </label>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Start
                  </label>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-foreground/50" />
                    <input
                      type={editData.allDay ? "date" : "datetime-local"}
                      value={editData.allDay ? editData.start.split('T')[0] : editData.start}
                      onChange={(e) => {
                        const val = editData.allDay 
                          ? `${e.target.value}T00:00` 
                          : e.target.value;
                        setEditData({ ...editData, start: val });
                      }}
                      className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    End
                  </label>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-foreground/50" />
                    <input
                      type={editData.allDay ? "date" : "datetime-local"}
                      value={editData.end ? (editData.allDay ? editData.end.split('T')[0] : editData.end) : ""}
                      onChange={(e) => {
                        const val = editData.allDay 
                          ? `${e.target.value}T00:00` 
                          : e.target.value;
                        setEditData({ ...editData, end: val });
                      }}
                      className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {event.allDay ? (
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-foreground/50" />
                    All day
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-foreground/50" />
                      <span className="font-medium">Start:</span>
                      {formatDisplay(event.start)}
                    </p>
                    {event.end && (
                      <p className="text-sm text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4 text-foreground/50" />
                        <span className="font-medium">End:</span>
                        {formatDisplay(event.end)}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {event.meta && (
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-2">
                Details
              </h3>
              <p className="text-sm text-foreground">
                Hosted by {event.meta.owner ?? "Team"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
          {isEditing ? (
            <>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                  {isCreating ? "Cancel" : "Discard"}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  {isCreating ? "Create" : "Save"}
                </button>
              </div>
              {!isCreating && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors dark:bg-red-950/30 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors dark:bg-red-950/30 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
