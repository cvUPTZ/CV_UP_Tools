import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Calendar,
  Clock,
  Edit2,
  MoreVertical,
  Trash2,
  Video,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { Recording } from "../../types";

interface UpcomingRecordingsProps {
  recordings?: Recording[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onScheduleNew?: () => void;
}

const UpcomingRecordings = ({
  recordings = [],

  onEdit = () => {},
  onDelete = () => {},
  onScheduleNew = () => {},
}: UpcomingRecordingsProps) => {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [recordingToDelete, setRecordingToDelete] = useState<string | null>(
    null,
  );

  const handleDeleteClick = (id: string) => {
    setRecordingToDelete(id);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (recordingToDelete) {
      onDelete(recordingToDelete);
      setRecordingToDelete(null);
    }
    setDeleteAlertOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Upcoming Recordings
        </h2>
        <Button
          onClick={onScheduleNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Schedule New Recording
        </Button>
      </div>

      {recordings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Video className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">No upcoming recordings scheduled</p>
          <Button onClick={onScheduleNew} variant="outline" className="mt-4">
            Schedule Your First Recording
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordings.map((recording) => (
            <Card
              key={recording.id}
              className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-all"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      {recording.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 truncate mt-1">
                      {recording.meetLink}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(recording.id)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(recording.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(recording.date)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {recording.time} ({recording.duration})
                  </span>
                </div>
                <div className="flex mt-3 space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="text-xs">
                          {recording.quality}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Recording Quality</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="text-xs">
                          {recording.storage}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Storage Location</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-4">
                        {recording.title}
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">
                            Google Meet Link:
                          </p>
                          <p className="text-sm text-gray-600">
                            {recording.meetLink}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Date & Time:</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(recording.date)} at {recording.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Duration:</p>
                          <p className="text-sm text-gray-600">
                            {recording.duration}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Recording Quality:
                          </p>
                          <p className="text-sm text-gray-600">
                            {recording.quality}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Storage Location:
                          </p>
                          <p className="text-sm text-gray-600">
                            {recording.storage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this scheduled recording. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpcomingRecordings;
