"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <Image
        src="/1480.gif"
        alt=""
        height={100}
        width={300}
        quality={100}
        unoptimized
        className="w-fit h-fit m-auto"
      />
      <div className="text-4xl my-4 text-center dark:text-white">Loading...</div>
    </div>
  );
}
