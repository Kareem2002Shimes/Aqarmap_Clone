import Image from "next/image";
import Link from "next/link";

const Landing = () => {
  const linkStyles = "text-primary hover:underline";
  return (
    <section className="section-gap relative">
      <div className="relative h-[175px] w-full lg:h-[500px]">
        <div className="relative h-full w-full">
          <Image
            src="/images/home/landing-img.webp"
            alt="landing-img"
            fill={true}
            className="object-cover object-top"
          />
        </div>
        <div className="container">
          <div className="absolute top-[50%] translate-y-[-50%]">
            <h1 className="text-2xl font-semibold leading-tight text-accent dark:text-black lg:text-5xl">
              258,694 Properties
              <br /> For{" "}
              <Link href={"/"} className={linkStyles}>
                Sale
              </Link>{" "}
              &{" "}
              <Link href={"/"} className={linkStyles}>
                Rent
              </Link>
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/"
                className="primary-btn h-[40px] rounded-[106px] lg:h-[56px]"
              >
                Properties
              </Link>
              <Link
                href="/"
                className="primary-btn relative h-[40px] rounded-[106px] after:absolute after:right-0 after:top-[-15px] after:rounded-sm after:bg-unique after:px-1 after:font-medium after:text-accent after:content-['NEW'] lg:h-[56px] "
              >
                Compounds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
