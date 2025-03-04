import React, { useState } from "react";
import Header from "../layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Calendar,
  Download,
  BarChart,
  PieChart,
  Users,
  FileText,
  Clock,
} from "lucide-react";
import AttendanceTable from "../recording/AttendanceTable";
import { fetchPastRecordings, fetchParticipants } from "../../lib/api";
import { useEffect } from "react";
import { Recording, Participant } from "../../types";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null,
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const pastRecordings = await fetchPastRecordings();
        setRecordings(pastRecordings);

        // Load participants for the first recording by default
        if (pastRecordings.length > 0) {
          const firstRecording = pastRecordings[0];
          setSelectedRecording(firstRecording);
          const attendees = await fetchParticipants(firstRecording.id);
          setParticipants(attendees);
        }
      } catch (error) {
        console.error("Error loading report data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleExportCSV = () => {
    console.log("Exporting as CSV...");
  };

  const handleExportPDF = () => {
    console.log("Exporting as PDF...");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <Button className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger
                  value="attendance"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Attendance Reports
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-2"
                >
                  <BarChart className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="summary"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Summary Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value="attendance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Attendance Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedRecording ? (
                      <AttendanceTable
                        participants={participants}
                        recordingTitle={selectedRecording.title}
                        recordingDate={selectedRecording.date}
                        onExportCSV={handleExportCSV}
                        onExportPDF={handleExportPDF}
                      />
                    ) : (
                      <div className="flex justify-center items-center h-64 text-gray-500">
                        <p>No recording selected</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5" />
                      Analytics Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Attendance Trends
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                          <BarChart className="h-16 w-16 text-gray-400" />
                          <span className="ml-2 text-gray-500">
                            Chart Placeholder
                          </span>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Participation Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                          <PieChart className="h-16 w-16 text-gray-400" />
                          <span className="ml-2 text-gray-500">
                            Chart Placeholder
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Summary Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                              <h3 className="text-2xl font-bold">
                                {recordings.length}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Total Recordings
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <Users className="h-8 w-8 mx-auto text-green-500 mb-2" />
                              <h3 className="text-2xl font-bold">42</h3>
                              <p className="text-sm text-gray-500">
                                Total Participants
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <Clock className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                              <h3 className="text-2xl font-bold">24h 30m</h3>
                              <p className="text-sm text-gray-500">
                                Total Recording Time
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Recent Recordings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recordings.slice(0, 3).map((recording) => (
                              <div
                                key={recording.id}
                                className="flex justify-between items-center p-3 border rounded-md"
                              >
                                <div>
                                  <h4 className="font-medium">
                                    {recording.title}
                                  </h4>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {recording.date}
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">
                                  View Report
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
