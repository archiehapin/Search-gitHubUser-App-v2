import SadImojiIcon from "./icons/SadImojiIcon";

function Error() {
  return (
    <div className="flex justify-center">
      <div className="mt-8 text-left text-[#4b6a9b] dark:text-slate-50">
        <h1 className="flex flex-row">
          <span className="animate-bounce">
            <SadImojiIcon
              size={25}
              fill={"#4b6a9b"}
              darkFill={"dark:fill-[#fefefe]"}
            />
          </span>

          <span className="pl-2">Not found</span>
        </h1>
      </div>
    </div>
  );
}

export default Error;
