import { ParamProps } from "../globalType"
import { CardsContainer } from "./cssCard"

 
export default async function Home({params}:ParamProps) {
  return (
    <section className="h-dashboard overflow-y-scroll w-full no-scrollbar">
      <CardsContainer lng={params.lng} />
    </section>
  )
}
