import { Pencil } from "lucide-react";
import IconButton from "./IconButton";

export default function SavedUpdateIconButton() {
  return (
    <IconButton variant="edit" label="Update">
      <Pencil size={14} strokeWidth={1.75} aria-hidden="true" />
    </IconButton>
  );
}
