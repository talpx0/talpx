import { Button } from "@/components/ui/button"
import { ParamProps } from "../globalType"
import { useDictionary } from "@/i18n"
import { CardsContainer } from "./cssCard"

 
export default async function Home({params}:ParamProps) {
  return (
    <section className="h-dashboard overflow-y-scroll w-full no-scrollbar">
      <CardsContainer lng={params.lng} />
    </section>
  )
}
