import BoneIcon from "@components/app/components/icons/bone-icon";

type FetchingDogsErrorProps = {
  error: string;
};

export default function FetchingDogsError({ error }: FetchingDogsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <BoneIcon width="50" height="50" color="white" />
      <div>Error fetching dogs: {error}</div>
      <div>Please try again later.</div>
    </div>
  );
}
