import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, Download, Clock, ChevronDown, Filter } from "lucide-react";

import { Participant } from "../../types";

interface AttendanceTableProps {
  participants?: Participant[];
  recordingTitle?: string;
  recordingDate?: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

const AttendanceTable = ({
  participants = [],

  recordingTitle = "Weekly Team Meeting",
  recordingDate = "June 15, 2023",
  onExportCSV = () => console.log("Exporting as CSV..."),
  onExportPDF = () => console.log("Exporting as PDF..."),
}: AttendanceTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter
      ? participant.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>;
      case "late":
        return <Badge className="bg-yellow-500">Late</Badge>;
      case "left-early":
        return <Badge className="bg-orange-500">Left Early</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  return (
    <div className="w-full h-full bg-white rounded-md shadow-sm p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{recordingTitle}</h2>
            <p className="text-sm text-gray-500">{recordingDate}</p>
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
                <DropdownMenuItem onClick={() => handleFilterChange(null)}>
                  All Participants
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("present")}>
                  Present
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("late")}>
                  Late
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterChange("left-early")}
                >
                  Left Early
                </DropdownMenuItem>
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
                <DropdownMenuItem onClick={onExportCSV}>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportPDF}>
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search participants..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Time</TableHead>
                <TableHead>Leave Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">
                      {participant.name}
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {participant.joinTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {participant.leaveTime}
                      </div>
                    </TableCell>
                    <TableCell>{participant.duration}</TableCell>
                    <TableCell>{getStatusBadge(participant.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-gray-500"
                  >
                    No participants found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <div>
            Total Participants: {filteredParticipants.length} of{" "}
            {participants.length}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>
                Present:{" "}
                {participants.filter((p) => p.status === "present").length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>
                Late: {participants.filter((p) => p.status === "late").length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>
                Left Early:{" "}
                {participants.filter((p) => p.status === "left-early").length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
