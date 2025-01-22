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
    // disable Next image optimization due to plan limits
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt="Fetch a Friend Logo"
      width={width}
      height={height}
      className={`rounded-full border-2 border-solid border-white ${className}`}
    />
  );
}
