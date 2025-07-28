import Logo from "../../../public/logo-hotel-paris-italie.jpg";
import Image from "next/image";

const LoaderPage = () => {
  return (
    <div className={`loader--page loader--close`}>
      <div className="loader__block">
        <figure className="loader__logo">
          <Image src={Logo.src} alt="Logo Loader" fill objectFit="contain" />
        </figure>
      </div>
    </div>
  );
};

export default LoaderPage;
