import Image from "next/image";

interface DashboardCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  imageSrc,
  altText,
  title,
  description,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg flex flex-row items-center gap-2">
      <Image src={imageSrc} alt={altText} width={77} height={61} />
      <div className="flex flex-col">
        <h3 className="text-md text-[#757575] font-semibold">{title}</h3>
        <p className="text-[#868686] text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
