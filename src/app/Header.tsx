import { FC } from 'react';
import Image from 'next/image';
import pipesImg from '~/images/pipes.png';
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
      <div className="relative h-[25vh] w-full print:hidden">
        <Image
          src={pipesImg}
          alt="Putkikuva"
          fill={true}
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
          priority
        />
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 text-4xl font-bold text-white">
          Vesilaskuri
        </div>
      </div>
    </header>
  );
};
