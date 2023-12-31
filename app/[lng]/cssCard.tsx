import { useDictionary } from "@/i18n"
import Link from "next/link"
import "server-only"
import { CssAside } from "./aside"


interface CardsProp {
    gradientFrom: string,
    gradientTo: string,
    titleKey: string,
    contentKey: string ,
    linkSet?: LinkSet[]
    leftSide: JSX.Element
  }

interface CardComponent extends CardsProp  {
    lng: string
}

type LinkSet = {
    name: string
    href: string
    hoverContent: string 
    id: number
}


const CssLinkSet: LinkSet[] = [
    {
        name: "Box Shadows",
        href: "/css/box-shadow",
        hoverContent: "Design with shadows/border",
        id: 1,
    },
    {
        name: "ToolKits",
        href: "/css/background",
        hoverContent: "Create with ease",
        id:3
    },
    {
        name: "Animations",
        href: "/css/animations",
        hoverContent: "Animate your designs",
        id:4
    },
    {
        name: "Widgets",
        href: "/css/widgets",
        hoverContent: "Add ready-made elements",
        id: 5
    },
    {
        name: "Frameworks",
        href: "/css/frameworks",
        hoverContent: "Expand with frameworks",
        id: 2
    },
];


const cardConfig:CardsProp[] = [
    {
      gradientFrom: '#F3EAF3',
      gradientTo: '#DCE7F9',
      titleKey: 'cssTitle',
      contentKey: 'cssContent',
      linkSet: CssLinkSet,
      leftSide: <CssAside />
    },
    {
      gradientFrom: '#DCE7F9',
      gradientTo: '#eedce5',
      titleKey: 'colorTitle',
      contentKey: 'colorContent',
      leftSide: <CssAside />
    },
    {
      gradientFrom: '#eedce5',
      gradientTo: '#f2e5d8',
      titleKey: 'libraryTitle',
      contentKey: 'libraryContent',
      leftSide: <CssAside />
    },
    {
      gradientFrom: '#f2e5d8',
      gradientTo: '#ebeadc',
      titleKey: 'cssTitle', 
      contentKey: 'cssContent',
      leftSide: <CssAside />
    },
  ];


 

export const CardsContainer = ({ lng }:{lng:string}) => {
    return (
      <div>
        {cardConfig.map((config,i) => (
          <MainCard
            key={i}
            gradientFrom={config.gradientFrom}
            gradientTo={config.gradientTo}
            titleKey={config.titleKey}
            contentKey={config.contentKey}
            lng={lng}
            linkSet={config.linkSet}
            leftSide={config.leftSide}
          />
        ))}
      </div>
    );
  }


const MainCard = async ({ gradientFrom, gradientTo, titleKey, contentKey, lng, linkSet, leftSide }:CardComponent) => {
    const d = await useDictionary(lng, "firstPage");

    return (
      <section className={`snap-start flex flex-col items-center justify-around h-dashboard bg-gradient-to-b from-[${gradientFrom}] to-[${gradientTo}] pb-5`}>
        <section className="text-[36px] flex-[0_0_20%] flex items-center justify-center">
          {d[titleKey]}
        </section>
        <section className="flex flex-row">
          <div className="flex-[0_0_60%]">
            {leftSide}
          </div>
          <div className="flex-[0_0_40%] px-7 py-7 ">
            <div className="border rounded-md p-5">{d[contentKey]}</div>
          </div>
        </section>
        <section className="flex w-full px-10">
        {linkSet && linkSet.map((item) => (
          <Link href={item.href} key={item.id} className="w-full mx-3">
            <div className="relative flex justify-center items-center shadow h-52 rounded-lg text-xl p-4 w-full hoverLink group overflow-hidden ">
            <div className="absolute bg-linkbar bottom-0 left-0 h-0 w-full transition-height duration-300 ease-in-out group-hover:h-full"></div>
              {item.name}
            </div>
          </Link>
        ))}
        </section>
      </section>
    );
  }