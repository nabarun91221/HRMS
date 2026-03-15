"use client";

import { cn, isUrl } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useEffect, useEffectEvent, useState } from "react";
import { Spinner } from "./ui/spinner";

interface NextImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

const NextImageWithFallback = ({
  src,
  alt,
  fallbackSrc = "/fallbackImage.jpg",
  width,
  height,
  className,
  ...props
}: NextImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(
    isUrl(src as string) ? src : fallbackSrc,
  );
  const [loading, setLoading] = useState(true);

  const setImgSrcEffectEvent = useEffectEvent((value: string) => {
    setImgSrc(value);
  });

  const setLoadingEffectEvent = useEffectEvent((value: boolean) => {
    setLoading(value);
  });

  useEffect(() => {
    setImgSrcEffectEvent(isUrl(src as string) ? (src as string) : fallbackSrc);
    setLoadingEffectEvent(true);
  }, [src]);
  return (
    <div className="relative" style={loading ? { width, height } : {}}>
      {loading && (
        <div className="absolute w-full h-full flex justify-center items-center ">
          <Spinner />
        </div>
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
          setLoading(false);
        }}
        className={cn(
          "transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
          className,
        )}
      />
    </div>
  );
};

export default NextImageWithFallback;
