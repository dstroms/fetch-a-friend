import BoneIcon from "@components/app/components/icons/bone-icon";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#2D445D]">
      <BoneIcon width="50" height="50" color="white" className="animate-spin" />
      <div>Loading...</div>
    </div>
  );
}
