import PresenterTools from "@/components/presenter/PresenterTools";

export default function PresenterToolsStoryboard() {
  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="relative h-[600px]">
        <PresenterTools isExpanded={true} />
      </div>
    </div>
  );
}
