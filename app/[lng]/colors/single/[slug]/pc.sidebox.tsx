import { useDictionary } from "@/i18n";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";


export default async function ColorSideBox ({lng, children}:{lng: string, children: ReactNode}){
  const t = await useDictionary(lng, "color");  
  const v = await useDictionary(lng, "singleColor")
  const themeKey = Object.keys(t);
  return (
      <section className="pt-2.5 pb-2.5 pl-2.5 top-13 no-scrollbar w-full">
            <Button variant="outline" className="w-full">{v.WhyVersatileColor}</Button>
            <section className=" text-slate-500 dark:text-slate-400 text-xs py-1.5 px-2 ">
                <section className="flex justify-between items-center">
                    <div>{v.ClipBoard}</div>
                    <Link className="underline underline-offset-3" href={"/colors/clipboard"}>More</Link>
                </section>
                <section className="w-full h-16 overflow-y-hidden">
                    {children}
                </section>
            </section>
          {themeKey.map((key, i) => (
              <section key={i} className="flex flex-col">
                  <section className="text-base h-10 flex items-center border-b rounded-md pl-2.5">
                      {t[key].name}
                  </section> 
                  <section className="flex flex-col my-1.5 mx-2.5">
                      {Object.entries(t[key].child).map(([colorKey, colorValue], i) => (
                          <Link href={colorKey as string} key={i} scroll={false} className={`m-1.5 no-underline hover:underline hover:underline-offset-4 text-sm`}>
                              {colorValue as string}
                          </Link>
                      ))}
                  </section>
              </section>
          ))}
      </section>
  );
}

