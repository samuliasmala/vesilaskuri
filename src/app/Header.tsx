import { FC } from 'react';
import Image from 'next/image';
import waterImg from '~/images/water-background.jpg';
import dropImg from '~/images/water-drop.svg';

export const Header: FC = () => {
  return (
    <header>
      <div className="flex items-center p-3 pl-5">
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={dropImg}
          alt="Vesilaskurin logo"
          className="mr-3 inline-block"
          priority
        />
        Pinsiön alueen vesiosuuskunta
      </div>
      <div className="relative aspect-[3/1.1] w-full print:hidden sm:aspect-[3/1]">
        <Image
          src={waterImg}
          alt=""
          fill={true}
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
          priority
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 bg-white bg-opacity-40 px-2 py-1 text-4xl font-bold text-primary">
          Vesilaskuri
        </div>
      </div>
    </header>
  );
};
