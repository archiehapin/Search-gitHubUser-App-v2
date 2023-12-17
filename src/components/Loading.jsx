import LoaderIcon from "./icons/LoaderIcon";

const Loading = () => {
  return (
    <div className="flex items-baseline justify-center pt-[10px]">
      <LoaderIcon
        size={35}
        fill={"#b0def7"}
        style={"animate-spin"}
        darkFill={"dark:fill-[#257099]"}
      />
    </div>
  );
};

export default Loading;
