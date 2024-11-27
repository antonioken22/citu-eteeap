import { File, FilePen, Info } from "lucide-react";

interface IsEditedCellProps {
  isEdited: boolean;
}

export const IsEditedCell: React.FC<IsEditedCellProps> = ({ isEdited }) => {
  return (
    <div className="w-[100px]">
      {isEdited ? (
        <div className="flex justify-center items-center space-x-2">
          <p className="text-xs text-center">Edited.</p>
          <button>
            <Info />
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center">
          Not yet edited.
        </p>
      )}
    </div>
  );
};
