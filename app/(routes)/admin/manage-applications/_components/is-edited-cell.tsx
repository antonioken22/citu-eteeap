import { File, FilePen } from "lucide-react";

interface IsEditedCellProps {
  isEdited: boolean;
}

const IsEditedCell: React.FC<IsEditedCellProps> = ({ isEdited }) => {
  return (
    <>
      {isEdited ? (
        <FilePen className="flex items-center w-full text-yellow-500" />
      ) : (
        <File className="flex items-center w-full" />
      )}
    </>
  );
};

export default IsEditedCell;
