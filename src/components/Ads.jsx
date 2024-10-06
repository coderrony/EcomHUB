import offerImg from "@/public/offer.jpg";
import Image from "next/image";
import Link from "next/link";
function Ads() {
  return (
    <div className="container pb-16">
      <Link href="#">
        <Image src={offerImg} alt="ads" className="w-full" />
      </Link>
    </div>
  );
}

export default Ads;
