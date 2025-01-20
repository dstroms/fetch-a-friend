import Image from "next/image";
import logo from "./logo-square.jpeg";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({
  width = 100,
  height = 100,
  className,
}: LogoProps) {
  return (
    <Image
      src={logo}
      alt="Fetch a Friend Logo"
      width={width}
      height={height}
      priority
      className={`rounded-full border-2 border-solid border-white ${className}`}
    />
  );
}
