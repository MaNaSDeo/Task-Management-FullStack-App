interface ButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  loading = false,
  disabled = false,
}) => {
  return (
    <div className="bg-[linear-gradient(180deg,_#9C93D4_0%,_#4B36CC_100%)] rounded-md  p-[1px] shadow-md">
      <button
        onClick={disabled || loading ? undefined : onClick}
        className="flex items-center justify-center gap-2 w-full p-2 bg-[linear-gradient(180deg,_#4C38C2_0%,_#2F2188_100%)] text-white rounded-md transition duration-300 disabled:cursor-not-allowed disabled:bg-[linear-gradient(180deg,_#9C93D4_0%,_#6f65af_100%)]"
        disabled={disabled || loading}
      >
        {loading ? (
          <span className="loader"></span>
        ) : (
          <>
            {text}
            {icon && icon}
          </>
        )}
      </button>
    </div>
  );
};
