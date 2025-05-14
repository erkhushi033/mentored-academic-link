
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
  isValid: boolean;
  onCancel?: () => void;
}

export function FormActions({ isSubmitting, isValid, onCancel }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      {onCancel && (
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      )}
      <Button 
        type="submit" 
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? "Saving..." : "Upload Resource"}
      </Button>
    </div>
  );
}
