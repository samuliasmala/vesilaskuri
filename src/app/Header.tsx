import { FC } from 'react';
import Image from 'next/image';
import pipesImg from '~/images/pipes.png';
import dropImg from '~/images/water-drop.svg';

export const Header: FC = () => {
  return (
    <header>
      <div className="flex items-center p-3">
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={dropImg}
          alt="Vesilaskurin logo"
          className="mr-4 inline-block"
          priority
        />
        Pinsiön alueen vesiosuuskunta
      </div>
      <div className="relative h-[25vh] w-full">
        <Image
          src={pipesImg}
          alt="Putkikuva"
          fill={true}
          className="object-cover"
          priority
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white">
          Vesilaskuri
        </div>
      </div>
    </header>
  );
};
