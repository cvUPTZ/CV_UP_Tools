import React from "react";
import { Button } from "../ui/button";
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
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Settings, HardDrive, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  defaultQuality: z
    .string()
    .min(1, { message: "Please select a quality setting" }),
  defaultStorage: z
    .string()
    .min(1, { message: "Please select a storage location" }),
  autoStart: z.boolean().default(true),
  recordAttendance: z.boolean().default(true),
  autoTranscribe: z.boolean().default(false),
  maxRecordingLength: z
    .string()
    .min(1, { message: "Please select a maximum recording length" }),
  notifyParticipants: z.boolean().default(true),
  defaultFileName: z
    .string()
    .min(2, { message: "Please enter a default file name format" }),
});

type FormValues = z.infer<typeof formSchema>;

interface RecordingSettingsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (data: FormValues) => void;
}

const RecordingSettings = ({
  open = false,
  onOpenChange = () => {},
  onSave = () => {},
}: RecordingSettingsProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defaultQuality: "hd",
      defaultStorage: "google-drive",
      autoStart: true,
      recordAttendance: true,
      autoTranscribe: false,
      maxRecordingLength: "180",
      notifyParticipants: true,
      defaultFileName: "{meeting_name}_{date}",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSave(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Recording Settings
          </DialogTitle>
          <DialogDescription>
            Configure your default recording preferences.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="defaultQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Quality</FormLabel>
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
                      <FormDescription>
                        Default recording quality for all meetings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="defaultStorage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Storage</FormLabel>
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
                      <FormDescription>
                        Where recordings will be saved by default
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="maxRecordingLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Recording Length</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select maximum length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Maximum length for recordings before auto-stop
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="defaultFileName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default File Name Format</FormLabel>
                    <FormControl>
                      <Input placeholder="{meeting_name}_{date}" {...field} />
                    </FormControl>
                    <FormDescription>
                      Use {"{meeting_name}"}, {"{date}"}, {"{time}"} as
                      variables
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-3">Recording Behavior</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="autoStart"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Auto-start recording</FormLabel>
                          <FormDescription>
                            Automatically start recording when joining a
                            scheduled meeting
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recordAttendance"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Record attendance</FormLabel>
                          <FormDescription>
                            Track when participants join and leave the meeting
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="autoTranscribe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Auto-transcribe</FormLabel>
                          <FormDescription>
                            Automatically generate transcripts for recordings
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifyParticipants"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Notify participants</FormLabel>
                          <FormDescription>
                            Notify participants when recording starts and stops
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
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
              <Button type="submit">Save Settings</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RecordingSettings;
