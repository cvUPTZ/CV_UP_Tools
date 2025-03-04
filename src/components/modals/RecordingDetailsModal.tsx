import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Play,
  Download,
  FileText,
  Calendar,
  Clock,
  Users,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Recording, Participant } from "../../types";

interface RecordingDetailsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  recording?: Recording;
}

const RecordingDetailsModal = ({
  open = true,
  onOpenChange = () => {},
  recording = null as unknown as Recording,
}: RecordingDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("recording");

  const handleExportCSV = () => {
    // Placeholder for CSV export functionality
    console.log("Exporting attendance as CSV...");
  };

  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    console.log("Exporting attendance as PDF...");
  };

  // Attendance table component implemented directly instead of importing
  const AttendanceTable = ({
    participants,
  }: {
    participants: Participant[];
  }) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Join Time</TableHead>
            <TableHead>Leave Time</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">{participant.name}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.joinTime}</TableCell>
              <TableCell>{participant.leaveTime}</TableCell>
              <TableCell>{participant.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {recording?.title || "Recording Details"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="recording"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recording">Recording</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="recording" className="mt-4">
            <div className="bg-gray-100 rounded-md aspect-video flex items-center justify-center overflow-hidden">
              {recording?.videoUrl ? (
                <video
                  controls
                  className="w-full h-full"
                  poster="https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2940&auto=format&fit=crop"
                >
                  <source src={recording.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Play className="h-16 w-16 mb-2" />
                  <p>Video not available</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recording Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{recording?.date || "Date not available"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {recording?.time || "Time not available"} (
                      {recording?.duration || "Duration not available"})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>
                      {recording?.participants?.length || 0} participants
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Meeting Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Google Meet Link:</p>
                    <p className="text-sm text-blue-600 truncate">
                      <a
                        href={recording?.meetLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {recording?.meetLink || "Link not available"}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Recording Status:</p>
                    <Badge>Processed</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Attendance Report</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportCSV}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportPDF}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="border rounded-md overflow-hidden">
              <AttendanceTable participants={recording?.participants || []} />
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Attendance Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Total Participants</p>
                  <p className="text-lg font-medium">
                    {recording?.participants?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Average Duration</p>
                  <p className="text-lg font-medium">1h 05m</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Max Attendance</p>
                  <p className="text-lg font-medium">
                    {recording?.participants?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {activeTab === "recording" ? (
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Recording
            </Button>
          ) : (
            <Button onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export Attendance
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecordingDetailsModal;
