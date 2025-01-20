import BoneIcon from "@components/app/components/icons/bone-icon";

export default function FetchingDogs() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <BoneIcon width="50" height="50" color="white" className="animate-spin" />
      <div>Fetching dogs ...</div>
    </div>
  );
}
