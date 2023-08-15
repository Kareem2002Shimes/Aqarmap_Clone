import createIcon from "../custom/createIcon";
import FooterNav from "./FooterNav";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-primary py-[48px]">
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }
            >
              <div className="h-[35px] w-[170px] text-white">
                {createIcon("english-logo")}
              </div>
            </button>
            <div className="h-14 w-14 text-[#f9a825]">{createIcon("map")}</div>
          </div>
          <p className="text-lg font-medium tracking-wide text-white">
            Aqarmap services allow you to buy or sell a property while providing
            essential information to help you take one of life’s biggest
            financial decisions.
          </p>
        </div>
        <div className="">
          <FooterNav />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
