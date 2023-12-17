import { useEffect } from "react";
import Location from "./icons/LocationIcon";
import WebsiteIcon from "./icons/WebsiteIcon";
import TwitterIcon from "./icons/TwitterIcon";
import CompanyIcon from "./icons/CompanyIcon";
import Loading from "./Loading";
import SadImojiIcon from "./icons/SadImojiIcon";
import { useSearch } from "../context/SearchContext";

const UserInfo = () => {
  const { isPending, hasError, searchData, pending, error, search, data } =
    useSearch();

  const searchUrl = `https://api.github.com/users/${search}`;

  useEffect(() => {
    isPending(true);
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        isPending(false);
        if ("login" in data) {
          searchData(data);
        }
        if ("message" in data) {
          hasError("Not Found");
        }
      })
      .catch(() => {
        hasError("Something went wrong");
        isPending(false);
      });
  }, [hasError, isPending, search, searchData, searchUrl]);

  const datas = [
    { title: "Repos", value: data?.public_repos ? data?.public_repos : 0 },
    { title: "Followers", value: data?.followers ? data?.followers : 0 },
    { title: "Following", value: data?.following ? data?.following : 0 },
  ];

  const others = [
    {
      icon: (
        <Location size={25} fill={"#4b6a9b"} darkFill={"dark:fill-[#fefefe]"} />
      ),
      value: data?.location ? data?.location : "Not available",
    },
    {
      icon: (
        <WebsiteIcon
          size={25}
          fill={"#4B6A9B"}
          darkFill={"dark:fill-[#fefefe]"}
        />
      ),
      value: data?.blog ? data?.blog : "Not available",
    },
    {
      icon: (
        <TwitterIcon
          size={25}
          fill={"#4B6A9B"}
          darkFill={"dark:fill-[#fefefe]"}
        />
      ),
      value: data?.twitter_username ? data?.twitter_username : "Not available",
    },
    {
      icon: (
        <CompanyIcon
          size={25}
          fill={"#4B6A9B"}
          darkFill={"dark:fill-[#fefefe]"}
        />
      ),
      value: data?.company ? data?.company : "Not available",
    },
  ];

  //created_at: "2011-01-25T18:44:36Z";
  let creationDate = new Date(data?.created_at);
  let joinDate = creationDate.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // joinDate: '25 Jan 2011'

  if (pending) {
    return <Loading />;
  }

  // if (error) {
  //   return (
  //     <div className="flex justify-center">
  //       <div className="mt-8 text-left text-[#4b6a9b] dark:text-slate-50">
  //         <h1 className="flex flex-row">
  //           <span className="animate-bounce">
  //             <SadImojiIcon
  //               size={25}
  //               fill={"#4b6a9b"}
  //               darkFill={"dark:fill-[#fefefe]"}
  //             />
  //           </span>

  //           <span className="pl-2">{error}</span>
  //         </h1>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      {error && (
        <div className="flex justify-center">
          <div className="mt-[20px] text-left text-[#4b6a9b] dark:text-slate-50">
            <h1 className="flex flex-row">
              <span className="animate-bounce">
                <SadImojiIcon
                  size={25}
                  fill={"#4b6a9b"}
                  darkFill={"dark:fill-[#fefefe]"}
                />
              </span>

              <span className="pl-2">{error}</span>
            </h1>
          </div>
        </div>
      )}
      <div className="mt-6 w-full rounded-[15px] bg-[#fefefe] p-6 text-[.78rem] text-[#4b6a9b] shadow-lg dark:bg-[#1E2A47] dark:text-[#fff] md:p-10 md:text-lg">
        <div className="grid grid-cols-3 gap-3 md:row-span-3 md:grid-cols-5">
          <div className="h-[70px] w-[70px] items-center md:h-[117px] md:w-[117px]">
            <img
              src={data?.avatar_url ? data?.avatar_url : "/img/user.png"}
              alt="avatar"
              className="rounded-full object-cover"
            />
          </div>
          <div className="col-span-2 pt-2 md:col-span-4 md:pl-10 xl:col-span-4 xl:flex xl:items-baseline xl:justify-between">
            <div>
              <h3 className="font-bold text-[#2b3442] dark:text-[#fff] md:text-2xl">
                {data?.name ? data?.name : ""}
              </h3>
              <span className="text-[#0079ff] md:text-base">
                @{data?.login ? data?.login : ""}
              </span>
            </div>
            <p className="pt-2 md:text-base">
              Joined {joinDate ? joinDate : ""}
            </p>
          </div>
        </div>
        <div className="mt-9 text-xs xl:-mt-11 xl:grid xl:grid-cols-4 xl:pl-3">
          <p className="mt-3 md:text-base xl:col-span-4 xl:col-start-2">
            {data?.bio ? data?.bio : "This profile has no bio"}
          </p>
          <div className="mt-5 flex gap-5 rounded-[10px] bg-[#f6f8ff] py-4 pl-10 dark:bg-[#141D2F] md:justify-between md:py-6 md:pl-10 md:pr-24 xl:col-span-4 xl:col-start-2 xl:justify-items-start">
            {datas.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3>{data.title}</h3>
                <span className="pt-2 text-base font-semibold text-[#2b3442] dark:text-[#fff] md:text-xl">
                  {data.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-6  md:grid md:grid-cols-2 md:text-base xl:col-span-4 xl:col-start-2">
            {others.map((other, index) => (
              <div key={index} className="flex items-center gap-4">
                <span>{other.icon}</span>
                <p className="overflow-hidden text-ellipsis break-keep">
                  {other.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
