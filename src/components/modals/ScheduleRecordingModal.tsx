import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  Clock,
  HardDrive,
  Link,
  Settings,
  Video,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const formSchema = z.object({
  meetLink: z.string().url({ message: "Please enter a valid Google Meet URL" }),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  date: z.string().min(1, { message: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time" }),
  duration: z.string().min(1, { message: "Please select a duration" }),
  quality: z.string().min(1, { message: "Please select a quality setting" }),
  storage: z.string().min(1, { message: "Please select a storage location" }),
  autoStart: z.boolean().default(true),
  recordAttendance: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface ScheduleRecordingModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: FormValues) => void;
}

const ScheduleRecordingModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: ScheduleRecordingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetLink: "",
      title: "",
      date: "",
      time: "",
      duration: "60",
      quality: "hd",
      storage: "google-drive",
      autoStart: true,
      recordAttendance: true,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(values);
      onOpenChange(false);
    } catch (error) {
      console.error("Error scheduling recording:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Schedule New Recording
          </DialogTitle>
          <DialogDescription>
            Configure your Google Meet recording settings below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="meetLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Meet Link</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Link className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          placeholder="https://meet.google.com/xxx-xxxx-xxx"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter the URL of the Google Meet you want to record
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recording Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Weekly Team Meeting" {...field} />
                    </FormControl>
                    <FormDescription>
                      Give your recording a descriptive title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input type="date" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input type="time" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How long the recording should last
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Recording Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quality</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quality" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sd">Standard (480p)</SelectItem>
                            <SelectItem value="hd">HD (720p)</SelectItem>
                            <SelectItem value="fhd">Full HD (1080p)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="storage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Storage Location</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select storage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="google-drive">
                              <div className="flex items-center gap-2">
                                <HardDrive className="h-4 w-4" />
                                Google Drive
                              </div>
                            </SelectItem>
                            <SelectItem value="local-storage">
                              <div className="flex items-center gap-2">
                                <HardDrive className="h-4 w-4" />
                                Local Storage
                              </div>
                            </SelectItem>
                            <SelectItem value="cloud-storage">
                              <div className="flex items-center gap-2">
                                <HardDrive className="h-4 w-4" />
                                Cloud Storage
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-start">Auto-start recording</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start recording when the meeting begins
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="autoStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            id="auto-start"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="record-attendance">Record attendance</Label>
                    <p className="text-sm text-muted-foreground">
                      Track when participants join and leave the meeting
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="recordAttendance"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            id="record-attendance"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Schedule Recording"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleRecordingModal;
