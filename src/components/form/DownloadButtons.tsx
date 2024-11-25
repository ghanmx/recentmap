import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { downloadServiceInfo } from "@/utils/downloadUtils";

interface DownloadButtonsProps {
  onDownload: (format: 'csv' | 'txt') => Promise<void>;
}

export const DownloadButtons = ({ onDownload }: DownloadButtonsProps) => {
  return (
    <div className="flex gap-2 flex-1">
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('csv')}
        className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100 transition-all duration-300"
      >
        <Download className="w-4 h-4 mr-2 text-emerald-600" />
        CSV
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => onDownload('txt')}
        className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100 transition-all duration-300"
      >
        <FileText className="w-4 h-4 mr-2 text-blue-600" />
        TXT
      </Button>
    </div>
  );
};