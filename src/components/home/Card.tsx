import Image from "next/image";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
type CardProps = {
  icon: string;
  name: string;
  url: string;
  desc: string;
  id: number;
};
const Card = ({ icon, id, name, url, desc }: CardProps) => {
  return (
    <Link
      href={url}
      className="rouned-[5px] group relative flex items-center gap-4 p-2 duration-200 hover:shadow-[0_4px_12px_0_rgba(0,0,0,.08)] dark:hover:shadow-[0_4px_12px_0_rgba(255,255,255,.3)]"
    >
      <GoChevronRight className="absolute right-0 top-2 h-4 w-4 text-accent opacity-0 transition-all duration-500 group-hover:right-2 group-hover:top-2 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500" />
      <Image
        src={`/images/icons/search/${icon}.svg`}
        alt={name}
        width={48}
        height={48}
      />
      <div>
        <label
          className={`after:bg-unique relative mb-1 block w-fit text-xl font-semibold capitalize text-accent after:absolute after:right-[-65px] after:top-[50%] after:translate-y-[-50%] after:rounded-sm after:px-1 after:text-sm after:font-medium after:text-accent ${
            id == 2 || id == 3 ? "after:content-['NEW']" : ""
          }`}
        >
          {name}
        </label>
        <p className="text-base font-medium text-info">{desc}</p>
      </div>
    </Link>
  );
};

export default Card;
