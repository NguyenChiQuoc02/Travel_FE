"use client";

import Image from "next/image";

const HImage = () => {
  return (
    <div>
      <Image
        src="/images/danang.png"
        width={1140}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
};

export default HImage;
