import Image from "next/image";

interface LightButtonProps {
  text: string;
  onClick: () => void;
  icon?: string;
  alt?: string;
}

export const LightButton: React.FC<LightButtonProps> = ({
  text,
  onClick,
  icon,
  alt,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-3 items-center bg-[#f4f4f4] p-2 text-[#797979]"
    >
      <span>{text}</span>
      {icon && <Image src={icon} alt={alt || "Icon"} height={20} width={20} />}
    </button>
  );
};
