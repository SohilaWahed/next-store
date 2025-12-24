'use client'
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../carousel";
import Autoplay from "embla-carousel-autoplay";

interface CarsolProps {
  images: string[];
  title: string;
}

export default function Carsol({ images, title }: CarsolProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
         plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      >
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i} className="flex justify-center">
              <Image
                src={img}
                alt={`${title}`}
                width={600}
                height={600}
                className="rounded-lg shadow-lg object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
