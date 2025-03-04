import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import UpcomingRecordings from "./UpcomingRecordings";
import PastRecordings from "./PastRecordings";
import { Recording } from "../../types";

interface DashboardTabsProps {
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  upcomingRecordings?: Recording[];
  pastRecordings?: Recording[];
  onViewDetails?: (recordingId: string) => void;
  onDeleteRecording?: (recordingId: string) => void;
}

const DashboardTabs = ({
  defaultTab = "upcoming",
  onTabChange = () => {},
  upcomingRecordings = [],
  pastRecordings = [],
  onViewDetails = () => {},
  onDeleteRecording = () => {},
}: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <Tabs
          defaultValue={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Recordings Dashboard
            </h1>
            <TabsList className="bg-gray-100">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                Upcoming Recordings
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
              >
                Past Recordings
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="h-[calc(100vh-180px)] overflow-hidden">
            <TabsContent value="upcoming" className="h-full">
              <UpcomingRecordings
                recordings={upcomingRecordings}
                onEdit={() => {}}
                onDelete={onDeleteRecording}
                onScheduleNew={() => {}}
              />
            </TabsContent>
            <TabsContent value="past" className="h-full">
              <PastRecordings
                recordings={pastRecordings}
                onViewDetails={onViewDetails}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardTabs;
