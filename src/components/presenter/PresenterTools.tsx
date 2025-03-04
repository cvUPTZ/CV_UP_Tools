import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Clock,
  MessageSquare,
  Hand,
  Users,
  PresentationIcon,
  Share2,
  FileText,
  CheckSquare,
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  Maximize,
  Minimize,
  Copy,
  Send,
  Plus,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface PresenterToolsProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onClose?: () => void;
}

const PresenterTools = ({
  isExpanded = false,
  onToggleExpand = () => {},
  onClose = () => {},
}: PresenterToolsProps) => {
  const [activeTab, setActiveTab] = useState("controls");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["Yes", "No"]);
  const [newOption, setNewOption] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [raisedHands, setRaisedHands] = useState<string[]>([
    "John Doe",
    "Jane Smith",
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(300); // 5 minutes in seconds
  const [timerRemaining, setTimerRemaining] = useState(300);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "John Doe",
      message: "When will the slides be shared?",
      time: "10:02 AM",
    },
    {
      sender: "Jane Smith",
      message: "Great presentation so far!",
      time: "10:05 AM",
    },
    {
      sender: "Robert Johnson",
      message: "Could you explain the last point again?",
      time: "10:07 AM",
    },
  ]);

  const handleAddOption = () => {
    if (newOption.trim() && pollOptions.length < 6) {
      setPollOptions([...pollOptions, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const handleSendChat = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          sender: "You",
          message: chatMessage.trim(),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setChatMessage("");
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    setTimerRemaining(timerDuration);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimerRemaining(timerDuration);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAllowParticipant = (name: string) => {
    setRaisedHands(raisedHands.filter((hand) => hand !== name));
  };

  return (
    <Card
      className={`fixed right-4 ${isExpanded ? "bottom-4 w-[400px]" : "bottom-20 w-[60px]"} transition-all duration-300 shadow-lg z-40`}
    >
      {isExpanded ? (
        <>
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">
              Presenter Tools
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={onToggleExpand}>
                <Minimize className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="controls" className="text-xs">
                  <PresentationIcon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Controls</span>
                </TabsTrigger>
                <TabsTrigger value="polls" className="text-xs">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Polls</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="text-xs">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="hands" className="text-xs">
                  <Hand className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Hands</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="controls" className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    className="flex items-center justify-center gap-2"
                    onClick={handleToggleMute}
                  >
                    {isMuted ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                  <Button
                    variant={isVideoOff ? "destructive" : "outline"}
                    className="flex items-center justify-center gap-2"
                    onClick={handleToggleVideo}
                  >
                    {isVideoOff ? (
                      <VideoOff className="h-4 w-4" />
                    ) : (
                      <Video className="h-4 w-4" />
                    )}
                    {isVideoOff ? "Start Video" : "Stop Video"}
                  </Button>
                </div>

                <Button
                  variant={isScreenSharing ? "default" : "outline"}
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleToggleScreenShare}
                >
                  <ScreenShare className="h-4 w-4" />
                  {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                </Button>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Presentation Timer</Label>
                    <div className="text-xl font-mono font-bold">
                      {formatTime(timerRemaining)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="3600"
                      value={timerDuration}
                      onChange={(e) =>
                        setTimerDuration(parseInt(e.target.value) || 300)
                      }
                      className="w-20"
                      disabled={isTimerRunning}
                    />
                    <span className="text-sm text-gray-500">seconds</span>

                    <div className="flex-1 flex justify-end gap-2">
                      {!isTimerRunning ? (
                        <Button size="sm" onClick={handleStartTimer}>
                          Start
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={handleStopTimer}
                        >
                          Stop
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleResetTimer}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Quick Actions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4" />
                      Share Notes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Users className="h-4 w-4" />
                      Mute All
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="polls" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="poll-question">Poll Question</Label>
                  <Input
                    id="poll-question"
                    placeholder="Enter your question here..."
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Poll Options</Label>
                  <div className="space-y-2">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...pollOptions];
                            newOptions[index] = e.target.value;
                            setPollOptions(newOptions);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveOption(index)}
                          disabled={pollOptions.length <= 2}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {pollOptions.length < 6 && (
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Add another option..."
                          value={newOption}
                          onChange={(e) => setNewOption(e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleAddOption}
                          disabled={!newOption.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="anonymous-poll" />
                    <Label htmlFor="anonymous-poll">Anonymous Poll</Label>
                  </div>
                  <Button
                    disabled={!pollQuestion.trim() || pollOptions.length < 2}
                  >
                    Launch Poll
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="space-y-4">
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-3">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-2 ${msg.sender === "You" ? "bg-blue-100" : "bg-gray-100"}`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium">
                              {msg.sender}
                            </span>
                            <span className="text-xs text-gray-500">
                              {msg.time}
                            </span>
                          </div>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                  />
                  <Button
                    size="icon"
                    onClick={handleSendChat}
                    disabled={!chatMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="allow-chat" defaultChecked />
                    <Label htmlFor="allow-chat">Allow Chat</Label>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    Save Chat
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="hands" className="space-y-4">
                {raisedHands.length > 0 ? (
                  <div className="space-y-3">
                    {raisedHands.map((name, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(" ", "")}`}
                            />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{name}</p>
                            <p className="text-xs text-gray-500">Raised hand</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAllowParticipant(name)}
                        >
                          Allow
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <Hand className="h-12 w-12 mb-2 opacity-50" />
                    <p>No raised hands</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="allow-hands" defaultChecked />
                    <Label htmlFor="allow-hands">Allow Raised Hands</Label>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Hand className="h-4 w-4" />
                    Lower All Hands
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onToggleExpand}>
                  <PresentationIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Open Presenter Tools</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </Card>
  );
};

export default PresenterTools;
