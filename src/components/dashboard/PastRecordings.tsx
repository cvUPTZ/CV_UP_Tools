import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  Search,
  Download,
  Calendar,
  Clock,
  Play,
  Users,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Recording } from "../../types";

interface RecordingDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recording: Recording;
}

// Placeholder for RecordingDetailsModal since the actual component isn't available yet
const RecordingDetailsModal = ({
  open = true,
  onOpenChange = () => {},
  recording,
}: RecordingDetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{recording?.title || "Recording Details"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="bg-gray-100 rounded-md p-4 aspect-video flex items-center justify-center">
            <Play className="h-12 w-12 text-gray-500" />
            <span className="ml-2 text-gray-500">Video Player Placeholder</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Recording Info</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {recording?.date || "Date not available"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {recording?.duration || "Duration not available"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {recording?.participants || 0} participants
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Attendance Summary</h3>
              <div className="mt-2 text-sm">
                <p>Attendance data would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Export Attendance</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface PastRecordingsProps {
  recordings?: Recording[];
  onViewDetails?: (recordingId: string) => void;
}

const PastRecordings = ({
  recordings = [],
  onViewDetails = () => {},
}: PastRecordingsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredRecordings = recordings.filter((recording) =>
    recording.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleViewDetails = (recording: Recording) => {
    onViewDetails(recording.id);
  };

  const handleExportCSV = () => {
    // Placeholder for CSV export functionality
    console.log("Exporting as CSV...");
  };

  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    console.log("Exporting as PDF...");
  };

  return (
    <div className="w-full h-full bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search recordings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem>Custom range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleExportCSV}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Past Recordings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecordings.length > 0 ? (
                filteredRecordings.map((recording) => (
                  <TableRow key={recording.id}>
                    <TableCell className="font-medium">
                      {recording.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {recording.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {recording.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        {recording.participants}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          recording.status === "processed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {recording.status === "processed"
                          ? "Processed"
                          : "Processing"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          disabled={recording.status === "processing"}
                        >
                          <Play className="h-3 w-3" />
                          Play
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(recording)}
                        >
                          Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-gray-500"
                  >
                    No recordings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRecording && (
        <RecordingDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          recording={selectedRecording}
        />
      )}
    </div>
  );
};

export default PastRecordings;
